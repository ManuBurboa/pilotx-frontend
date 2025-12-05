// src/pages/PostDetailPage.tsx
import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import type { Post, Comment } from "../types/posts";
import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { getPost, getComments, createComment } from "../services/postsApi";
import CommentCard from "../components/comments/CommentCard";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadDetail = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getComments(id),
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError("No se pudo cargar el post");
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.trim()) return;

    setSending(true);

    try {
      const created = await createComment({
        postId: Number(id),
        name: "Nuevo comentario",
        email: "test@pilotx.com",
        body: newComment,
      });
      setComments((prev) => [...prev, created]);
      setNewComment("");
    } catch {
      alert("No se pudo enviar el comentario");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return <Alert severity="warning">Post no encontrado</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>

      <Typography sx={{ mb: 4 }}>{post.body}</Typography>

      <Typography variant="h5" gutterBottom>
        Comentarios
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {comments.map((c) => (
          <CommentCard key={c.id} comment={c} />
        ))}
      </Stack>

      <Typography variant="h6" gutterBottom>
        Agregar comentario
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Comentario"
          multiline
          minRows={3}
          sx={{ mb: 2 }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit" variant="contained" disabled={sending}>
          {sending ? "Enviando..." : "Enviar comentario"}
        </Button>
      </Box>
    </Box>
  );
};

export default PostDetailPage;
