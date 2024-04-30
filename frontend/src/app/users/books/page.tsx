"use client";

import React, { useEffect, useState } from "react";
import "@/styles/books.css";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function books() {
  const Router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const getBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/books/getBooks", {
        subject: "All",
      });
      setBooks(response.data.books);
      console.log("response.data", response.data.books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);
  const viewBooks = (subjects: string, _id: string) => {
    console.log(subjects, _id);
    Router.push(`/users/books/${subjects}/${_id}`);
  };
  return (
    <div className="books">
      <div className="books_container">
        {loading ? (
          <div className="loading"></div>
        ) : (
          books.map(
            ({ image, _id, index, subject, description, title, price }) => {
              return (
                <div className="books_container_book" key={index}>
                  <img
                    src="http://localhost:3000/assets/books/history.jpeg"
                    alt=""
                    className="books_container_book_image"
                  />
                  <div className="books_container_book_description">
                    <h1 className="books_container_book_description_title">
                      {title}
                    </h1>
                    <p className="books_container_book_description_description">
                      {description}
                    </p>
                    <p className="books_container_book_description_price">
                      Rs. {price}{" "}
                    </p>
                    <Button
                      className="books_container_book_description_button"
                      onClick={() => viewBooks(subject, _id)}
                    >
                      View book
                    </Button>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}
