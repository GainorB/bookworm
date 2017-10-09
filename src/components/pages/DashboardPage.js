import React from 'react';
import { connect } from 'react-redux';
import ConfirmedEmailMessage from '../messages/ConfirmedEmailMessage';
import { allBooksSelector } from '../../reducers/books';
import AddBookCTA from '../ctas/AddBookCTA';

const DashboardPage = ({ isConfirmed, books }) => {
  return (
    <div>
      {!isConfirmed && <ConfirmedEmailMessage />}

      {books.length === 0 && <AddBookCTA />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps)(DashboardPage);
