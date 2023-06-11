import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import ButtonIcon from "./ButtonIcon";
import { BrowserRouter } from "react-router-dom";

test("renders content", () => {
  const componente = render(
    <BrowserRouter>
      <ButtonIcon />
    </BrowserRouter>
  );
  componente.debug()
});

test("Button click", () => {

  const component = render(
    <BrowserRouter>
      <ButtonIcon />
    </BrowserRouter>
  );

  const button = component.getByTestId("click");
  fireEvent.click(button);

});
