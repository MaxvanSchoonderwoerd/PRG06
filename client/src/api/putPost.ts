import { API_URL } from "./config";

export async function putPost(user: string, title: string, body: string, active: string, postId: string) {
  return await fetch(`${API_URL}posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      title,
      body,
      active,
    }),
  });
}
