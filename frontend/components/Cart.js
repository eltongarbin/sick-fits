import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  const { data } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  return (
    <CartStyles open={data?.cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggleCart}>
          &times;
        </CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You Have __ Items in your cart.</p>
      </header>

      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  );
};

export default Cart;
