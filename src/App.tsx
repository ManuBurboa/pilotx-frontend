import { Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";

const App = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f3f4f6",
      }}
    >
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#111827",
        boxShadow: 2,
      }}
      >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
          gap: 3,                    
        }}
        >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 600,
          }}
        >
          PilotX Posts
        </Typography>
        <Button
          size="medium"
          color="inherit"
          component={Link}
          to="/"
          sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
        >
          Inicio
        </Button>
        </Toolbar>
    </AppBar>
      <Toolbar />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
