"use client";
import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer id="footer" className="footer d-flex align-items-center justify-content-center">
      <div>
        © 2024 Copyright:
        <a className="text-white" href="#">
          {" "}
          ARNews
        </a>
      </div>
    </footer>
  );
}
