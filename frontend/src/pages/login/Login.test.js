import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

test("renders content", () => {
  const componente = render(
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <Login />
      </I18nextProvider>
    </BrowserRouter>
  );
  componente.debug()
});
