"use client";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { initialState } from "./initialState";
import Header from "@/components/Header";

export default function CreatePostItem() {
  const [text, setText] = useState(initialState);
  const [image, setImage] = useState<any>(null);
  const [isSending, setIsSending] = useState(false);
  const [imageError, setImageError] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > 1000 || img.height > 1000) {
          setImageError(
            "Image dimensions should be less than or equal to 1000x1000."
          );
          setImage(null);
        } else {
          setImageError("");
          setImage(file);
        }
      };
    }
  };

  const handleTextChange = (e: any) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: "" });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      text.title === "" ||
      !image ||
      text.category === "" ||
      text.brief === ""
    ) {
      setText({ ...text, validate: "incomplete" });
      return;
    }

    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME!
      );

      const imageResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await imageResponse.json();

      const response = await fetch("/api/postitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: text.title,
          img: imageData.secure_url,
          category: text.category,
          author: text.author,
          brief: text.brief,
          validate: text.validate,
        }),
      });

      if (response.ok) {
        setText(initialState);
        setImage(null);
        setText({ ...text, validate: "complete" });
      } else {
        const errorData = await response.json();
        setText({ ...text, validate: errorData.message });
      }
    } catch (error) {
      setText({ ...text, validate: "An unexpected error occurred." });
    }

    setIsSending(false);
  };

  return (
    <main id="main" className="main-container">
      <Header />
      <section className="create-post-item">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 offset-lg-2">
              <form
                className="form-control"
                onSubmit={handleFormSubmit}
                encType="multipart/form-data"
              >
                <h2 className="title">Create Post Item</h2>
                <div className="input-box">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={text.title}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {imageError && <p className="error">{imageError}</p>}
                </div>
                <div className="input-box">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={text.category}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={text.author}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="brief">Brief</label>
                  <textarea
                    id="brief"
                    name="brief"
                    value={text.brief}
                    onChange={handleTextChange}
                  ></textarea>
                </div>
                {text.validate && (
                  <p className="error">
                    {text.validate === "incomplete"
                      ? "Please complete all fields."
                      : text.validate}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}