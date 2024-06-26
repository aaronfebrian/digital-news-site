"use client";
import { useEffect, useState } from "react";
import { PostProps, initialPost } from "@/sections/Posts";
import "./style.css";
import Preloader from "@/components/Preloader";
import SidePostItem from "@/components/SidePostItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PostItem({ params }: { params: { id: string } }) {
  const id: string = params.id;
  const router = useRouter();
  const [item, setItem] = useState(initialPost);
  const [items, setItems] = useState<PostProps[]>([]);
  const [trendingItems, setTrendingItems] = useState<PostProps[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserRole(user.role);
      }
    }
  }, []);

  const tabsData = [
    { id: 1, name: "Popular", active: true },
    { id: 2, name: "Trending", active: false },
  ];

  const [tabs, setTabs] = useState(tabsData);

  const handleTabActive = (id: number): void => {
    setTabs(
      tabs.map((tab) => {
        tab.active = tab.id === id;
        return tab;
      })
    );
  };

  const getSinglePostData = () => {
    fetch(`/api/postitems/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((e) => console.log(e.message));
  };

  const getItemsData = () => {
    fetch("/api/postitems")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch((e) => console.log(e.message));
  };

  const getTrendingItemsData = () => {
    fetch("/api/postitems?trending=true")
      .then((res) => res.json())
      .then((data) => setTrendingItems(data.items || []))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getSinglePostData();
    getItemsData();
    getTrendingItemsData();
  }, []);

  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/postitems/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Success", response.status);
        router.push(`/postitems`);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const renderBrief = (brief: string) => {
    return brief.split("\n").map((paragraph, index) => (
      <p key={index}>
        {index === 0 ? (
          <span className="firstcharacter">{paragraph.charAt(0)}</span>
        ) : null}
        {index === 0 ? paragraph.substring(1) : paragraph}
      </p>
    ));
  };

  return (
    <main id="main">
      <Header />
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content">
              {item && item.category !== "" ? (
                <div className="single-post">
                  <div className="post-meta">
                    <span className="date">{item.category}</span>
                    <span className="mx-1">
                      <i className="bi bi-dot"></i>
                    </span>
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <h1 className="mb-5">{item.title}</h1>
                  <figure className="my-4">
                    <img src={item.img} alt="image" className="img-fluid" />
                  </figure>
                  <div>{item.brief && renderBrief(item.brief)}</div>
                  {userRole === "admin" && (
                    <div
                      className="button d-flex gap-4"
                    >
                      <a
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                      >
                        <i className="bi bi-trash"></i>
                      </a>
                      <Link
                        href={`/createpostitems/${id}`}
                        className="btn btn-primary"
                      >
                        <i className="bi bi-pen"></i>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Preloader />
              )}
            </div>
            <div className="col-md-3">
              <div className="aside-block">
                <ul className="nav nav-pills custom-tab-nav mb-4">
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${
                          tab.active ? "active" : undefined
                        }`}
                        onClick={() => handleTabActive(tab.id)}
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  <div
                    className={`tab-pane fade ${
                      tabs[0].active ? "show active" : ""
                    }`}
                  >
                    {items.slice(0, 7).map((item: PostProps) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                  <div
                    className={`tab-pane fade ${
                      tabs[1].active ? "show active" : ""
                    }`}
                  >
                    {trendingItems
                      .slice(0, 7)
                      .map((item: PostProps) => (
                        <SidePostItem key={item._id} item={item} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Modal HTML */}
      {showModal && (
        <div
          id="myModal"
          className="modal fade show"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-confirm show">
            <div className={`modal-content ${showModal ? "show" : ""}`}>
              <div className="modal-header flex-column">
                <div className="icon-box">
                  <i className="bi bi-trash3-fill"></i>
                </div>
                <h4 className="modal-title w-100">Are you sure?</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                  onClick={() => setShowModal(false)}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Do you really want to delete this post? This process cannot be
                  undone.
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    handleDeletePost(id);
                    setShowModal(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
