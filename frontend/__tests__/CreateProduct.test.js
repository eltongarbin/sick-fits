import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import Router from "next/router";

import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from "../components/CreateProduct";
import { ALL_PRODUCTS_QUERY } from "../components/Products";
import { fakeItem } from "../lib/testUtils";

const item = fakeItem();

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

describe("<CreateProduct />", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("handles the updating", async () => {
    render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    userEvent.type(screen.getByLabelText("Name"), item.name);
    userEvent.type(screen.getByLabelText("Price"), item.price.toString());
    userEvent.type(screen.getByLabelText("Description"), item.description);

    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it("creates the items when the form is submitted", async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: "",
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item,
              id: "abc123",
              __typename: "Item",
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: { skip: 0, first: 2 },
        },
        result: {
          data: {
            allProducts: [item],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );

    userEvent.type(screen.getByLabelText("Name"), item.name);
    userEvent.type(screen.getByLabelText("Price"), item.price.toString());
    userEvent.type(screen.getByLabelText("Description"), item.description);
    userEvent.click(screen.getByRole("button", { name: "+ Add Product" }));

    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith({ pathname: "/product/abc123" })
    );
  });
});
