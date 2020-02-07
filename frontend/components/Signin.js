import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './hooks/useCurrentUserQuery';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const Signin = () => {
  const [formValues, setformValues] = useState({
    email: '',
    password: ''
  });
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    variables: formValues,
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signin();
    setformValues({
      email: '',
      password: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setformValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your account</h2>
        <ErrorMessage error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default Signin;
