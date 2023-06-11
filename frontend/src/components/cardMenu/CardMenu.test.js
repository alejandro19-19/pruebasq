import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CardMenu from "./CardMenu";
import { BrowserRouter } from "react-router-dom";

test("renders content", () => {
  const componente = render(
    <BrowserRouter>
      <CardMenu />
    </BrowserRouter>
  );
  componente.debug();
});

test("Button click", () => {
  const component = render(
    <BrowserRouter>
      <CardMenu />
    </BrowserRouter>
  );

  const button = component.getByTestId("click");
  fireEvent.click(button);
});

// test("color", () => {
//   const color = "red";

//   const component = render(
//     <BrowserRouter>
//       <CardMenu color={color} />
//     </BrowserRouter>
//   );

//   // component.getByText("rgba(102, 0, 0, 0.9)");
//   it("should render style", () => {
//     component
//       .expect(
//         shallow(
//           <div
//             style={{
//               backgroundColor: "rgba(102, 0, 0, 0.9)",
//             }}
//           />
//         )
//       )
//       .to.have.style("backgroundColor", "rgba(102, 0, 0, 0.9)");
//   });
// });
