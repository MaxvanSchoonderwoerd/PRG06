import { useState } from "react";
import { createPost } from "../api/createPost";

export default function FormComponent() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [active, setActive] = useState("true");
  //Create posts
  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    await createPost(user, title, body, active);
    setUser("");
    setTitle("");
    setBody("");
    setActive("");
  }

  return (
    <form onSubmit={handleCreatePost}>
      <h2>Create posts</h2>
      <label htmlFor="postUser">User</label>
      <input
        id="postUser"
        type="text"
        placeholder="Enter your username"
        value={user}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUser(e.target.value);
        }}
      />
      <label htmlFor="postTitle">Title</label>
      <input
        id="postTitle"
        type="text"
        placeholder="Enter the title of your post"
        value={title}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="postBody">Body</label>
      <textarea
        id="postBody"
        placeholder="Enter the body of your post"
        value={body}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setBody(e.target.value);
        }}
      ></textarea>
      <label style={{ display: "none" }} htmlFor="postActive">
        Active
      </label>
      <input
        style={{ display: "none" }}
        type="checkbox"
        value={"true"}
        checked
        disabled
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setActive("true");
        }}
      />
      <button>Create post</button>
    </form>
  );
}
