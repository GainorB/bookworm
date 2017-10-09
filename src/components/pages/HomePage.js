import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => {
  return (
    <div>
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <div>
          <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
