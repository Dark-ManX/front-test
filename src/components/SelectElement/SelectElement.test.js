import { render, screen, fireEvent } from "@testing-library/react";
import SelectElement from ".";

const currencies = [
  { value: "UAH", label: "uah" },
  { value: "CZK", label: "czk" },
];

describe("App component tests", () => {
  test("renders select", () => {
    render(<SelectElement options={currencies} defaultValue="UAH" />);
    const pageElement = screen.getByTestId("selectEl");
    expect(pageElement).toBeInTheDocument();
    expect(pageElement).not.toBeNull();
  });
});
