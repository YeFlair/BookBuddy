// src/components/BookExchange.js

import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { AuthContext } from "./AuthProvider";
import RatingReview from "./RatingReview";

const BookExchange = () => {
  const { currentUser } = useContext(AuthContext);
  const [booksForExchange, setBooksForExchange] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [completedExchanges, setCompletedExchanges] = useState([]);

  useEffect(() => {
    const fetchBooksForExchange = async () => {
      const snapshot = await db.collection("booksForExchange").get();
      const books = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooksForExchange(books);
    };

    fetchBooksForExchange();
  }, []);

  useEffect(() => {
    const fetchExchangeRequests = async () => {
      const snapshot = await db
        .collection("exchangeRequests")
        .where("ownerId", "==", currentUser.uid)
        .get();

      const incoming = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((request) => request.status === "pending");

      setIncomingRequests(incoming);

      const outgoingSnapshot = await db
        .collection("exchangeRequests")
        .where("requesterId", "==", currentUser.uid)
        .get();

      const outgoing = outgoingSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setOutgoingRequests(outgoing);
    };

    fetchExchangeRequests();
  }, [currentUser.uid]);

  useEffect(() => {
    const fetchCompletedExchanges = async () => {
      const snapshot = await db
        .collection("exchangeRequests")
        .where("requesterId", "==", currentUser.uid)
        .where("status", "==", "accepted")
        .get();

      const completed = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCompletedExchanges(completed);
    };

    fetchCompletedExchanges();
  }, [currentUser.uid]);

  const requestExchange = async (book) => {
    const requestData = {
      ownerId: book.ownerId,
      ownerDisplayName: book.ownerDisplayName,
      requesterId: currentUser.uid,
      requesterDisplayName: currentUser.displayName,
      bookId: book.id,
      bookTitle: book.title,
      status: "pending",
    };

    await db.collection("exchangeRequests").add(requestData);
    setOutgoingRequests([...outgoingRequests, requestData]);
  };

  const updateRequestStatus = async (request, status) => {
    await db.collection("exchangeRequests").doc(request.id).update({ status });
    setIncomingRequests(
      incomingRequests.map((req) =>
        req.id === request.id ? { ...req, status } : req
      )
    );
  };

  return (
    <div>
      <h2>Books for Exchange</h2>
      <ul>
        {booksForExchange.map((book) => (
          <li key={book.id}>
            {book.title} by {book.ownerDisplayName}
            {currentUser.uid !== book.ownerId && (
              <button onClick={() => requestExchange(book)}>
                Request Exchange
              </button>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Incoming Exchange Requests</h2>
        <ul>
          {incomingRequests.map((          request) => (
            <li key={request.id}>
              {request.requesterDisplayName} wants to exchange {request.bookTitle}
              <button onClick={() => updateRequestStatus(request, "accepted")}>
                Accept
              </button>
              <button onClick={() => updateRequestStatus(request, "declined")}>
                Decline
              </button>
            </li>
          ))}
        </ul>
        <h2>Outgoing Exchange Requests</h2>
        <ul>
          {outgoingRequests.map((request) => (
            <li key={request.id}>
              Requested to exchange {request.bookTitle} with {request.ownerDisplayName}
              <span>Status: {request.status}</span>
            </li>
          ))}
        </ul>
        <h2>Completed Exchanges</h2>
        <ul>
          {completedExchanges.map((exchange) => (
            <li key={exchange.id}>
              Exchanged {exchange.bookTitle} with {exchange.ownerDisplayName}
              <RatingReview exchange={exchange} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookExchange;

