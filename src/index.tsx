import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

import "./assets/background_cover.webp";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
