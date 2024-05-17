// PostItems.tsx
'use client';
import Footer from '@/components/Footer';
import PageTitle from '@/components/PageTitle';
import PostItemOne from '@/components/PostItemOne';
import Preloader from '@/components/Preloader';
import { PostProps } from '@/sections/Posts';
import React, { useEffect, useState } from 'react';
import './style.css';

export default function PostItems() {
  const [items, setItems] = useState([]);

  const getItemsData = () => {
    fetch(`/api/postitems`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    getItemsData();
  }, []);

  return (
    <main id="main" className="main-container">
      <section id="posts" className="posts">
        <div className="container">
          <div className="row">
            <PageTitle title="Post Items List" />
            {items && items.length > 0 ? (
              items.map((item: PostProps) => (
                <div className="col-lg-3 col-md-6" key={item._id}>
                  <PostItemOne large={false} item={item} />
                </div>
              ))
            ) : (
              <Preloader />
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}