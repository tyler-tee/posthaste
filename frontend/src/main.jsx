import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css"; // Ensure you have a global stylesheet if needed
import App from "./App"; // Import the updated App component

const container = document.getElementById("root");

if (!container) {
  console.error("Root element not found. Please ensure index.html has a <div id='root'>.");
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}