"use client";

import Image from "next/image";
import { InputWithPlaceHolder } from "./shared/AuthInputs";
import { signIn } from "next-auth/react";

const LoginWithPhone = () => {
  return (
    <div
      className="h-[48px] rounded-lg border border-[#353542] flex gap-4 px-4 py-[0.6rem] text-white"
      style={{
        background: `rgba(14, 14, 18, 0.50)`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="relative w-[1.4rem] h-[1rem]">
          <Image src={"/images/france-flag.png"} alt="flage" fill />
        </div>
        <span className="">+33</span>
      </div>
      <div className="h-full w-[1px] bg-white"></div>
      <input
        className="bg-transparent grow placeholder:text-[#353542] outline-none"
        placeholder="your number..."
        type="tel"
      />
    </div>
  );
};

const LoginWithUsername = () => {
  return (
    <form className="flex flex-col gap-2 items-stretch">
      {/* <InputWithPlaceHolder
        lable="Username"
        placeholder="Enter your username..."
      />
      <InputWithPlaceHolder
        lable="Password"
        placeholder="Enter your password..."
        type="password"
      /> */}
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          signIn(
            "loginWithUsername",
            {
              callbackUrl: "/explore",
            },
            { cellphone: "65465465", password: "mmmmmmmmm" }
          );
        }}
      >
        submit
      </button>
    </form>
  );
};
export { LoginWithPhone, LoginWithUsername };
