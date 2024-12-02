import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";

import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.tsx";

axios.defaults.baseURL =
  "https://highway-delite-backend-j5fn.onrender.com";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
