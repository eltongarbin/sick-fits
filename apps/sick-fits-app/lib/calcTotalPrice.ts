export const calcTotalPrice = (cart: any) =>
  cart.reduce((tally: number, cartItem: any) => {
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
