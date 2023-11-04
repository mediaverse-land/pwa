"use client";
import { signOut } from "next-auth/react";
import { INACTIVE_LOGOUT } from "../SVG/svgs";
import Cookies from "js-cookie";
const LogoutBtn = () => {
  const accessToken = Cookies.get("access_token");
  const isLogin = Cookies.get("isLogin");
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: "/" });
        if (accessToken || isLogin === "true") {
          Cookies.remove("access_token");
          Cookies.set("isLogin", "false");
        }
      }}
      className="flex items-center gap-4 group"
    >
      <INACTIVE_LOGOUT />
      <div className="text-[14px] group-hover:text-white">Logout</div>
    </button>
  );
};

export default LogoutBtn;
