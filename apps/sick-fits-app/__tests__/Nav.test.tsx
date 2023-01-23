import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { Nav } from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

const noSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: { authenticatedItem: fakeUser({ cart: [fakeCartItem()] }) },
    },
  },
];

describe('<Nav />', () => {
  it('renders and minimal nav when signed out', () => {
    render(
      <CartStateProvider>
        <MockedProvider mocks={noSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );

    expect(screen.getByText('Sign In')).toHaveAttribute('href', '/signin');
    expect(screen.getByText('Products')).toHaveAttribute('href', '/products');
  });

  it('renders and full nav when signed in', async () => {
    const { container } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );

    await screen.findByText('Orders');
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText('My Cart')).toBeInTheDocument();
  });

  it('renders and full nav when signed in', async () => {
    render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocksWithCartItems}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );

    await screen.findByText('Orders');
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
