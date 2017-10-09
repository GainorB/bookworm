import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateToken, resetPassword } from '../../actions/auth';
import { Message } from 'semantic-ui-react';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  submit = data => this.props.resetPassword(data).then(() => this.props.history.push('/login'));

  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;

    return (
      <div>
        <h1>Reset your password</h1>
        {loading && <Message>Loading</Message>}
        {!loading && success && <ResetPasswordForm submit={this.submit} token={token} />}
        {!loading && !success && <Message>Invalid Token</Message>}
      </div>
    );
  }
}

export default connect(null, { validateToken, resetPassword })(ResetPasswordPage);
