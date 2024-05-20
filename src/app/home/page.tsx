// src/app/home/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Posts from "@/sections/Posts";

export default function Homepage() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if window object is defined to ensure client-side execution
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserRole(user.role);
      }
    }
  }, []);
  return (
    <main id="main">
      <Header />
      <Hero />
      <Posts />
      <Footer />
    </main>
  );
}
