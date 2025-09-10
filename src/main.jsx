import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  // Wrap App in StrictMode for highlighting potential issues
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
