import { Permission, permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export const isSignedIn = ({ session }: ListAccessArgs) => !!session;

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
) as Record<Permission, ({ session }: ListAccessArgs) => boolean>;

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return !!session?.data.name.includes("elton");
  },
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageProducts({ session })) return true;

    return { user: { id: { equals: session?.itemId } } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageCart({ session })) return true;

    return { user: { id: { equals: session?.itemId } } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageCart({ session })) return true;

    return { order: { user: { id: { equals: session?.itemId } } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageProducts({ session })) return true;

    return { status: { equals: "AVAILABLE" } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageUsers({ session })) return true;

    return { id: { equals: session?.itemId } };
  },
};
