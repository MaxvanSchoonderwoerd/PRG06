import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "./Post";
const router = createBrowserRouter([
  {
    path: "/:start?/:limit?",
    element: <App />,
  },
  {
    path: "/posts/:postId",
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
