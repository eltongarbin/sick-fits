import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { SyntheticEvent } from 'react';

import { Form } from './styles/Form';
import { useForm } from '../lib/useForm';
import { ErrorMessage } from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

type ResetProps = {
  token: string;
};

export const Reset = ({ token }: ResetProps) => {
  const { inputs, handleChange, resetForm }: any = useForm({
    email: '',
    token,
    password: '',
  });
  const [reset, { data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const formattedError =
    data?.redeemUserPasswordResetToken?.code &&
    data?.redeemUserPasswordResetToken;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <ErrorMessage error={error || formattedError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can Now sign in</p>
        )}
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
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};
