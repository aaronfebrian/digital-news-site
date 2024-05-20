// src/app/home/page.tsx
'use client'
import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/sections/Hero';
import Posts from '@/sections/Posts';

export default function Homepage() {
  return (
      <main id="main">
        <Header />
        <Hero />
        <Posts />
        <Footer />
      </main>
  );
}
