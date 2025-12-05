import type { Post, Comment } from "../types/posts";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) {
    throw new Error("No se pudieron cargar los posteos");
  }
  return res.json();
};

export const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) {
    throw new Error("No se pudo cargar el post");
  }
  return res.json();
};

export const getComments = async (id: string): Promise<Comment[]> => {
  const res = await fetch(`${API_URL}/posts/${id}/comments`);
  if (!res.ok) {
    throw new Error("No se pudieron cargar los comentarios");
  }
  return res.json();
};

export const createComment = async (
  data: Omit<Comment, "id">
): Promise<Comment> => {
  const res = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el comentario");
  }

  return res.json();
};
