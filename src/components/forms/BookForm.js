import React, { Component } from 'react';
import { Form, Button, Grid, Segment, Image } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class BookForm extends Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {}
  };

  // when a book is changed the props change, so this will force a re render by updating state
  componentWillReceiveProps(props) {
    this.setState({
      data: {
        goodreadsId: props.book.goodreadsId,
        title: props.book.title,
        authors: props.book.authors,
        cover: props.book.covers[0],
        pages: props.book.pages
      },
      covers: props.book.covers
    });
  }

  // UNIVERSAL HANDLER FOR STRING DATA
  onChange = e => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
  };

  onChangeNumber = e => {
    this.setState({ data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) } });
  };

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

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({ index: newIndex, data: { ...this.state.data, cover: covers[newIndex] } });
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.authors) errors.authors = "Can't be blank";
    if (!data.pages) errors.pages = "Can't be blank";
    return errors;
  };

  render() {
    const { loading, data, errors } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor="authors">Book Authors</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>

                <Form.Field error={!!errors.pages}>
                  <label htmlFor="pages">Pages</label>
                  <input
                    type="text"
                    disabled={data.pages === undefined}
                    id="pages"
                    name="pages"
                    value={data.pages !== undefined ? data.pages : 'Loading..'}
                    placeholder="#"
                    onChange={this.onChangeNumber}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <center>
                  <Image size="small" src={data.cover} />
                  {this.state.covers.length > 1 && (
                    <a role="button" tabIndex={0} onClick={this.changeCover}>
                      Another Cover
                    </a>
                  )}
                </center>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default BookForm;
