import { signOut } from "next-auth/react";

export const DeleteUserSession = () => {
  return signOut();
};
