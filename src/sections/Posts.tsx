import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./posts.css";
import PostItemOne from "@/components/PostItemOne";
import TrendingPost from "@/components/TrendingPost";
import Preloader from "@/components/Preloader";

export interface PostProps {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  avatar: string;
  author: string;
  trending: boolean;
  top: boolean;
}

export const initialPost: PostProps = {
  _id: "",
  img: "",
  category: "",
  date: "",
  title: "",
  brief: "",
  avatar: "",
  author: "",
  trending: false,
  top: false,
};

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<PostProps[]>([]);
  const [trendingItems, setTrendingItems] = useState<PostProps[]>([]);
  const [item, setItem] = useState<PostProps>(initialPost);

  const getItemsData = () => {
    fetch("/api/postitems?start=0&perPage=10")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
      })
      .catch((e) => console.log(e.message));
  };

  const getTrendingItemsData = () => {
    fetch("/api/postitems?trending=true")
      .then((res) => res.json())
      .then((data) => {
        setTrendingItems(data.items);
      })
      .catch((e) => console.log(e.message));
  };

  const getSinglePostdata = (id: string) => {
    fetch(`/api/postitems/${id}`)
      .then((res) => {
        if (res.status === 404) {
          router.push("/not-found");
        }
        return res.json();
      })
      .then((data) => setItem(data))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getItemsData();
    getTrendingItemsData();
    getSinglePostdata("6646c9fafb38ec882b102655");

    const interval = setInterval(() => {
      getItemsData();
      getTrendingItemsData();
    }, 10000); // Polling setiap 10 detik

    return () => clearInterval(interval); // Membersihkan interval saat komponen unmount
  }, []);

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            <PostItemOne large={true} item={item} />
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                {items && items.length > 0 ? (
                  items
                    .slice(0, 3)
                    .map((item) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    ))
                ) : (
                  <Preloader />
                )}
              </div>
              <div className="col-lg-4 border-start custom-border">
                {items && items.length > 0 ? (
                  items
                    .slice(3, 6)
                    .map((item) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    ))
                ) : (
                  <Preloader />
                )}
              </div>
              <div className="col-lg-4">
                <div className="trending">
                  <h3>Trending</h3>
                  <ul className="trending-post">
                    {trendingItems && trendingItems.length > 0 ? (
                      trendingItems.map((item, index) => (
                        <TrendingPost key={item._id} index={index} item={item} />
                      ))
                    ) : (
                      <Preloader />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
