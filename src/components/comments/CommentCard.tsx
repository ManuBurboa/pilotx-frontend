import { Card, CardContent, Typography } from "@mui/material";
import type { Comment } from "../../types/posts";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2">{comment.email}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {comment.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
