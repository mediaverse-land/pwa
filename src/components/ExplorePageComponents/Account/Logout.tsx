"use client";
import { signOut } from "next-auth/react";
import { useEffect, useLayoutEffect } from "react";

const LogoutNoUser = () => {
  useEffect(() => {
    signOut({
      callbackUrl: "/login?refer=/explore?section=account",
    });
  }, []);
  return <div></div>;
};

export default LogoutNoUser;
