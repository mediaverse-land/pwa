"use client";

import { URL, requestOTP } from "@/services/contactService";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { SPINNER } from "./SVG/svgs";
const loginWithPhoneSchema = z.object({
  cellphone: z.string().min(1, { message: "*This field is required" }),
});
const loginWithUsernameSchema = z.object({
  cellphone: z.string().min(1, { message: "*This field is required" }),
  password: z.string().min(1, { message: "*This field is required" }),
});
const LoginWithPhone = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isCodeExist, setIsCodeExist] = useState(false);
  const [error, setError] = useState({
    phone: "",
    code: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginWithPhoneSchema),
  });
  const handleLoginWithOTP = handleSubmit(async (data) => {
    setIsLoading(true);
    setError({
      phone: "",
      code: "",
    });
    if (!isCodeExist) {
      const request = await requestOTP({
        cellphone: phone,
        captcha: "mxmx",
      }).finally(() => setIsLoading(false));
      const response = await request.json();
      if (request.status === 422) {
        setError({
          ...error,
          phone: response.error,
        });
      } else if (request.ok) {
        setIsCodeExist(true);
      }
    } else {
      const res = await fetch(`${URL}/auth/otp/submit`, {
        method: "POST",
        body: JSON.stringify({
          cellphone: phone,
          otp: code,
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en-US",
          "x-app": "_Web",
        },
      }).finally(() => setIsLoading(false));
      const response = await res.json();
      console.log(response, "response");
      // If no error and we have user data, return it
      console.log({ user: response }, "req body");
      if (res.ok && response) {
        signIn(
          "loginWithOTP",
          { callbackUrl: "/explore" },
          { user: JSON.stringify(response) }
        );
        console.log(response);
      } else {
        setError({
          ...error,
          code: response.message,
        });
      }
    }
  });
  return (
    <form
      onSubmit={handleLoginWithOTP}
      className="flex flex-col items-stretch gap-4 justify-between grow"
    >
      <div className="flex flex-col items-stretch gap-2 ">
        <div>
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
              disabled={isCodeExist}
              {...register("cellphone", {
                value: phone,
                onChange(event) {
                  setPhone(event.target.value);
                },
              })}
            />
          </div>
          <p className="mt-2 text-red-400 text-[12px] text-start">
            {errors?.cellphone?.message?.toString() || error.phone || ""}
          </p>
        </div>
        <div>
          <div
            className={`h-[48px] rounded-lg border border-[#353542] flex gap-4 px-4 py-[0.6rem] transition-all duration-700 text-white overflow-hidden ${
              !isCodeExist ? "hidden opacity-0" : "opacity-100"
            }`}
            style={{
              background: `rgba(14, 14, 18, 0.50)`,
            }}
          >
            <div className="flex items-center justify-center text-[14px] text-[#666680]">
              Code
            </div>
            <div className="h-full w-[1px] bg-white"></div>
            <input
              className="bg-transparent grow placeholder:text-[#353542] outline-none"
              disabled={isLoading || !isCodeExist}
              maxLength={20}
              placeholder="Enter Code..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <p className="mt-2 text-[12px] text-red-400 line-clamp-1">
            {error.code}
          </p>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="bg-[#4E4E61] bg-opacity-50 rounded-full w-full h-[40px] text-[14px] leading-4 text-white font-semibold"
        >
          {isCodeExist ? (
            isLoading ? (
              <SPINNER
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            ) : (
              "Login"
            )
          ) : isLoading ? (
            <SPINNER
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ) : (
            "Send Code"
          )}
        </button>
      </div>
    </form>
  );
};

const LoginWithUsername = () => {
  return (
    <form className="flex flex-col gap-4 items-stretch">
      <div className="flex flex-col gap-2 items-stretch">
        <div
          className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
          style={{
            background: `rgba(14, 14, 18, 0.50)`,
          }}
        >
          <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
            Username
          </div>
          <div className="h-full w-[1px] bg-white mx-1"></div>
          <input
            className="bg-transparent grow placeholder:text-[#353542] outline-none"
            placeholder="Username"
          />
        </div>
        <div
          className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
          style={{
            background: `rgba(14, 14, 18, 0.50)`,
          }}
        >
          <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
            Password
          </div>
          <div className="h-full w-[1px] bg-white mx-1"></div>
          <input
            className="bg-transparent grow placeholder:text-[#353542] outline-none"
            placeholder="Password"
            type="password"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#4E4E61] bg-opacity-50 rounded-full h-[40px] text-[14px] leading-4 text-white font-semibold"
        onClick={async (e) => {
          e.preventDefault();
        }}
      >
        Login
      </button>
    </form>
  );
};
export { LoginWithPhone, LoginWithUsername };
