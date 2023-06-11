import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Context from "./Context";

test("renders content", () => {
  const componente = render(
        <Context />
  );
  componente.debug()
});