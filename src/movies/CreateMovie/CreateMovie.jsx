import React from 'react';
import * as yup from 'yup';
import withForm from '../../shared/hocs/withForm';
import movieService from '../../services/movie-service';

import './CreateMovie.css';

class CreateMovie extends React.Component {

  titleOnChangeHandler = this.props.controlChangeHandlerFactory('title');
  descriptionOnChangeHandler = this.props.controlChangeHandlerFactory('description');
  imageOnChangeHandler = this.props.controlChangeHandlerFactory('image');

  submitHandler = () => {
    const errors = this.props.getFormErrorState();
    if (!!errors) { return; }
    const data = this.props.getFormState();
    movieService.createMovie(data).then(() => {
      this.props.history.push('/');
    })

  };

  getFirstControlError = (name) => {
    const errorState = this.props.getFormErrorState();
    return errorState && errorState[name] && errorState[name][0];
  }

  render() {
    const titleError = this.getFirstControlError('title');
    const descriptionError = this.getFirstControlError('description');
    const imageError = this.getFirstControlError('image');

    return <div className="CreateMovie">
      <form className="CreateMovie">
      <h1>Create new movie</h1>
        <div className="form-control">
          <label>Movie title</label>
          <input type="text" onChange={this.titleOnChangeHandler} ></input>
          {titleError && <div className="error">{titleError}</div>}
        </div>
        <div className="form-control">
          <label>Description</label>
          <textarea name="description" onChange={this.descriptionOnChangeHandler}></textarea>
          {descriptionError && <div className="error">{descriptionError}</div>}
        </div>
        <div className="form-control">
          <label>Image Url</label>
          <textarea name="image" onChange={this.imageOnChangeHandler} ></textarea>
          {imageError && <div className="error">{imageError}</div>}
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
  description: "",
  image: ""
};

const schema = yup.object({
  title: yup.string()
    .required('Title is required'),

  description: yup.string()
    .required('description is required'),
  image: yup.string()
    .required('Image URL is required')
    .url('Invalid url')
});

export default withForm(CreateMovie, initialFormState, schema);