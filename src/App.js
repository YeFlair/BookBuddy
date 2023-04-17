import React, { useState, useContext } from "react";
import "./App.css";
import axios from "axios";
import Filter from "./components/Filter";
import BookModal from "./components/BookModal";
import { AuthContext } from "./components/AuthProvider";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import UserProfile from "./components/UserProfile";

function App() {
  const { currentUser } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({
    publicationDate: "",
    genre: "",
    language: "",
    bookFormat: "",
  });

  const searchBooks = async (filters) => {
    const { publicationDate, genre, language, bookFormat } = filters;

    let filterQuery = "";
    if (genre) filterQuery += `+subject:${genre}`;
    if (language) filterQuery += `+language:${language}`;
    if (bookFormat) filterQuery += `+format:${bookFormat}`;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}${filterQuery}&key=${process.env.REACT_APP_API_KEY}`
    );
    setBooks(response.data.items);
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="App">
      <h1>BookBuddy</h1>
      {!currentUser && (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
      {currentUser && (
        <>
          <SignOut />
          <UserProfile />
        </>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <Filter onFilterChange={handleFilterChange} />
      <button onClick={() => searchBooks(filters)}>Search</button>
      <div className="book-list">
        {books &&
          books.map((book) => (
            <div
              key={book.id}
              className="book"
              onClick={() => handleBookSelect(book)}
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
              <div className="book-info">
                <h2>{book.volumeInfo.title}</h2>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
              </div>
            </div>
          ))}
      </div>
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default App;
