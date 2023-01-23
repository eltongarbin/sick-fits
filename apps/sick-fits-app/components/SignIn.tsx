import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';
import { useForm } from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import { SyntheticEvent } from 'react';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const SignIn = () => {
  const { inputs, handleChange, resetForm }: any = useForm({
    email: '',
    password: '',
  });
  const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signin();
    resetForm();
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
      'UserAuthenticationWithPasswordFailure' &&
    data?.authenticateUserWithPassword;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <ErrorMessage error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};
