import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createPost } from "./api/createPost";
import { deletePost } from "./api/deletePost";
import { getPosts } from "./api/getPosts";
import postBg from "./background2.png";
import "./App.css";

export type TPost = {
  _id: string;
  user: string;
  title: string;
  body: string;
  active: string;
};
export type TPaginationParams = {
  start: string | undefined;
  limit: string | undefined;
};

function App() {
  let { start } = useParams<TPaginationParams>();
  let { limit } = useParams<TPaginationParams>();

  const [currentPage, setCurrentPage] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [currentItems, setCurrentItems] = useState("");
  const [totalItems, setTotalItems] = useState("");

  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  const [posts, setPosts] = useState<TPost[]>([]);
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [active, setActive] = useState("true");

  const [errorMsg, setError] = useState("");

  //Getting all posts
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    (async () => {
      try {
        console.log(start, limit);

        //if pagination is given load that specific page
        if (start != undefined && limit != undefined) {
          const response = await getPosts(start, limit);
          setPosts(response.items);
          handlePaginationLinks(response.pagination._links);
          handlePaginationInfo(response.pagination);
        } else {
          //load page 1
          const response = await getPosts("1", "10");
          setPosts(response.items);
          handlePaginationLinks(response.pagination._links);
          handlePaginationInfo(response.pagination);
        }
      } catch (error) {
        console.error(error);
        setError(`Api error, check if server is turned on. Error: ${error}`);
      }
    })();
  }

  //Create posts
  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    await createPost(user, title, body, active);
    setUser("");
    setTitle("");
    setBody("");
    setActive("");
  }

  //Delete posts
  async function handleDeletePost(post: TPost) {
    await deletePost(post._id)
      .then(() => {
        // After the delete action is completed, update the posts list by removing the deleted post from the list
        setPosts(posts.filter((p) => p._id !== post._id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handlePaginationLinks(_links: any) {
    const _next = await _links.next.href.replace("http://145.24.222.95:8000/posts?", "");
    const nextStart = _next.match(/\d+/)[0];
    setNext(`${nextStart}/10`);

    const _previous = await _links.previous.href.replace("http://145.24.222.95:8000/posts?", "");
    const previousStart = _previous.match(/\d+/)[0];
    setPrevious(`${previousStart}/10`);

    const _first = await _links.first.href.replace("http://145.24.222.95:8000/posts?", "");
    const firstStart = _first.match(/\d+/)[0];
    setFirst(`${firstStart}/10`);

    const _last = await _links.last.href.replace("http://145.24.222.95:8000/posts?", "");
    const lastStart = _last.match(/\d+/)[0];
    setLast(`${lastStart}/10`);
  }

  async function handlePaginationInfo(paginationInfo: any) {
    setCurrentPage(paginationInfo.currentPage);
    setTotalPages(paginationInfo.totalPages);
    setCurrentItems(paginationInfo.currentItems);
    setTotalItems(paginationInfo.totalItems);
  }

  return (
    <div className="App">
      <nav className="nav">
        <h1>
          <Link className="navLink" to={"/"}>
            PRG6 project - MERN stack posts app
          </Link>
        </h1>
      </nav>
      <div className="container">
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
        <div className="posts">
          <h2>Recent posts</h2>
          {errorMsg}
          <ul className="postsLists">
            {posts.map((post) => (
              <li className="post" key={post._id}>
                <p className="user">Posted by {post.user}</p>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
                <button className="deleteButton" onClick={() => handleDeletePost(post)}>
                  Delete
                </button>
                <img className="backgroundImg" src={postBg} alt="post background img" />
                <img src="" alt="" />
              </li>
            ))}
          </ul>
          <div className="pagination">
            <Link className="paginationLink" to={`/${first}`} onClick={() => loadPosts()}>
              &lt;&lt;&lt;
            </Link>
            <Link className="paginationLink" to={`/${previous}`} onClick={() => loadPosts()}>
              &lt;
            </Link>
            <Link className="paginationLink" to={`/${next}`} onClick={() => loadPosts()}>
              &gt;
            </Link>
            <Link className="paginationLink" to={`/${last}`} onClick={() => loadPosts()}>
              &gt;&gt;&gt;
            </Link>
            <p className="paginationLink">
              page: {currentPage}/{totalPages}
            </p>
            <p className="paginationLink">
              showing {currentItems}/{totalItems} posts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
