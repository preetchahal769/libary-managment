"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "@/styles/profile.css";
import "@/styles/books.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface User {
  studentName: string;
  email: string;
  studentRollNo: string;
  studentContactNo?: string; // Make the property optional
}
export default function page() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState<User>({
    studentName: "",
    email: "",
    studentRollNo: "",
    studentContactNo: "",
  });
  const [balance, setBalance] = useState(0);
  const [fine, setFine] = useState(0);
  const [booksLoading, setBooksLoading] = useState(false);
  const logout = async () => {
    try {
      console.log("logging out");
      await axios.post("/api/users/logout");
      console.log("logged out");
      window.history.go(0);
      router.push("/accounts/login");
    } catch (error) {
      console.log(error);
    }
  };
  const getBooks = async () => {
    try {
      setBooksLoading(true);
      const response = await axios.post("/api/profile/getBooks");
      setBooks(response.data.returnedBooks);
      // console.log("response.data", response.data.returnedBooks);
    } catch (error) {
      console.log(error);
    } finally {
      setBooksLoading(false);
    }
  };
  const getProfile = async () => {
    try {
      const response = await axios.post("/api/users/profile");

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const getBalance = async () => {
    try {
      const response = await axios.post("/api/profile/getBalance");
      setBalance(response.data.balance);
      console.log("response.data", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addBalance = async () => {
    try {
      const response = await axios.post("/api/profile/updateBalance", {
        addbalance: 500,
      });
      console.log("response.data", response.data);
      getBalance();
    } catch (error) {
      console.log(error);
    }
  };
  const getFine = async () => {
    try {
      const response = await axios.post("/api/profile/getFine");
      setFine(response.data.fine);
      console.log("response.data.fines", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const payFine = async () => {
    try {
      const response = await axios.post("/api/profile/payFine");
      console.log("response.data", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
    getBalance();
    getBooks();
    getFine();
  }, []);
  return (
    <div className="profile">
      <div className="profile_container">
        <div className="profile_container_avatar">
          <Avatar className="w-[100%] h-[100%]">
            <AvatarImage
              className="w-[100%] h-[100%]"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="Avatar"
            />
            <AvatarFallback />
          </Avatar>
        </div>

        <div className="profile_container_name">
          <h1>Name: {user.studentName} </h1>
          <p>Email: {user.email}</p>
          <p>Roll No:{user.studentRollNo}</p>
          <p>Phone:{user.studentContactNo}</p>

          <p>Verified:</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
      <div className="profile_container_stats">
        <div className="profile_container_stats_items">
          <h1>{books.length}</h1>
          <p>Total Books</p>
        </div>
        <div className="profile_container_stats_items">
          <h1>{fine}Rs</h1>
          <p>Fine Pending</p>
          <Button>Pay Fine</Button>
        </div>
        <div className="profile_container_stats_items">
          {" "}
          <h1>{balance}Rs</h1>
          <p>Acc Balance</p>
          <Button onClick={addBalance}>Add Money</Button>
        </div>
      </div>

      <div className="profile_container_books">
        <h1>Books on shelf</h1>
        <div className="profile_books_container">
          {booksLoading ? (
            <div className="loading"></div>
          ) : (
            books.map(({ index, _id, description, title, price }) => (
              <div className="books_container_book" key={_id}>
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
                    Rs. {price}
                  </p>
                  <Button className="books_container_book_description_button">
                    Return Book
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="profile_container_books_container"></div>
      </div>
    </div>
  );
}
