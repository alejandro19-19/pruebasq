import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

test("renders content", () => {
  const componente = render(
    <I18nextProvider i18n={i18next}>
      <HomePage />
    </I18nextProvider>
  );
  componente.debug()
});
