import { CloseButton } from './styles/CloseButton';
import { CartStyles } from './styles/CartStyles';
import { Supreme } from './styles/Supreme';
import { useUser } from './User';
import { formatMoney } from '../lib/formatMoney';
import { calcTotalPrice } from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import { Checkout } from './Checkout';
import { CartItem } from './CartItem';

export const Cart = () => {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!me) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{`${me.name}'s Cart`}</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem: any) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
};
