import { integer, text, relationship, virtual } from "@keystone-6/core/fields";
import { list, graphql } from "@keystone-6/core";

import { isSignedIn, rules } from "../access";
import formatMoney from "../lib/formatMoney";
import { Lists } from ".keystone/types";

export const Order: Lists.Order = list({
  access: {
    operation: {
      create: isSignedIn,
      update: () => false,
      delete: () => false,
      query: () => true,
    },
    filter: { query: rules.canOrder },
  },
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          return formatMoney(item.total);
        },
      }),
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});
