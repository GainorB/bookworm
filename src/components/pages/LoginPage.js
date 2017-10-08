import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

class LoginPage extends Component {
  submit = data => this.props.login(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h1>LoginPage</h1>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { login })(LoginPage);
