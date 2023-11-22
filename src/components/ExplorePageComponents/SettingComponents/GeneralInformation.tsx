"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubSectionHeader from "../shared/SubSectionHeader";
import { SPINNER } from "@/components/SVG/svgs";
import Cookies from "js-cookie";

const schema = z.object({
  username: z
    .string({
      errorMap: () => ({ message: "*This field is requeired" }),
    })
    .min(1, {
      message: "*Please enter your Username",
    }),
  password: z
    .string({
      errorMap: () => ({ message: "*This field is requeired" }),
    })
    .min(1, {
      message: "*Please enter your Password",
    }),
  first_name: z
    .string({
      errorMap: () => ({ message: "*This field is requeired" }),
    })
    .min(1, {
      message: "*Please enter your Username",
    }),
  last_name: z
    .string({
      errorMap: () => ({ message: "*This field is requeired" }),
    })
    .min(1, {
      message: "*Please enter your Username",
    }),
  email: z
    .string({
      errorMap: () => ({ message: "*This field is requeired" }),
    })
    .min(1, {
      message: "*Please enter your Username",
    }),
  city: z
    .string({
      errorMap: () => ({ message: "*This field is requeired" }),
    })
    .min(1, {
      message: "*Please enter your Username",
    }),
  address: z
    .string({
      errorMap: () => ({ message: "*This field is requeired" }),
    })
    .min(1, {
      message: "*Please enter your Username",
    }),
});
const SettingGeneralInformation = () => {
  const userCookie = Cookies.get("user");
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: "",
    password: "",
    email: "",
    city: "",
    address: "",
    first_name: "",
    last_name: "",
  });
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const handleEditUserInfo = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="flex flex-col items-stretch gap-4 px-10 py-6 h-full">
      <SubSectionHeader name="General information" />
      <form
        onSubmit={handleEditUserInfo}
        className="grow flex flex-col items-stretch justify-between"
      >
        <div className="flex flex-col items-stretch h-full justify-between gap-2 text-center">
          <div className="flex flex-col items-stretch h-full gap-2 text-center">
            <div className="flex flex-col items-stretch">
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
                  {...register("username")}
                />
              </div>
              <p className="text-[12px] text-red-400 text-start">
                {errors.username?.message?.toString() || inputErrors.username}
              </p>
            </div>
            <div className="flex flex-col items-stretch">
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
                  type="password"
                  className="bg-transparent grow placeholder:text-[#353542] outline-none"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
              <p className="text-[12px] text-red-400 text-start">
                {errors.password?.message?.toString() || inputErrors.password}
              </p>
            </div>
            <div className="flex flex-col items-stretch">
              <div
                className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                style={{
                  background: `rgba(14, 14, 18, 0.50)`,
                }}
              >
                <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                  Firstname
                </div>
                <div className="h-full w-[1px] bg-white mx-1"></div>
                <input
                  className="bg-transparent grow placeholder:text-[#353542] outline-none"
                  placeholder="Firstname"
                  {...register("first_name")}
                />
              </div>
              <p className="text-[12px] text-red-400 text-start">
                {errors.first_name?.message?.toString() ||
                  inputErrors.first_name}
              </p>
            </div>
            <div className="flex flex-col items-stretch">
              <div
                className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                style={{
                  background: `rgba(14, 14, 18, 0.50)`,
                }}
              >
                <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                  Lastname
                </div>
                <div className="h-full w-[1px] bg-white mx-1"></div>
                <input
                  className="bg-transparent grow placeholder:text-[#353542] outline-none"
                  placeholder="Lastname"
                  {...register("last_name")}
                />
              </div>
              <p className="text-[12px] text-red-400 text-start">
                {errors.last_name?.message?.toString() || inputErrors.last_name}
              </p>
            </div>
            <div className="flex flex-col items-stretch">
              <div
                className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                style={{
                  background: `rgba(14, 14, 18, 0.50)`,
                }}
              >
                <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                  Email
                </div>
                <div className="h-full w-[1px] bg-white mx-1"></div>
                <input
                  className="bg-transparent grow placeholder:text-[#353542] outline-none"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              <p className="text-[12px] text-red-400 text-start">
                {errors.email?.message?.toString() || inputErrors.email}
              </p>
            </div>
            <div className="flex flex-col items-stretch">
              <div
                className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                style={{
                  background: `rgba(14, 14, 18, 0.50)`,
                }}
              >
                <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                  City
                </div>
                <div className="h-full w-[1px] bg-white mx-1"></div>
                <input
                  className="bg-transparent grow placeholder:text-[#353542] outline-none"
                  placeholder="City"
                  {...register("city")}
                />
              </div>
              <p className="text-[12px] text-red-400 text-start">
                {errors.city?.message?.toString() || inputErrors.city}
              </p>
            </div>
            <div className="flex flex-col items-stretch">
              <div
                className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                style={{
                  background: `rgba(14, 14, 18, 0.50)`,
                }}
              >
                <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                  Address
                </div>
                <div className="h-full w-[1px] bg-white mx-1"></div>
                <input
                  className="bg-transparent grow placeholder:text-[#353542] outline-none"
                  placeholder="Address"
                  {...register("address")}
                />
              </div>
              <p className="text-[12px] text-red-400 text-start">
                {errors.address?.message?.toString() || inputErrors.address}
              </p>
            </div>
          </div>
          <div>
            <div>
              <p className="line-clamp-2 mb-2 text-[14px] text-red-400 text-start">
                {serverErrors}
              </p>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          className="bg-[#4E4E61] bg-opacity-50 w-full mt-5 rounded-full text-[14px] leading-4 text-white font-semibold flex items-center justify-center py-4"
          type="submit"
        >
          {loading ? (
            <SPINNER
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          ) : (
            "Edit"
          )}
        </button>
      </form>
    </div>
  );
};

export default SettingGeneralInformation;
