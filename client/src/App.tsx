import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createPost } from "./api/createPost";
import { deletePost } from "./api/deletePost";
import { getPosts } from "./api/getPosts";
import "./App.css";
import FormComponent from "./components/FormComponent";
import PaginationComponent from "./components/PaginationComponent";
import PostComponent from "./components/PostComponent";

export type TPost = {
  id: string;
  username: string;
  title: string;
  body: string;
  active: string;
};

export type TPaginationParams = {
  start: string | undefined;
};

export type Page<T> = {
  content: T[];
  number: number; // current page (0-based)
  size: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
};

function App() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [active, setActive] = useState("true");

  const [page, setPage] = useState<Page<TPost> | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page") ?? "1") - 1;

  const [pageNumber, setPageNumber] = useState<number>(
    isNaN(pageFromUrl) ? 0 : pageFromUrl
  );

  const [errorMsg, setError] = useState("");

  // Getting all posts
  useEffect(() => {
    loadPosts(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    setSearchParams({ page: String(pageNumber + 1) });
  }, [pageNumber, setSearchParams]);

  useEffect(() => {
    const raw = Number(searchParams.get("page") ?? "1") - 1;
    const safePage = Math.max(0, raw);

    if (!isNaN(safePage) && safePage !== pageNumber) {
      setPageNumber(safePage);
    }
  }, [searchParams]);

  const loadPosts = async (page: number) => {
    try {
      const response = await getPosts(page);
      setPage(response);
    } catch (err) {
      setError("Failed to load posts");
    }
  };

  const handleForm: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
    await loadPosts(pageNumber);
  }

  //Delete posts
  async function handleDeletePost(post: TPost) {
    await deletePost(post.id);
    await loadPosts(pageNumber);
  }

  return (
    <div className="App">
      <nav className="nav">
        <h1>
          <Link className="navLink" to={"/"}>
            Posts app met spring-boot backend
          </Link>
        </h1>
      </nav>
      <div className="container">
        <div className="decoBall decoBallFirst"></div>
        <div className="decoBall decoBallSecond"></div>
        <div className="decoBall decoBallThird"></div>
        <div className="posts">
          <h2>Recent posts</h2>
          {errorMsg}
          <ul className="postsLists">
            {page?.content.map((post) => (
              <PostComponent
                key={post.id}
                post={post}
                handleDeletePost={handleDeletePost}
              />
            ))}
          </ul>
          <PaginationComponent page={page} onPageChange={setPageNumber} />
        </div>
        <FormComponent
          handleForm={handleForm}
          user={user}
          title={title}
          body={body}
          active={active}
          setUser={setUser}
          setTitle={setTitle}
          setBody={setBody}
          setActive={setActive}
        />
        <div className="decoBall decoBallFourth"></div>
        <div className="decoBall decoBallFith"></div>
        <div className="decoBall decoBallSixth"></div>
      </div>
    </div>
  );
}

export default App;
