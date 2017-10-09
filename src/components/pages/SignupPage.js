import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/users';
import SignupForm from '../forms/SignupForm';

class SignupPage extends Component {
  submit = data => this.props.signup(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { signup })(SignupPage);
