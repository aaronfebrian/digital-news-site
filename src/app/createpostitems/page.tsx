"use client";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import { initialState } from "./initialState";
import Header from "@/components/Header";

export default function CreatePostItem() {
  const [text, setText] = useState(initialState);
  const [image, setImage] = useState<any>(null);
  const [isSending, setIsSending] = useState(false);
  const [imageError, setImageError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSomeAction = () => {
    if (isClient) {
      const storedUser = localStorage.getItem('user');
      // Lakukan sesuatu dengan localStorage di sini
    }
  };

  console.log(image);

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

      setText({ ...text, validate: "loading" });

      const result = response.status;

      if (result === 201) {
        setText({ ...text, validate: "success" });
        console.log("Success", result);
      }
    } catch (error) {
      setText({ ...text, validate: "error" });
      console.log("Error", error);
    }

    setIsSending(false);
  };

  return (
    <main id="main">
      <Header />
      <section className="create-post-content">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10">
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      <h1 className="page-title">Create New Post</h1>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={text.title}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter title"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>
                          Image File{" "}
                          <span className="text-muted">
                            (Recommended: 900x571)
                          </span>
                        </label>
                        <input
                          type="file"
                          name="img"
                          onChange={handleFileChange}
                          className="form-control"
                          placeholder="Enter image"
                          style={{
                            maxWidth: "100%", // Adjust maximum width
                            height: "auto", // Maintain aspect ratio
                          }}
                        />
                        {imageError && (
                          <div className="alert alert-danger mt-2" role="alert">
                            {imageError}
                          </div>
                        )}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Category</label>
                        <input
                          type="text"
                          name="category"
                          value={text.category}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter post category"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Author</label>
                        <input
                          type="text"
                          name="author"
                          value={text.author}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter author name"
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Brief</label>
                        <textarea
                          className="form-control"
                          value={text.brief}
                          onChange={handleTextChange}
                          name="brief"
                          cols={30}
                          rows={10}
                          placeholder="Enter post brief"
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        {text.validate === "loading" && (
                          <div className="loading">Sending Post</div>
                        )}
                        {text.validate === "incomplete" && (
                          <div className="error-message">
                            Please fill in all above details
                          </div>
                        )}
                        {text.validate === "success" && (
                          <div className="sent-message">
                            Your news was posted successfully!
                          </div>
                        )}
                        {text.validate === "error" && (
                          <div className="error-message">Server Error</div>
                        )}
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSending}
                        >
                          {isSending ? (
                            <span className="sending-text">
                              Sending Post<span className="dot-1">.</span>
                              <span className="dot-2">.</span>
                              <span className="dot-3">.</span>
                            </span>
                          ) : (
                            "Post Item"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .sending-text {
          display: inline-flex;
          align-items: center;
        }
        .dot-1,
        .dot-2,
        .dot-3 {
          animation: blink 1.4s infinite both;
        }
        .dot-2 {
          animation-delay: 0.2s;
        }
        .dot-3 {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
      <Footer />
    </main>
  );
}
