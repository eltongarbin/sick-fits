import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './hooks/useCurrentUserQuery';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    optimisticResponse: {
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id
      }
    },
    update: (cache, payload) => {
      const data = cache.readQuery({ query: CURRENT_USER_QUERY });
      const cartItemId = payload.data.removeFromCart.id;

      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          ...data,
          me: {
            ...data.me,
            cart: data.me.cart.filter((cartItem) => cartItem.id !== cartItemId)
          }
        }
      });
    }
  });

  return (
    <BigButton
      disabled={loading}
      title="Delete Item"
      onClick={() => removeFromCart().catch((err) => alert(err.message))}
    >
      &times;
    </BigButton>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired
};

export default RemoveFromCart;
