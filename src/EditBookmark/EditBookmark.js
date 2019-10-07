import React, { Component } from  'react';
import config from '../config'
import '../AddBookmark/AddBookmark.css'; //use same style as add page

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static defaultProps = {
    onEditBookmark: () => {}
  };

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
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
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
        return res.json()
      })
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        this.props.onEditBookmark(data)
      })
      .catch(error => {
        this.setState({ error })
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
              //need on change
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
              //need on change
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
              //need on change
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
              //need on change
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

export default EditBookmark;
