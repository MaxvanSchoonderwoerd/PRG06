import { useState } from "react";
import { Link } from "react-router-dom";
import { TPost } from "../App";
import postBg from "../assets/background2.png";

type TPostProp = {
  post: TPost;
  handleDeletePost: Function;
};

export default function PostComponent(props: TPostProp) {
  const [style, setStyle] = useState({ display: "none" });

  return (
    <li
      className="post"
      key={props.post._id}
      onMouseEnter={(e) => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={(e) => {
        setStyle({ display: "none" });
      }}
    >
      <p className="user">Posted by {props.post.user}</p>
      <Link to={`/posts/${props.post._id}`}>{props.post.title}</Link>
      <button className="deleteButton" style={style} onClick={() => props.handleDeletePost(props.post)}>
        X
      </button>
    </li>
  );
}
