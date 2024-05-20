// src/app/home/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Posts from "@/sections/Posts";

export default function Homepage() {
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const isAdmin = user.role === "admin";
  
  return (
    <main id="main">
      <Header />
      <Hero />
      <Posts />
      <Footer />
    </main>
  );
}
