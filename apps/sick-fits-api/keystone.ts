import "dotenv/config";
import { createAuth } from "@keystone-6/auth";
import { config } from "@keystone-6/core";
import { statelessSessions } from "@keystone-6/core/session";

import { permissionsList } from "./schemas/fields";
import { Role } from "./schemas/Role";
import { OrderItem } from "./schemas/OrderItem";
import { Order } from "./schemas/Order";
import { CartItem } from "./schemas/CartItem";
import { ProductImage } from "./schemas/ProductImage";
import { Product } from "./schemas/Product";
import { User } from "./schemas/User";
import { insertSeedData } from "./seed-data";
import { sendPasswordResetEmail } from "./lib/mail";
import { extendGraphqlSchema } from "./mutations";
import { TypeInfo } from ".keystone/types";

const databaseURL = process.env.DATABASE_URL || "file:./keystone.db";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret:
    process.env.COOKIE_SECRET || "this secret should only be used in testing",
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // TODO: Add in initial roles here
  },
  passwordResetLink: {
    async sendToken({ token, identity }) {
      await sendPasswordResetEmail(token, identity);
    },
  },
  sessionData: `id name email role { ${permissionsList.join(" ")} }`,
});

export default withAuth(
  config<TypeInfo>({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      },
    },
    db: {
      provider: "sqlite",
      url: databaseURL,
      async onConnect(keystone) {
        console.log("Connected to the database!");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: {
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    },
    extendGraphqlSchema,
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) => !!session,
    },
    session: statelessSessions(sessionConfig),
  })
);
