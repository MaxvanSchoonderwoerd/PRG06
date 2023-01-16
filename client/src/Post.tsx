import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "./api/getPost";
import { putPost } from "./api/putPost";

import "./App.css";

function Post() {
  type TPost = {
    _id: string;
    user: string;
    title: string;
    body: string;
    active: string;
  };
  const [post, setPost] = useState<TPost>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  type postParams = {
    postId: string | undefined;
  };

  const { postId } = useParams<postParams>();

  async function handleUpdatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!postId || !post) return;
    await putPost(post?.user, title, body, post?.active, postId);
    setTitle("");
    setBody("");
  }

  useEffect(() => {
    (async () => {
      try {
        if (!postId) return;
        const response = await getPost(postId);
        setPost(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [postId]);
  return (
    <section className="App">
      <nav className="nav">
        <h1>
          <Link className="navLink" to={"/"}>
            PRG6 project - MERN stack posts app
          </Link>
        </h1>
      </nav>
      <div className="container">
        <div className="postContainer">
          <div className="postDetails">
            <h1 className="postContent">{post?.title}</h1>
            <p className="postContent">By: {post?.user}</p>
            <p className="postContent">{post?.body}</p>
          </div>
        </div>
        <div className="postContainer">
          <div className="postDetails">
            <form onSubmit={handleUpdatePost}>
              <h2>Update post</h2>
              <label style={{ display: "none" }} htmlFor="postTitle">
                Title
              </label>
              <input
                id="postTitle"
                type="text"
                placeholder={post?.title}
                value={title}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
              />
              <label style={{ display: "none" }} htmlFor="postBody">
                Body
              </label>
              <textarea
                id="postBody"
                placeholder={post?.body}
                value={body}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setBody(e.target.value);
                }}
              ></textarea>
              <button>Update post</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Post;
