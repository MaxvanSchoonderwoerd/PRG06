import { API_URL } from "./config";

export async function createPost(user: string, title: string, body: string, active: string) {
  return await fetch(`${API_URL}posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      title,
      body,
      active,
    }),
  });
}
