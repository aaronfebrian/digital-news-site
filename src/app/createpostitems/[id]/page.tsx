"use client";
import React, { useEffect, useState } from "react";
import { initialState } from "../initialState";
import Header from "@/components/Header";

export default function EditPostItem({ params }: { params: { id: string } }) {
  const id = params.id;
  const [text, setText] = useState(initialState);
  const [image, setImage] = useState<any>(null);
  const [isSending, setIsSending] = useState(false);

  const getSinglePostData = () => {
    fetch(`/api/postitems/${id}`)
      .then((res) => res.json())
      .then((data) => setText(data))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getSinglePostData();
  }, []);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: "" });
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
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

    setIsSending(true); // Set isSending true jika mengirim post

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
          method: "PUT",
          body: formData,
        }
      );

      const imageData = await imageResponse.json();

      const response = await fetch(`/api/postitems/${id}`, {
        method: "PUT",
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

      if (result === 200) {
        setText({ ...text, validate: "success" });
        console.log("Success", result);
      }
    } catch (error) {
      setText({ ...text, validate: "error" });
      console.log("Error", error);
    }

    setIsSending(false); // Set isSending false jika pengiriman selesai
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
                      <h1 className="page-title">Edit Post</h1>
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
                        <label>Image File</label>
                        <input
                          type="file"
                          name="img"
                          onChange={handleFileChange}
                          className="form-control"
                          accept="image/*"
                          style={{
                            maxWidth: "100%", // Adjust maximum width
                            height: "auto", // Maintain aspect ratio
                          }}
                        />
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
                          <div className="loading">Updating Post</div>
                        )}
                        {text.validate === "incomplete" && (
                          <div className="error-message">
                            Please fill in all above details
                          </div>
                        )}
                        {text.validate === "success" && (
                          <div className="sent-message">
                            Your news was updated!
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
                          disabled={isSending} // Disable the button while sending
                        >
                          {isSending ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : (
                            "Update Post"
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
    </main>
  );
}
