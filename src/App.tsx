import React from "react";
import "./App.css";
import { HomePage } from "./pages/home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostPage } from "./pages/post/Post";
import { AlbumPage } from "./pages/album/Album";
import { PhotoPage } from "./pages/photo/Photo";
import { CommentPage } from "./pages/comment/Comment";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/user/:userId" element={<PostPage />} />
          <Route path="/albums/user/:userId" element={<AlbumPage />} />
          <Route path="/albums/:albumId" element={<PhotoPage />} />
          <Route path="/comments/post/:postId" element={<CommentPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
