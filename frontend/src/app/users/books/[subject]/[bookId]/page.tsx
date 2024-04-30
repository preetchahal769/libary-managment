"use client";
import axios from "axios";

import { useState, useEffect } from "react";
import "@/styles/bookId.css";
import { Button } from "@/components/ui/button";

interface BookType {
  title: string;
  author: string;
  stock: number;
  subject: string;
  image: string;
  description: string;
  rating: number;
  price: number;
}
export default function bookPage(props: any) {
  console.log("props", props);
  const [book, setBook] = useState<BookType>({
    title: "",
    author: "",
    stock: 0,
    subject: "",
    image: "",
    description: "",
    rating: 0,
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const getBook = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/books/getBook", {
        _id: props.params.bookId,
        subject: props.params.subject,
      });
      setBook(response.data.book);
      console.log("response.data", response.data.book);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const rentBook = async (_id: string) => {
    try {
      setBtnLoading(true);
      const response = await axios.post("/api/profile/updateBooks", {
        bookId: _id,
      });
      console.log("response.data", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };
  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className="books">
      <div className="booksId_container">
        {loading ? (
          <div className="bookId_loading"></div>
        ) : (
          <div className="booksId_container_book">
            {book.title ? (
              <>
                <h1>Title: {book.title}</h1>
                <p>Description: {book.description}</p>
                <p>Author: {book.author}</p>
                <p>Price: {book.price}</p>
                <p>Rating: {book.rating}</p>
                <Button
                  onClick={() => rentBook(props.params.bookId)}
                  className="rent_btn"
                >
                  Rent Now
                </Button>
              </>
            ) : (
              <p className="no_book">No book found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
