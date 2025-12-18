import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "./api/getPost";
import { putPost } from "./api/putPost";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "./App.css";

type TPost = {
  id: string;
  username: string;
  title: string;
  body: string;
  active: string;
  created_at: string;
  edited_at: string;
};

function Post() {
  const [post, setPost] = useState<TPost>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [editedAt, setEditedAt] = useState(new Date());

  type postParams = {
    postId: string | undefined;
  };

  const { postId } = useParams<postParams>();

  async function handleUpdatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!postId || !post) return;
    await putPost(post?.username, title, body, post?.active, postId);
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
      setCreatedAt(new Date(response.createdAt));
      setEditedAt(new Date(response.editedAt));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPost();
  }, [postId]);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  return (
    <section className="App">
      <nav className="nav">
        <h1>
          <Link className="navLink" to={"/"}>
            Posts app met spring-boot backend
          </Link>
        </h1>
      </nav>
      <div className="container">
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
            <p>
              Created {timeAgo.format(createdAt)}, edited{" "}
              {timeAgo.format(editedAt)}
            </p>
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
