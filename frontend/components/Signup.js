import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const Signup = () => {
  const [formValues, setformValues] = useState({
    email: '',
    name: '',
    password: ''
  });
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: formValues
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup();
    setformValues({
      email: '',
      name: '',
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
        <h2>Sign Up for an Account</h2>
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
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formValues.name}
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

        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default Signup;
