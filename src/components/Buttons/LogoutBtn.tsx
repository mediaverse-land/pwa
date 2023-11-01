"use client";
import { signOut } from "next-auth/react";
import { INACTIVE_LOGOUT } from "../SVG/svgs";

const LogoutBtn = () => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: "/" });
      }}
      className="flex items-center gap-4 group"
    >
      <INACTIVE_LOGOUT style={{}} />
      <div className="text-[14px] group-hover:text-white">Logout</div>
    </button>
  );
};

export default LogoutBtn;
