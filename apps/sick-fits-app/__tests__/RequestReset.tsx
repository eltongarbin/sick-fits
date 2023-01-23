import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import {
  RequestReset,
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'test@gmail.com';
const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email },
    },
    result: {
      data: {
        sendUserPasswordResetLink: null,
      },
    },
  },
];

describe('<RequestReset />', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls the mutation when submitted', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );

    userEvent.type(screen.getByLabelText('Email'), email);
    userEvent.click(screen.getByRole('button', { name: 'Request Reset!' }));

    await screen.findByText(/Success/);
  });
});
