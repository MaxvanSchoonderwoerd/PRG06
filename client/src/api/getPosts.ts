import { API_URL } from "./config";
export async function getPosts(page: number) {
  const response = await fetch(`${API_URL}posts?page=${page}&size=12`, {
    headers: { accept: "application/json" },
  });
  const responseJson = await response.json();
  return responseJson;
}
