// src/components/UserProfile.js
import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { AuthContext } from "./AuthProvider";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [booksForExchange, setBooksForExchange] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const docRef = db.collection("users").doc(currentUser.uid);
          const doc = await docRef.get();

          if (doc.exists) {
            setUserData(doc.data());
            setDisplayName(doc.data().displayName);
            setFavoriteBooks(doc.data().favoriteBooks || []);
            setBooksForExchange(doc.data().booksForExchange || []);
          } else {
            console.log("No user data found for this user");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };

      fetchData();
    }
  }, [currentUser]);

  const updateProfile = async () => {
    try {
      await db.collection("users").doc(currentUser.uid).update({
        displayName,
        favoriteBooks,
        booksForExchange,
      });
      setUserData({ ...userData, displayName, favoriteBooks, booksForExchange });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {editMode ? (
        <>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
          />
          <button onClick={updateProfile}>Save</button>
        </>
      ) : (
        <>
          <p>Display Name: {userData.displayName}</p>
          <button onClick={() => setEditMode(true)}>Edit Display Name</button>
        </>
      )}
      <p>Email: {userData.email}</p>
      <h2>Favorite Books</h2>
      <ul>
        {favoriteBooks.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
      <h2>Books for Exchange</h2>
      <ul>
        {booksForExchange.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
