"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signUpCompletion } from "@/services/contactService";
import { SPINNER } from "../SVG/svgs";
import Cookies from "js-cookie";
import { redirect, useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
    .min(1),
  last_name: z
    .string({
      errorMap: () => ({ message: "*This field is requeired" }),
    })
    .min(1),
});
const EditUserInfoForm = () => {
  const [checked, setChecked] = useState(false);
  const params = useParams();
  const session = useSession();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: "",
    password: "",
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
  const handleEditUserInfo = handleSubmit(async (data) => {
    setLoading(true);
    setServerErrors("");
    setInputErrors({
      username: "",
      password: "",
      first_name: "",
      last_name: "",
    });
    const request = await signUpCompletion({
      data: data,
      token: session.data?.user.token || "",
    });
    const response = await request.json();
    // console.log(request, "signUpCompletion");
    if (request.ok) {
      Cookies.set("EditUserInfo", "false", {
        expires: 1,
      });
      await session.update({
        name: `${response.first_name} ${response.last_name}`,
        picture: response.image,
        email: response.email,
      });
      router.refresh();
      router.replace(`/${params.lang}/app/explore/`);
    } else {
      // console.log("failed");
      setServerErrors(response.error || response.message);
    }
    setLoading(false);
  });
  return (
    <div>
      <form onSubmit={handleEditUserInfo}>
        <div className="flex flex-col items-stretch h-full justify-between gap-3 text-center">
          <div className="flex flex-col items-stretch gap-2">
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
          <div className="flex flex-col items-stretch gap-2">
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
          <div className="flex flex-col items-stretch gap-2">
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
              {errors.first_name?.message?.toString() || inputErrors.first_name}
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2">
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
          <div className="mr-auto space-x-2 rtl:space-x-reverse">
            <span>
              <input
                type="checkbox"
                checked={isChecked}
                onClick={() => {
                  setIsChecked(!isChecked);
                }}
              />
            </span>
            <span className="text-white">
              I Agree With{" "}
              <Link
                className="underline text-blue-600"
                href={`/${params.lang}/terms`}
              >
                Terms
              </Link>
            </span>
          </div>
        </div>
        <div>
          <div>
            <p className="line-clamp-2 mb-2 text-[14px] text-red-400 text-start">
              {serverErrors}
            </p>
          </div>
          <button
            disabled={loading || !isChecked}
            className="bg-[#4E4E61] bg-opacity-50 w-full mt-5 rounded-full h-[40px] text-[14px] leading-4 text-white font-semibold flex items-center justify-center disabled:text-gray-600 disabled:bg-[#4e4e6148] disabled:cursor-not-allowed"
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
              "Submit Info"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfoForm;
