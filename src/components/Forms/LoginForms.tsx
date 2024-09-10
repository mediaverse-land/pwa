"use client";

import { signInWithUsername } from "@/services/contactService";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import z from "zod";
import { SPINNER } from "../SVG/svgs";
import { useLogin } from "@/hooks/Auth";

const loginWithPhoneSchema = z.object({
  cellphone: z.string().min(1, { message: "*This field is required" }),
});
const loginWithUsernameSchema = z.object({
  username: z.string().min(1, { message: "*This field is required" }),
  password: z.string().min(1, { message: "*This field is required" }),
});

const LoginWithUsername = () => {
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useLogin();
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginWithUsernameSchema) });
  const handleLoginWithUsername = handleSubmit(async (data) => {
    setIsLoading(true);

    const req = await signInWithUsername({
      password: data.password,
      username: data.username,
    }).finally(() => setIsLoading(false));
    const res = await req.json();
    if (req.ok && res) {
      loginUser({
        address: res.user.address,
        firstName: res.user.first_name,
        lastName: res.user.last_name,
        username: res.user.username,
        cellphone: res.user.cellphone,
        email: res.user.email,
        image: res.user?.image_url || null,
        token: res.token,
        id: res.user.id,
      });
    } else {
      setError({
        ...error,
        password: res.message,
      });
    }
  });
  return (
    <form
      onSubmit={handleLoginWithUsername}
      className="flex flex-col gap-4 items-stretch"
    >
      <div className="flex flex-col gap-2 items-stretch">
        <div>
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
              {...register("username", {
                value: username,
                onChange(event) {
                  setUsername(event.target.value);
                },
              })}
            />
          </div>
          <p className="text-[12px] text-red-400 text-start mt-2 line-clamp-2">
            {errors.username?.message?.toString() || error.username || ""}
          </p>
        </div>
        <div>
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
              {...register("password", {
                value: password,
                onChange(event) {
                  setPassword(event.target.value);
                },
              })}
            />
          </div>
          <p className="text-[12px] text-red-400 text-start mt-2 line-clamp-2">
            {errors.password?.message?.toString() || error.password || ""}
          </p>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#4E4E61] bg-opacity-50 rounded-full h-[40px] text-[14px] leading-4 text-white font-semibold"
      >
        {isLoading ? (
          <SPINNER
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
          />
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
};
export { LoginWithUsername };
