import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { SyntheticEvent } from 'react';

import { Form } from './styles/Form';
import { useForm } from '../lib/useForm';
import { ErrorMessage } from './ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export const RequestReset = () => {
  const { inputs, handleChange, resetForm }: any = useForm({
    email: '',
  });
  const [requestReset, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await requestReset().catch(console.error);
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink && (
          <p>Success! Check your email for a link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};
