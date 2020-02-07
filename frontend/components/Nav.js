import React from 'react';
import Link from 'next/link';

import NavStyles from './styles/NavStyles';
import useCurrentUserQuery from './hooks/useCurrentUserQuery';
import Signout from './Signout';

const Nav = () => {
  const { data } = useCurrentUserQuery({
    fetchPolicy: 'network-only'
  });

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
