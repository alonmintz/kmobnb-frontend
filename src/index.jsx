import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import { App } from "./App";

import "./assets/styles/main.scss";
import "animate.css";
import { ViewportProvider } from "./context/ViewportContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <ViewportProvider>
        <App />
      </ViewportProvider>
    </Router>
  </Provider>
);
