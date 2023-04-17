// src/components/BookDetails.js
import React from 'react';

const BookDetails = ({ book }) => {
  if (!book) return null;

  const { volumeInfo } = book;
  const { title, authors, description, imageLinks, publishedDate, pageCount, language } = volumeInfo;

  return (
    <div className="book-details">
      <h2>{title}</h2>
      <img src={imageLinks?.thumbnail} alt={title} />
      <p>Authors: {authors?.join(', ')}</p>
      <p>Published Date: {publishedDate}</p>
      <p>Page Count: {pageCount}</p>
      <p>Language: {language}</p>
      <p>Description: {description}</p>
    </div>
  );
};

export default BookDetails;
