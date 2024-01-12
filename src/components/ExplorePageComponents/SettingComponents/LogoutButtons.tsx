"use client";

import { DicProperties } from "@/types/dictionary-types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButtons = ({ dic }: { dic: DicProperties }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-stretch gap-4">
      <div
        onClick={async (e) => {
          e.preventDefault();
          signOut({ callbackUrl: "/" });
        }}
        className="bg-[rgba(78,78,97,0.50)] rounded-full py-4 text-center cursor-pointer w-full"
      >
        {dic.auth.yes}
      </div>
      <div
        onClick={() => router.back()}
        className="bg-[rgba(78,78,97,0.50)] rounded-full py-4 text-center cursor-pointer w-full"
      >
        {dic.auth.no}
      </div>
    </div>
  );
};

export default LogoutButtons;
