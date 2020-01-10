import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      price
      description
    }
  }
`;

const UpdateItem = ({ id }) => {
  const { data, loading: loadingQuery, error: errorQuery } = useQuery(
    SINGLE_ITEM_QUERY,
    {
      variables: { id }
    }
  );
  const [
    updateItem,
    { loading: loadingMutation, error: errorMutation }
  ] = useMutation(UPDATE_ITEM_MUTATION);
  const [formValues, setFormValues] = useState({});
  const loading = loadingQuery || loadingMutation;
  let errorMessage = errorQuery || errorMutation;

  if (!loading && !data?.item) {
    errorMessage = { message: 'No Item Found for ID' };
  }

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    setFormValues((prevState) => ({ ...prevState, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateItem({
      variables: {
        id,
        ...formValues
      }
    }).then((res) =>
      Router.push({
        pathname: '/title',
        query: { id: res.data.updateItem.id }
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={errorMessage} />
      <fieldset
        disabled={loading || errorMessage}
        aria-busy={loading || errorMessage}
      >
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            defaultValue={data?.item?.title}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            defaultValue={data?.item?.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            required
            defaultValue={data?.item?.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">
          Sav{loadingMutation ? 'ing' : 'e'} Changes
        </button>
      </fieldset>
    </Form>
  );
};

export default UpdateItem;
