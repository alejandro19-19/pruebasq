import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import useFetch from "./useFetch";

test("renders content", () => {
  const componente = render(
        <useFetch />
  );
  componente.debug()
});