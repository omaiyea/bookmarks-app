import React, { Component } from  'react';
import { withRouter } from 'react-router-dom';
import BookmarkContext from '../BookmarkContext';
import config from '../config'
import '../AddBookmark/AddBookmark.css'; //use same style as add page

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static defaultProps = {
    //onEditBookmark: () => {}
  };

  static contextType = BookmarkContext;

  state = {
    error: null,
    title: '',
    url: '',
    description: '',
    rating: ''
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const bookmark = {
      title: this.state.title,
      url: this.state.url,
      description: this.state.description,
      rating: this.state.rating,
    }

    this.setState({ error: null })
    const bookmarkId = this.props.match.params.bookmarkId
    const fullEndpoint = config.API_ENDPOINT + bookmarkId

    fetch(fullEndpoint, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
      })
      .then(() => { //if succesful patch, then show list of bookmarks and update context
        this.context.updateBookmark(bookmark)
        this.props.history.push('/')
      })
      .catch(error => { //if not succesful, throw error
        this.setState({ error })
      })
  }

  handleChangeTitle(e){
    this.setState({
      title: e.target.value
    })
  }

  handleChangeUrl(e){
    this.setState({
      url: e.target.value
    })
  }

  handleChangeRating(e){
    this.setState({
      rating: e.target.value
    })
  }

  handleChangeDesc(e){
    this.setState({
      description: e.target.value
    })
  }

  componentDidMount(){
    const bookmarkId = this.props.match.params.bookmarkId
    const fullEndpoint = config.API_ENDPOINT + bookmarkId

    fetch(fullEndpoint, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${config.API_KEY}`
        }
    })
    .then(bookmarkRes => {
        if(bookmarkRes.ok){
         return bookmarkRes.json()
        }
    })
    .then(bookmark => {
        const title = bookmark.title
        const url = bookmark.url
        const description = bookmark.description
        const rating = bookmark.rating
        this.setState({title})
        this.setState({url})
        this.setState({description})
        this.setState({rating})
    })
    .catch(error => {
        this.setState( {error} )
    })
  }

  render() {
    const { error } = this.state
    const { onClickCancel } = this.props

    return (
      <section className='AddBookmark'>
        <h2>Edit a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={this.state.title}
              onChange={e => this.handleChangeTitle(e)}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              value={this.state.url}
              onChange={e => this.handleChangeUrl(e)}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={this.state.description}
              onChange={e => this.handleChangeDesc(e)}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              value={this.state.rating}
              onChange={e => this.handleChangeRating(e)}
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={onClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(EditBookmark);
