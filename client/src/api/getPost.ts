import { API_URL } from "./config";

export async function getPost(postId: string) {
  const response = await fetch(`${API_URL}posts/${postId}`, {
    headers: { accept: "application/json" },
  });
  return response.json();
}
