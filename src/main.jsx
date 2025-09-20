import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";
import SmoothScroll from "./helper/SmoothScroll";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SmoothScroll />
    <App />
  </React.StrictMode>
);
