import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import EditBookmark from './EditBookmark/EditBookmark';
import BookmarkContext from './BookmarkContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  updateBookmark = bookmark => {
    this.setState({
      bookmarks: this.state.bookmarks.map(bm =>
        (bm.id !== bookmark.id) ? bm : bookmark
      )
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(bookmark => {this.setBookmarks(bookmark)})
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      updateBookmark: this.updateBookmark
    }

    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarkContext.Provider value={contextValue}>
        <Nav />
        <div className='content' aria-live='polite'>
          <Route
           path='/add-bookmark'
           render={({history}) => {
            return <AddBookmark
//              onAddBookmark={this.addBookmark}
              onClickCancel={() => history.push('/')}
           />
           }}
          />
          <Route
           path='/edit-bookmark/:bookmarkId'
           render={(props) => {
            return <EditBookmark
              {...props}
             // onEditBookmark={this.editBookmark}
              onClickCancel={() => props.history.push('/')}
           />
           }}
          />
          <Route
           exact
           path='/'
           component={BookmarkList}
          />
        </div>
        </BookmarkContext.Provider>
      </main>
    );
  }
}

export default App;
