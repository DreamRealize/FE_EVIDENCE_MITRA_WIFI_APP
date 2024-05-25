import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import store from "./redux/index.js";
import "./assets/styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <App />
      <ToastContainer position="top-right" autoClose={5000} />
   </Provider>
);
