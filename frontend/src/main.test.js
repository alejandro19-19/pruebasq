import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/Context";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { languages } from "./translations/translations";
import ReactDOM from "react-dom/client";

test("renders content", () => {
  i18next.init(languages);
  const componente = render(
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
  componente.debug();
});
