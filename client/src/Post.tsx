import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "./api/getPost";
import { putPost } from "./api/putPost";
import "./App.css";

type TPost = {
  _id: string;
  user: string;
  title: string;
  body: string;
  active: string;
};

function Post() {
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
    loadPost();
  }

  async function loadPost() {
    if (!postId) return;
    try {
      const response = await getPost(postId);
      setPost(response);
      setTitle(response.title);
      setBody(response.body);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPost();
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
        {/* <div className="postContainer">
          <div className="postDetails">
            <h1 className="postContent">{post?.title}</h1>
            <p className="postContent">By: {post?.user}</p>
            <p className="postContent">{post?.body}</p>
          </div>
        </div> */}
        <div className="postContainer">
          <form className="postDetails" onSubmit={handleUpdatePost}>
            <input
              className="postDetailsTitle"
              id="postTitle"
              type="text"
              placeholder={post?.title}
              value={title}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
            />
            <textarea
              className="postDetailsBody"
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
    </section>
  );
}
export default Post;
