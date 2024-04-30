"use client";

import React from "react";
import "@/styles/navbar.css";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_right">
        {" "}
        <h1 className="navbar_right_text">Library</h1>
      </div>
      <div className="navbar_middle">
        <div className="navbar_middle_icons">
          <Link href="/users/dashboard" className="navbar_middle_icons_link">
            DashBoard{" "}
          </Link>
        </div>
        <div className="navbar_middle_icons">
          <Link href="/users/books" className="navbar_middle_icons_link">
            {" "}
            Books{" "}
          </Link>
        </div>
        <div className="navbar_middle_icons">
          <Link href="/users/libraryrules" className="navbar_middle_icons_link">
            {" "}
            Rules{" "}
          </Link>
        </div>
      </div>
      <div className="navbar_left">
        {" "}
        <h1 className="navbar_left_text">
          <Link href="/users/profile" className="navbar_left_text_link">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </h1>
      </div>
    </div>
  );
}
