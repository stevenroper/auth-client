import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Drat!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirmation }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirmation} type="password" />
          {passwordConfirmation.touched && passwordConfirmation.error && <div className="error">{passwordConfirmation.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (formProps.password !== formProps.passwordConfirmation) {
    errors.password = "Oops! Check your password. Doesn't look like it matches."
  }

  if (!formProps.email) {
    errors.email = "Email is required to sign up.";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password.";
  }

  if (!formProps.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirmation'],
  validate
}, mapStateToProps, actions)(Signup);