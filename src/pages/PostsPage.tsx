import { useEffect, useState } from "react";
import { getPosts } from "../services/postsApi";
import PostCard from "../components/posts/PostCard";
import type { Post } from "../types/posts";

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("No se pudieron cargar los posteos");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Cargando posteos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <main className="posts-page">
      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>

  );
};

export default PostsPage;
