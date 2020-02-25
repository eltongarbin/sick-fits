import React from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';

import NavStyles from './styles/NavStyles';
import useCurrentUserQuery from './hooks/useCurrentUserQuery';
import Signout from './Signout';
import CartCount from './CartCount';
import { TOGGLE_CART_MUTATION } from './Cart';

const Nav = () => {
  const { data } = useCurrentUserQuery({
    fetchPolicy: 'network-only'
  });
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  return (
    <NavStyles>
      <Link href="/items">
        <a>Shop</a>
      </Link>
      {data?.me && (
        <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/me">
            <a>Account</a>
          </Link>
          <Signout />
          <button onClick={toggleCart}>
            My Cart{' '}
            <CartCount
              count={data.me.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!data?.me && (
        <Link href="/signup">
          <a>Sign In</a>
        </Link>
      )}
    </NavStyles>
  );
};

export default Nav;
