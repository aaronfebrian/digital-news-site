// src/app/home/page.tsx
'use client'
import React, {useState, useEffect} from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/sections/Hero';
import Posts from '@/sections/Posts';

export default function Homepage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
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
