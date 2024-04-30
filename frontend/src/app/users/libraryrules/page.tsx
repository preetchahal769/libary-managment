"use client";

import React from "react";

import "@/styles/rules.css";

export default function page() {
  return (
    <div className="libary_rules">
      <div className="libary_rules_container">
        <div className="libary_rules_title">Library rules</div>
        <div className="libary_rules_container_rule">
          <h1>1</h1> For borowwing books from library your account must be
          verified.
        </div>
        <div className="libary_rules_container_rule">
          <h1>2</h1>
          you can borrow maximum 3 books at a time.
        </div>
        <div className="libary_rules_container_rule">
          <h1>3</h1>
          You will be fined if u don't pay the libary fee.
        </div>
        <div className="libary_rules_container_rule">
          <h1>4</h1>
          You will be fined if u don't return the book within 7 days.
        </div>
        <div className="libary_rules_container_rule">
          <h1>5</h1>
          Your account will be suspended if you void the rules.
        </div>
        <div className="libary_rules_container_rule">
          <h1>6</h1>
          YOu are not allowed to sold the book or copies.
        </div>
      </div>
    </div>
  );
}
