"use client";
import { signOut, useSession } from "next-auth/react";
import { INACTIVE_LOGOUT } from "../SVG/svgs";
import Cookies from "js-cookie";
const LogoutBtn = () => {
  const isLogin = Cookies.get("isLogin");
  const session = useSession();
  // console.log(session.data);
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        Cookies.set("isLogin", "false");
        Cookies.remove("user");
        signOut({ callbackUrl: "/" });
      }}
      className="flex items-center gap-4 group"
    >
      <INACTIVE_LOGOUT />
      <div className="text-[14px] group-hover:text-white">Logout</div>
    </button>
  );
};

export default LogoutBtn;
