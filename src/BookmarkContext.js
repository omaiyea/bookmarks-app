import React from 'react';

const BookmarkContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    updateBookmark: () => {}
})

export default BookmarkContext