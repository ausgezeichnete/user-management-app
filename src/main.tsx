import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// StrictMode runs your components twice in development to catch bugs early.
// It has zero effect in production — it only helps during development.
// The "!" after getElementById tells TypeScript "I'm sure this won't be null."
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
