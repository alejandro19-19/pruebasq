import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NavDrawer from "./NavDrawer";
import { BrowserRouter } from "react-router-dom";
import loginImage from "../../assets/login.svg";
import registerImage from "../../assets/register.svg";

test("renders content", () => {
  const navLinksPage = [
    { title: "login", path: "/login", icon: loginImage },
    { title: "register", path: "/register", icon: registerImage },
  ];
  const componente = render(
    <BrowserRouter>
      <NavDrawer navLinks={navLinksPage} />
    </BrowserRouter>
  );
  componente.debug();
});

test("Button click", () => {
  const navLinksPage = [
    { title: "login", path: "/login", icon: loginImage },
  ];

  const component = render(
    <BrowserRouter>
      <NavDrawer navLinks={navLinksPage} />
    </BrowserRouter>
  );

  const button = component.getByTestId("btnNavigate");
  fireEvent.click(button);

});
