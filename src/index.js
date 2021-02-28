import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <GeistProvider>
      <CssBaseline />
      <App />
    </GeistProvider>
  </StrictMode>,
  rootElement
);
