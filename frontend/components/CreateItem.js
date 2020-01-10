import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  });

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    setFormValues((prevState) => ({ ...prevState, [name]: val }));
  };

  const uploadFile = async (e) => {
    const { files } = e.target;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/eltongarbin/image/upload',
      {
        method: 'POST',
        body: data
      }
    );
    const file = await res.json();

    setFormValues((prevState) => ({
      ...prevState,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    }));
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        createItem({ variables: formValues }).then((res) =>
          Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id }
          })
        );
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            required
            onChange={uploadFile}
          />
          {formValues.image && (
            <img width="200" src={formValues.image} alt="Upload Preview" />
          )}
        </label>

        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={formValues.title}
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
            value={formValues.price}
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
            value={formValues.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateItem;
