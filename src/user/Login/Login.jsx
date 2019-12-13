import React from 'react';
import * as yup from 'yup';

import './Login.css';

import { useFormControl, getValidationsRunnerForSchema } from '../../shared/hocs/withForm';


const validations = {
  username: yup.string()
    .required('Username is required'),

  password: yup.string()
    .required('Password is required')
}

const schema = yup.object().shape(validations);

const validationsRunner = getValidationsRunnerForSchema(schema);

const Login = ({ login, history }) => {

  const usernameFormControl = useFormControl('', validations.username);
  const passwordFormControl = useFormControl('', validations.password);
  const [serverError, setServerError] = React.useState(null);

  const submitHandler = React.useCallback(() => {
    validationsRunner({
      username: usernameFormControl.value,
      password: passwordFormControl.value
    }).then(data => {
      login(history, data).catch(error => {
        console.log(error)
        if (typeof error === 'object') { throw error; }
        setServerError(error);
      });

    }).catch(errors => {
      if (errors.username) { usernameFormControl.setErrors(errors.username); }
      if (errors.password) { passwordFormControl.setErrors(errors.password); }
    })
  }, [usernameFormControl, passwordFormControl, setServerError, history, login]);

  return <form className="Login">
    <div className="form-control">
      <label>Username</label>
      <input type="text" onChange={usernameFormControl.changeHandler} />
      {usernameFormControl.errors && <div className="error">{usernameFormControl.errors[0]}</div>}
    </div>
    <div className="form-control">
      <label>Password</label>
      <input type="password" onChange={passwordFormControl.changeHandler} />
      {passwordFormControl.errors && <div className="error">{passwordFormControl.errors[0]}</div>}
    </div>
    <div className="form-control">
    {serverError && serverError}
      <button type="button" onClick={submitHandler}>Login</button>
    </div>
  </form>;
}

export default Login;

