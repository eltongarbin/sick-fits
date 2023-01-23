import Link from 'next/link';

import { useCart } from '../lib/cartState';
import { CartCount } from './CartCount';
import { SignOut } from './SignOut';
import { NavStyles } from './Nav.styles';
import { useUser } from './User';

export const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally: number, cartItem: any) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
        </>
      )}
      {!user && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
};
