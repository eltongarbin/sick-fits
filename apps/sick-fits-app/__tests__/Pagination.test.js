import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Pagination from "../components/Pagination";
import { makePaginationMocksFor } from "../lib/testUtils";

describe("<Pagination />", () => {
  it("displays a loading message", () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders pagination for 18 items", async () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );

    await screen.findByTestId("pagination");
    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("disables the prev page on first page", async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );

    await screen.findByTestId("pagination");

    expect(screen.getByText(/Prev/)).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText(/Next/)).toHaveAttribute("aria-disabled", "false");
  });

  it("disables the next page on last page", async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={5} />
      </MockedProvider>
    );

    await screen.findByTestId("pagination");

    expect(screen.getByText(/Prev/)).toHaveAttribute("aria-disabled", "false");
    expect(screen.getByText(/Next/)).toHaveAttribute("aria-disabled", "true");
  });

  it("enables all on middle page", async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={2} />
      </MockedProvider>
    );

    await screen.findByTestId("pagination");

    expect(screen.getByText(/Prev/)).toHaveAttribute("aria-disabled", "false");
    expect(screen.getByText(/Next/)).toHaveAttribute("aria-disabled", "false");
  });
});
