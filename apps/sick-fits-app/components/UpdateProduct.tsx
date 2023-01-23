import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { SyntheticEvent } from 'react';

import { useForm } from '../lib/useForm';
import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';

export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      where: { id: $id }
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

type UpdateProductProps = {
  id: string;
};

export const UpdateProduct = ({ id }: UpdateProductProps) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  const [updateProduct, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_PRODUCT_MUTATION);
  const { inputs, handleChange }: any = useForm(
    data?.product || {
      name: '',
      description: '',
      price: '',
    }
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await updateProduct({
      variables: {
        id,
        ...inputs,
      },
    }).catch(console.error);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};
