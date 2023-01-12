import { API_URL } from "./config";
export async function getPosts(start: string, limit: string) {
  const response = await fetch(`${API_URL}posts?start=${start}&limit=${limit}`, {
    headers: { accept: "application/json" },
  });
  const responseJson = await response.json();
  return responseJson;
}
