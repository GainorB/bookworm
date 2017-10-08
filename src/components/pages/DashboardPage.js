import React from 'react';
import { connect } from 'react-redux';
import ConfirmedEmailMessage from '../messages/ConfirmedEmailMessage';

const DashboardPage = ({ isConfirmed }) => {
  return <div>{!isConfirmed && <ConfirmedEmailMessage />}</div>;
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(mapStateToProps)(DashboardPage);
