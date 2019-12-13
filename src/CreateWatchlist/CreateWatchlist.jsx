import React from 'react';
import * as yup from 'yup';
import withForm from '../shared/hocs/withForm';
import watchlistService from '../services/watchlist-service';

import './CreateWatchlist.css';

class CreateWatchlist extends React.Component {

  titleOnChangeHandler = this.props.controlChangeHandlerFactory('title');
  descriptionOnChangeHandler = this.props.controlChangeHandlerFactory('description');

  submitHandler = () => {
    const errors = this.props.getFormErrorState();
    if (!!errors) { return; }
    const data = this.props.getFormState();
    watchlistService.createWatchlist(data).then((res) => {
      if(res==='User already have a watchlist'){
        alert('You already have a watchlist!')
      }else{
        this.props.history.push('/');
      }
    })

  };

  getFirstControlError = (name) => {
    const errorState = this.props.getFormErrorState();
    return errorState && errorState[name] && errorState[name][0];
  }

  render() {
    const titleError = this.getFirstControlError('title');
    const descriptionError = this.getFirstControlError('description');

    return <div className="CreateWatchlist">
      <form className="CreateWatchlist">
      <h1>Create new watchlist </h1>
      <h3>(You can have only one watchlist)</h3>
        <div className="form-control">
          <label>Watchlist title</label>
          <input type="text" onChange={this.titleOnChangeHandler} ></input>
          {titleError && <div className="error">{titleError}</div>}
        </div>
        <div className="form-control">
          <label>Description</label>
          <textarea name="description" onChange={this.descriptionOnChangeHandler}></textarea>
          {descriptionError && <div className="error">{descriptionError}</div>}
        </div>
        <div className="form-control">
          <button type="button" onClick={this.submitHandler} >Submit</button>
        </div>
      </form>
    </div >;
  }
}

const initialFormState = {
  title: "",
  description: ""
};

const schema = yup.object({
  title: yup.string()
    .required('Title is required'),

  description: yup.string()
    .required('description is required')
});

export default withForm(CreateWatchlist, initialFormState, schema);