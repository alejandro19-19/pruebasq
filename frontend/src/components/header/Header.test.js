import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Header from "./Header";

test("renders content", () => {
  
    const componente = render(
      <Header/>
    );
    componente.debug()
  });