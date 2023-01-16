import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createPost } from "./api/createPost";
import { deletePost } from "./api/deletePost";
import { getPosts } from "./api/getPosts";
import "./App.css";
import FormComponent from "./components/FormComponent";
import PaginationComponent from "./components/PaginationComponent";
import PostComponent from "./components/PostComponent";

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

  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [active, setActive] = useState("true");

  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  const [posts, setPosts] = useState<TPost[]>([]);

  const [errorMsg, setError] = useState("");

  //Getting all posts
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      //if pagination is given load that specific page
      if (start != undefined && limit != undefined) {
        const response = await getPosts(start, limit);
        setPosts(response.items);
        handlePaginationLinks(response.pagination._links);
        handlePaginationInfo(response.pagination);
      } else {
        //load page 1
        const response = await getPosts("1", "12");
        setPosts(response.items);
        handlePaginationLinks(response.pagination._links);
        handlePaginationInfo(response.pagination);
      }
    } catch (error) {
      console.error(error);
      setError(`Api error, check if server is turned on. Error: ${error}`);
    }
  }

  const handleForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreatePost(e);
  };

  //Create posts
  async function handleCreatePost(e: React.FormEvent) {
    await createPost(user, title, body, active);
    setUser("");
    setTitle("");
    setBody("");
    setActive("");
    loadPosts();
  }

  //Delete posts
  async function handleDeletePost(post: TPost) {
    await deletePost(post._id)
      .then(() => {
        //After the delete action is completed, update the posts list by removing the deleted post from the list
        setPosts(posts.filter((p) => p._id !== post._id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handlePaginationLinks(_links: any) {
    const _next = await _links.next.href.replace("http://145.24.222.95:8000/posts?", "");
    const nextStart = _next.match(/\d+/)[0];
    setNext(`${nextStart}/12`);

    const _previous = await _links.previous.href.replace("http://145.24.222.95:8000/posts?", "");
    const previousStart = _previous.match(/\d+/)[0];
    setPrevious(`${previousStart}/12`);

    const _first = await _links.first.href.replace("http://145.24.222.95:8000/posts?", "");
    const firstStart = _first.match(/\d+/)[0];
    setFirst(`${firstStart}/12`);

    const _last = await _links.last.href.replace("http://145.24.222.95:8000/posts?", "");
    const lastStart = _last.match(/\d+/)[0];
    setLast(`${lastStart}/12`);
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
        <div className="posts">
          <h2>Recent posts</h2>
          {errorMsg}
          <ul className="postsLists">
            {posts.map((post) => (
              <PostComponent post={post} handleDeletePost={handleDeletePost} key={post._id} />
            ))}
          </ul>
          <PaginationComponent first={first} previous={previous} next={next} last={last} currentPage={currentPage} totalPages={totalPages} currentItems={currentItems} totalItems={totalItems} loadPosts={loadPosts} />
        </div>
        <FormComponent handleForm={handleForm} user={user} title={title} body={body} active={active} setUser={setUser} setTitle={setTitle} setBody={setBody} setActive={setActive} />
      </div>
    </div>
  );
}

export default App;
