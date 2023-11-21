import { render, screen } from "@testing-library/react";
import App from ".";

describe("App component tests", () => {
  test("renders currencies", async () => {
    render(<App />);
    const pageElement = await screen.findByTestId("currenciesPage");
    expect(pageElement).toBeInTheDocument();
  });

  test("renders error", () => {
    render(<App />);
    const errorElement = screen.queryByTestId("errorPage");
    expect(errorElement).not.toBeInTheDocument();
  });
});
