import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';
import { Link } from 'react-router-dom';

export default function BookmarkItem(props) {
  return (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
      <button
          className='BookmarkItem__description'
          onClick={() => props.onClickDelete(props.id)}
        >
          <Link to={`/edit-bookmark/${props.id}`} className="button__link">Edit</Link>
        </button>
        <button
          className='BookmarkItem__description'
          onClick={() => props.onClickDelete(props.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}
