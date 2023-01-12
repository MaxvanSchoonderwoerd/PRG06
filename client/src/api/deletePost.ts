import { API_URL } from "./config";

export async function deletePost(postId: string) {
  return fetch(`${API_URL}posts/${postId}`, { method: "DELETE" });
}
