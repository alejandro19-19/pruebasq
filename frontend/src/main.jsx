import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/Context";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { languages } from "./translations/translations";
import "./index.css";

i18next.init(languages);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
