"use client";
import axios from "axios";

import { useState, useEffect } from "react";
import "@/styles/bookId.css";

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
  const getBook = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/books/getBook", {
        _id: props.params.bookId,
      });
      setBook(response.data.book);
      console.log("response.data", response.data.book);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className="books">
      <div className="booksId_container">
        {loading ? (
          <div className="loading"></div>
        ) : (
          <div className="booksId_container_book">
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <p>{book.rating}</p>
          </div>
        )}
      </div>
    </div>
  );
}
