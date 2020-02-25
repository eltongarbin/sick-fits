import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './hooks/useCurrentUserQuery';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  return (
    <button disabled={loading} onClick={addToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};

AddToCart.propTypes = {
  id: PropTypes.string.isRequired
};

export default AddToCart;
