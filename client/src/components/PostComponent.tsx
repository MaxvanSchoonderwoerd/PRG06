import { useState } from "react";
import { Link } from "react-router-dom";
import { TPost } from "../App";

type TPostProp = {
  post: TPost;
  handleDeletePost: Function;
};

export default function PostComponent(props: TPostProp) {
  const [style, setStyle] = useState({ display: "none" });

  return (
    <li
      className="post"
      key={props.post.id}
      onMouseEnter={(e) => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={(e) => {
        setStyle({ display: "none" });
      }}
    >
      <p className="user">Posted by {props.post.username}</p>
      <Link to={`/posts/${props.post.id}`}>{props.post.title}</Link>
      <button
        className="deleteButton"
        style={style}
        onClick={() => props.handleDeletePost(props.post)}
      >
        X
      </button>
    </li>
  );
}
