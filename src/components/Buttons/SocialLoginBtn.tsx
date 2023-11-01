"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getProviders, signIn, signOut } from "next-auth/react";

const SocialLoginBtn = ({
  variant,
}: {
  variant: "apple" | "google" | "facebook" | "github";
}) => {
  const params = useSearchParams();
  const handleSignIn = (callbackUrl?: string) => {
    signIn(variant, { callbackUrl: callbackUrl || "/explore" });
  };
  switch (variant) {
    case "apple":
      return (
        <div
          onClick={(e) => handleSignIn()}
          className="text-white flex items-center justify-center gap-2 cursor-pointer"
          style={{
            background: `linear-gradient(0deg, #000000, #000000), linear-gradient(153.43deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 83.33%)`,
          }}
        >
          <div className="relative w-[16px] h-[16px]">
            <Image src={"/icons/apple.svg"} alt="logo" fill />
          </div>
          Sign up with Apple
        </div>
      );
    case "google":
      return (
        <div
          onClick={() => handleSignIn()}
          className="flex items-center justify-center gap-2 cursor-pointer"
          style={{
            background: `linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(153.43deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 83.33%)`,
          }}
        >
          <div className="relative w-[16px] h-[16px]">
            <Image src={"/icons/google.svg"} alt="logo" fill />
          </div>
          Sign up with Google
        </div>
      );
    case "facebook":
      return (
        <div
          onClick={() => handleSignIn()}
          style={{
            background: `linear-gradient(0deg, #1771E6, #1771E6),
      linear-gradient(153.43deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 83.33%)`,
          }}
          className="text-white flex items-center justify-center gap-2 cursor-pointer"
        >
          <div className="relative w-[16px] h-[16px]">
            <Image src={"/icons/facebook.svg"} alt="logo" fill />
          </div>
          Sign up with Facebook
        </div>
      );
    case "github":
      return (
        <div
          onClick={() => handleSignIn()}
          style={{
            background: `linear-gradient(0deg, #1771E6, #1771E6),
    linear-gradient(153.43deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 83.33%)`,
          }}
          className="text-white flex items-center justify-center gap-2 cursor-pointer"
        >
          <div className="relative w-[16px] h-[16px]">
            <Image src={"/icons/facebook.svg"} alt="logo" fill />
          </div>
          Sign up with github
        </div>
      );
    default:
      break;
  }
};

export default SocialLoginBtn;
