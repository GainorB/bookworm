import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmedEmailMessage from '../messages/ConfirmedEmailMessage';
import { allBooksSelector } from '../../reducers/books';
import AddBookCTA from '../ctas/AddBookCTA';
import { fetchBooks } from '../../actions/books';

class DashboardPage extends Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchBooks();

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmedEmailMessage />}

        {books.length === 0 ? <AddBookCTA /> : <p>You have books!</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);
