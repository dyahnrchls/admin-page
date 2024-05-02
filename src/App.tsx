import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { HomePage } from "./pages/home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostPage } from "./pages/post/Post";
import { AlbumPage } from "./pages/album/Album";
import { PhotoPage } from "./pages/photo/Photo";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/user/:userId" element={<PostPage />} />
            <Route path="/albums/user/:userId" element={<AlbumPage />} />
            <Route path="/albums/:albumId" element={<PhotoPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
