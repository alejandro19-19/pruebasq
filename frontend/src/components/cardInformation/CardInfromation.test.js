import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CardInformation from "./CardInformation";

test("renders content", () => {
  const componente = render(
      <CardInformation />
  );
  componente.debug()
});
