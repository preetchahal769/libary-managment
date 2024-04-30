"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "@/styles/profile.css";
import "@/styles/books.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const logout = () => {
    try {
      axios.get("/api/users/logout");
      console.log("logged out");
      window.history.go(0);
      router.push("/accounts/login");
    } catch (error) {
      console.log(error);
    }
  };
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
          <h1>Username:</h1>
          <p>Full Name:</p>
          <p>Address:</p>
          <p>Phone:</p>
          <p>Email:</p>
          <p>Joined:</p>
          <p>Role:</p>
          <p>Verified:</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
      <div className="profile_container_stats">
        <div className="profile_container_stats_items">
          <h1>5</h1>
          <p>Total Books</p>
        </div>
        <div className="profile_container_stats_items">
          <h1>100Rs</h1>
          <p>Fine Pending</p>
        </div>
        <div className="profile_container_stats_items">
          {" "}
          <h1>100Rs</h1>
          <p>Acc Balance</p>
        </div>
      </div>

      <div className="profile_container_books">
        <h1>Books on shelf</h1>
        <div className="books_container_book">
          <img
            src="http://localhost:3000/assets/books/history.jpeg"
            alt=""
            className="books_container_book_image"
          />
          <div className="books_container_book_description">
            <h1 className="books_container_book_description_title">dfgfdgdg</h1>
            <p className="books_container_book_description_description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et neque
              expedita voluptas. Ad ea rem distinctio nam molestiae pariatur
              consequuntur harum et eum asperiores, tempore, mollitia qui?
              Tenetur laborum alias perferendis, maiores vitae eaque.
            </p>
            <p className="books_container_book_description_price">Rs. 100</p>
            <Button className="books_container_book_description_button">
              Return Book
            </Button>
          </div>
        </div>
        <div className="profile_container_books_container"></div>
      </div>
    </div>
  );
}
