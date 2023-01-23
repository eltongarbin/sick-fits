import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { SignUp, SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const me = fakeUser();
const password = 'test';
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: { name: me.name, email: me.email, password },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: me } },
  },
];

describe('<SignUp />', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Your Name'), me.name);
    await user.type(screen.getByLabelText('Email'), me.email);
    await user.type(screen.getByLabelText('Password'), password);
    await user.click(screen.getByRole('button', { name: 'Sign Up!' }));

    await screen.findByText(
      `Signed up with ${me.email} - Please Go Head and Sign in!`
    );
  });
});
