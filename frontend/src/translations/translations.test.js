import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import translations from "./translations";

test("renders content", () => {
  const componente = render(

        <translations/>

  );
  componente.debug()
});