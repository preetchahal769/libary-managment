"use client";

import React, { useEffect, useState } from "react";
import "@/styles/dashboard.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const images = [
    "http://localhost:3000/assets/books/history.jpeg",
    "http://localhost:3000/assets/books/Politics.jpeg",
    "http://localhost:3000/assets/books/Biology.jpeg",
    "http://localhost:3000/assets/books/computerScience.jpeg",
    "http://localhost:3000/assets/books/Eco.jpeg",
    "http://localhost:3000/assets/books/geo.jpeg",
    "http://localhost:3000/assets/books/math.jpeg",
  ];
  console.log("dashboard");
  const dashboardSubjects = [
    {
      name: "History",
      image: "http://localhost:3000/assets/books/history.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      name: "Politics",
      image: "http://localhost:3000/assets/books/Politics.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      name: "Biology",
      image: "http://localhost:3000/assets/books/Biology.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      name: "Computer Science",
      image: "http://localhost:3000/assets/books/computerScience.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      name: "Eco",
      image: "http://localhost:3000/assets/books/Eco.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      name: "Geo",
      image: "http://localhost:3000/assets/books/geo.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      name: "Math",
      image: "http://localhost:3000/assets/books/math.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  const viewBooks = (subjects: string, _id: string) => {
    console.log(subjects, _id);
    Router.push(`/users/books/${subjects}/${_id}`);
  };
  const getBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/books/getBooks", {
        subject: "Chemistry",
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

  return (
    <div className="Dashboard">
      <div className="Dashboard_books_container">
        {dashboardSubjects.map(({ name, image, description }, index) => (
          <Link
            href={`/users/books/${name}`}
            key={index}
            className="Dashboard_books"
          >
            {" "}
            <img src={image} className="Dashboard_books_image" alt="" />
            <div className="Dashboard_books_description">
              {" "}
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="Dashboard_trending_books">
        <h1 className="Dashboard_trending_books_title">Trending Books</h1>
        <div className="Dashboard_trending_books_container">
          {loading ? (
            <div className="loading"></div>
          ) : (
            books.map(
              ({ image, _id, index, subject, description, title, price }) => (
                <div
                  key={index}
                  className="Dashboard_trending_books_container_item"
                >
                  <img
                    src={image}
                    className="Dashboard_trending_books_image"
                    alt=""
                  />
                  <div className="Dashboard_trending_books_container_item_details">
                    <div className="Dashboard_trending_books_container_item_description">
                      <h1>{title}</h1>
                      <p>{description}</p>
                    </div>
                    <div className="Dashboard_trending_books_container_item_price">
                      <h1>Price: {price}</h1>
                    </div>
                    <div className="Dashboard_trending_books_container_item_button">
                      <Button
                        // variant="outline"
                        className="Dashboard_trending_books_container_item_button"
                        onClick={() => viewBooks(subject, _id)}
                      >
                        view book
                      </Button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
