// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders the go to test text", () => {
    render(<Home />);
    expect(screen.getByText("Go to test")).toBeInTheDocument();
  });
});
