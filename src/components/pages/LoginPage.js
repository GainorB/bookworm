import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  submit = data => this.props.login(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h1>Access your account</h1>
        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot password?</Link>
      </div>
    );
  }
}

export default connect(null, { login })(LoginPage);
