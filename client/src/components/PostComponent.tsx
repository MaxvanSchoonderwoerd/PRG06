import { Link } from "react-router-dom";
import { TPost } from "../App";
import postBg from "../assets/background2.png";

type TPostProp = {
  post: TPost;
  handleDeletePost: Function;
};

export default function PostComponent(props: TPostProp) {
  return (
    <li className="post" key={props.post._id}>
      <p className="user">Posted by {props.post.user}</p>
      <Link to={`/posts/${props.post._id}`}>{props.post.title}</Link>
      <button className="deleteButton" onClick={() => props.handleDeletePost(props.post)}>
        X
      </button>
      {/* <img className="backgroundImg" src={postBg} alt="post background img" /> */}
    </li>
  );
}
