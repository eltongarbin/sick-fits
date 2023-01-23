import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { Product } from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('<Product />', () => {
  it('renders out the price tag and title', () => {
    render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: product.name })).toHaveAttribute(
      'href',
      '/product/abc123'
    );
  });

  it('renders and matches the snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the image properly', () => {
    render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
  });
});
