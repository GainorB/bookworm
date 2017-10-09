import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation)
      errors.passwordConfirmation = 'Passwords must match';
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">New password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your new password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Form.Field error={!!errors.passwordConfirmation}>
          <label htmlFor="passwordConfirmation">Confirm your new password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Type it again, please"
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
        </Form.Field>
        <Button primary>Change password</Button>
      </Form>
    );
  }
}

export default ResetPasswordForm;
