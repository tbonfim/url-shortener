import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("renders form into the screen", () => {
  render(<App />);
  const formLabel = screen.getByText(/Insert a valid URL/i);
  expect(formLabel).toBeInTheDocument();
});

test("Shows error to an empty url", async () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    const errorMessage = screen.getByText(
      "Please check if you entered a valid URL!"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

test("For this test, server MUST be running - Should display the redirect link if a valid URL was set", async () => {
  render(<App />);
  const input = screen.getByRole("textbox");

  fireEvent.change(input, { target: { value: "apple.com" } });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
