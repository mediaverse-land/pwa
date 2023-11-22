"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Logout = () => {
  const isLogin = Cookies.get("isLogin");
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex flex-col items-stretch p-10 h-full w-full">
      <div className="text-white text-center leading-5">Logout</div>
      <div className="grow flex items-center justify-center gap-8">
        <div className="flex flex-col items-stretch justify-center gap-8 w-[290px] mx-auto">
          <div className="text-[#D9D9FF] text-center">
            Are you sure to Log out?
          </div>
          <div className="flex flex-col items-stretch gap-4">
            <div
              onClick={async (e) => {
                e.preventDefault();
                Cookies.set("isLogin", "false");
                Cookies.remove("user");
                signOut({ callbackUrl: "/" });
              }}
              className="bg-[rgba(78,78,97,0.50)] rounded-full py-4 text-center cursor-pointer w-full"
            >
              Yes
            </div>
            <div
              onClick={() => router.back()}
              className="bg-[rgba(78,78,97,0.50)] rounded-full py-4 text-center cursor-pointer w-full"
            >
              No
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
