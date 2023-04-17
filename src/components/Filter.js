// src/components/Filter.js
import React from "react";

const Filter = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div>
      <label htmlFor="genre">Genre:</label>
      <select name="genre" id="genre" onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="fiction">Fiction</option>
        <option value="nonfiction">Nonfiction</option>
        {/* Add more genres here */}
      </select>

      <label htmlFor="language">Language:</label>
      <select name="language" id="language" onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        {/* Add more languages here */}
      </select>

      <label htmlFor="publicationDate">Publication Date:</label>
      <select
        name="publicationDate"
        id="publicationDate"
        onChange={handleFilterChange}
      >
        <option value="">Any</option>
        <option value="new">Last 30 days</option>
        <option value="last_year">Last year</option>
      </select>

      <label htmlFor="bookFormat">Book Format:</label>
      <select name="bookFormat" id="bookFormat" onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="ebook">Ebook</option>
        <option value="hardcover">Hardcover</option>
        <option value="paperback">Paperback</option>
      </select>
    </div>
  );
};

export default Filter;
