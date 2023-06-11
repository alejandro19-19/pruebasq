import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import ImageSlider from "./ImageSlider";
import {prettyDOM} from "@testing-library/dom"

test("renders content", () => {
  const componente = render(
      <ImageSlider />
  );
  componente.debug()
});

test("buscar por img", () => {
  const componente = render(
      <ImageSlider />
  );
  const img = componente.container.querySelector("img")
  console.log(prettyDOM(img))
});

test("buscar por button", () => {
  const componente = render(
      <ImageSlider />
  );
  const button = componente.container.querySelector("button")
  console.log(prettyDOM(button))
});

test("buscar por setImage", () => {
  const componente = render(
      <ImageSlider />
  );
  const setImage = componente.container.querySelector("setImage")
  console.log(prettyDOM(setImage))
});

test("buscar por if", () => {
  const componente = render(
      <ImageSlider />
  );
  const ifa = componente.container.querySelector("if")
  console.log(prettyDOM(ifa))
});
