"use client";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import PostItemOne from "@/components/PostItemOne";
import Preloader from "@/components/Preloader";
import { PostProps } from "@/sections/Posts";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.css";
import Header from "@/components/Header";

export default function PostItems() {
  const [items, setItems] = useState<PostProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const perPage = 12;

  const getItemsData = () => {
    setIsLoading(true);
    const startIndex = (currentPage - 1) * perPage;
    fetch(
      `/api/postitems?start=${startIndex}&perPage=${perPage}&search=${searchQuery}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
        setTotalItems(data.totalCount);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getItemsData();
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    getItemsData();
  };

  return (
    <main id="main" className="main-container">
      <Header />
      <section id="posts" className="posts">
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <div className="col-md-6 col-12">
                <form onSubmit={handleSearch} className="search-bar">
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    className="form-control form-input"
                    placeholder="Search post..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>
            <PageTitle title="Post Items List" />
            {isLoading ? (
              <Preloader />
            ) : items.length > 0 ? (
              <div>
                <div className="row">
                  {items.map((item: PostProps, index: number) => (
                    <div className="col-lg-3 col-md-6" key={index}>
                      <PostItemOne large={false} item={item} />
                    </div>
                  ))}
                </div>
                <div className="pagination-container">
                  <ReactPaginate
                    previousLabel={"«"}
                    nextLabel={"»"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(totalItems / perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                  />
                </div>
              </div>
            ) : (
              <div className="no-posts">Post not listed</div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
