// src/app/home/page.tsx
'use client'
import React, {useEffect, useState} from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/sections/Hero';
import Posts from '@/sections/Posts';

export default function Homepage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSomeAction = () => {
    if (isClient) {
      const storedUser = localStorage.getItem('user');
    }
  };
  return (
      <main id="main">
        <Header />
        <Hero />
        <Posts />
        <Footer />
      </main>
  );
}
