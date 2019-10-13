import React from 'react';
import ReactDOM from 'react-dom';
import AddBookmark from './AddBookmark';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AddBookmark /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
