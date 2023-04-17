// src/components/RatingReview.js
import React, { useState } from "react";
import { db } from "../firebase";

const RatingReview = ({ requestId, type, user, book }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const submitRatingReview = async () => {
    const ratingReviewData = {
      requestId,
      type,
      rating,
      review,
      user,
      book,
    };

    await db.collection("ratingsReviews").add(ratingReviewData);
    setRating(0);
    setReview("");
  };

  return (
    <div>
      <h3>Rate and Review {type === "book" ? book.title : user.displayName}</h3>
      <div>
        <label htmlFor="rating">Rating (1-5):</label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button onClick={submitRatingReview}>Submit</button>
    </div>
  );
};

export default RatingReview;
