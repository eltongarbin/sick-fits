import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { SingleProduct, SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

const mocks = [
  {
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: { id: '123' },
    },
    result: { data: { product: product } },
  },
];

describe('<SingleProduct/>', () => {
  it('renders with proper data', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );

    await screen.findByTestId('singleProduct');
    expect(container).toMatchSnapshot();
  });

  it('errors out when an item is no found', async () => {
    const errorMock = [
      {
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: { id: '123' },
        },
        result: { errors: [new GraphQLError('Item not found!!!')] },
      },
    ];
    render(
      <MockedProvider mocks={errorMock}>
        <SingleProduct id="123" />
      </MockedProvider>
    );

    await screen.findByTestId('graphql-error');
    expect(screen.getByText('Shoot!')).toBeInTheDocument();
    expect(screen.getByText('Item not found!!!')).toBeInTheDocument();
  });
});
