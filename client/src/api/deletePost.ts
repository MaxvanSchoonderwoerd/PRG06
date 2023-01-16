import { API_URL } from "./config";

export async function deletePost(postId: string) {
  try {
    return fetch(`${API_URL}posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
