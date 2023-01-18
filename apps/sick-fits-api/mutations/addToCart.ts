import { Context } from ".keystone/types";
import { Session } from "../types";

export default async function addToCart(
  root: any,
  { productId }: { productId?: string | null },
  context: Context
): Promise<any> {
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error("You must be logged in to do this!");
  }

  const allCartItems = await context.query.CartItem.findMany({
    where: {
      user: { id: { equals: session.itemId } },
      product: { id: { equals: productId } },
    },
    query: "id quantity",
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    return await context.db.CartItem.updateOne({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  return await context.db.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}
