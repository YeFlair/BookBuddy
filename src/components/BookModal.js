// src/components/BookModal.js
import React from "react";
import "./BookModal.css";

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{book.volumeInfo.title}</h2>
        {book.volumeInfo.authors && (
          <p>Author(s): {book.volumeInfo.authors.join(", ")}</p>
        )}
        {book.volumeInfo.description && (
          <div>
            <h3>Description:</h3>
            <p>{book.volumeInfo.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookModal;
