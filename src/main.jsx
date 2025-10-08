import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import App from "./App";
import SmoothScroll from "./helper/SmoothScroll";
import Article from "./pages/article/Article";
import ScrollToTop from "./helper/TopScroll";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SmoothScroll />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
