"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutNoUser = () => {
  useEffect(() => {
    signOut({
      callbackUrl: "/login?refer=/explore?section=account",
    });
  }, []);
  return <></>;
};

export default LogoutNoUser;
