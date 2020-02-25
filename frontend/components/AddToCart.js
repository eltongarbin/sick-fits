import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart] = useMutation(ADD_TO_CART_MUTATION, { variables: { id } });

  return <button onClick={addToCart}>Add To Cart 🛒</button>;
};

AddToCart.propTypes = {
  id: PropTypes.string.isRequired
};

export default AddToCart;
