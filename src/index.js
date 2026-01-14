import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="381143656199-e53f0rbomfl8gfkcgv19as4f4h1avu0o.apps.googleusercontent.com" >
    <App />
  </GoogleOAuthProvider>
);
