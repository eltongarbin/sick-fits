import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';

import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { ALL_PRODUCTS_QUERY } from '../components/Products';
import { fakeItem } from '../lib/testUtils';

const item = fakeItem();

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

describe('<CreateProduct />', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('creates the items when the form is submitted', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            image: '',
            name: item.name,
            price: item.price,
            description: item.description,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item,
              id: 'abc123',
              __typename: 'Item',
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: { skip: 0, take: 2 },
        },
        result: {
          data: {
            products: [item],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Name'), item.name);
    await user.type(screen.getByLabelText('Price'), item.price.toString());
    await user.type(screen.getByLabelText('Description'), item.description);
    await user.click(screen.getByRole('button', { name: /Add Product/i }));

    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith({ pathname: '/product/abc123' })
    );
  });
});
