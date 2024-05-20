import React from "react";
import "./postItemOne.css";
import Link from "next/link";
import { PostProps } from "@/sections/Posts";

export default function PostItemOne({
  large,
  item,
}: {
  large: boolean;
  item: PostProps;
}) {
  // Fungsi untuk memotong brief menjadi sekitar 5 kalimat dan menambahkan "..." di akhir
  const trimBrief = (brief: string, maxSentences: number) => {
    if (!brief) return ""; // Mengembalikan string kosong jika brief tidak ada
    const sentences = brief.split(/[.!?]/);
    const maxIndex = Math.min(maxSentences, sentences.length);
    return sentences.slice(0, maxIndex).join(".") + (sentences.length > maxSentences ? "..." : "");
  };

  return (
    <div className={`post-entry-1 ${large ? "lg" : ""}`}>
      <Link href={`/postitems/${item._id}`}>
        <img src={item.img} alt="image" className="img-fluid" />
      </Link>
      <div className="post-meta">
        <span className="date">{item.category}</span>
        <span className="mx-1">
          <i className="bi bi-dot"></i>{" "}
        </span>{" "}
        <span>{new Date(item.date).toLocaleDateString("en-US")}</span>
      </div>
      <h2>
        <Link href={`/postitems/${item._id}`}>{item.title}</Link>
      </h2>
      {large ? (
        <>
          <p className="mb-4 d-block">{trimBrief(item.brief, 5)}</p>

          <div className="d-flex align-items-center author">
            <div className="name">
              <h3 className="m-0 p-0">{item.author}</h3>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
