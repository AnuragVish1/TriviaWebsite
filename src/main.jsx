import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/Home.jsx";
import './index.css'
import Trivia from "./pages/Trivia.jsx";
import Result from "./pages/Result.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/trivia" element={<Trivia/>}/>
      <Route path="/result" element={<Result/>}/>
    </Routes>
  </BrowserRouter>
);