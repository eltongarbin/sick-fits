import { Context } from ".keystone/types";
import stripeConfig from "../lib/stripe";

const graphql = String.raw;

interface Arguments {
  token: string;
}

export default async function checkout(
  root: any,
  { token }: Arguments,
  context: Context
): Promise<any> {
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("Sorry! You must be signed in to create an order!");
  }

  const user = await context.query.User.findOne({
    where: { id: userId },
    query: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });

  const cartItems = user.cart.filter((cartItem: any) => cartItem.product);
  const amount = cartItems.reduce(
    (tally: number, cartItem: any) =>
      tally + cartItem.quantity * cartItem.product.price,
    0
  );

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "USD",
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err.message);
    });

  const orderItems = cartItems.map((cartItem: any) => ({
    name: cartItem.product.name,
    description: cartItem.product.description,
    price: cartItem.product.price,
    quantity: cartItem.quantity,
    photo: { connect: { id: cartItem.product.photo.id } },
  }));

  const order = await context.db.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  const cartItemIds = user.cart.map((cartItem: any) => cartItem.id);
  await context.query.CartItem.deleteMany({
    where: cartItemIds.map((id: string) => ({ id })),
  });

  return order;
}
