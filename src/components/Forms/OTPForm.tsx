"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { requestOTP, submitOTP } from "@/services/contactService";
import { SPINNER } from "../SVG/svgs";
import Cookies from "js-cookie";
const requestOtpSchema = z.object({
  cellphone: z
    .string({
      errorMap: () => ({ message: "Please Enter Valid Phone Number" }),
    })
    .min(1)
    .max(10),
});

const OTPForm = () => {
  const [inputErrors, setInputErrors] = useState({
    cellphone: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [cellphone, setCellphone] = useState("");
  const [codeStatus, setCodeStatus] = useState({
    code: "",
    isCodeExist: false,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(requestOtpSchema),
  });

  const onSubmitForRequestOtp = handleSubmit(async (data) => {
    setLoading(true);
    setInputErrors({
      cellphone: "",
      otp: "",
    });
    if (codeStatus.isCodeExist) {
      const formData = {
        cellphone: data.cellphone,
        otp: codeStatus.code,
      };
      const request = await submitOTP(formData).finally(() =>
        setLoading(false)
      );
      if (request.ok) {
        const response = await request.json();
        console.log(response, "res");
        Cookies.set("EditUserInfo", "true", {
          expires: 1,
        });
        Cookies.set("access_token", response.token, {
          expires: 1,
        });
        router.push("/sign-up/info");
      }
    } else {
      setCellphone(data.cellphone);
      const formData = {
        cellphone: data.cellphone,
        captcha: "mxmx",
      };
      const request = await requestOTP(formData).finally(() =>
        setLoading(false)
      );
      const response = await request.json();
      console.log(response, "res");
      if (request.ok) {
        setCodeStatus((prev) => {
          return { ...prev, isCodeExist: true };
        });
      } else {
        setInputErrors({
          ...inputErrors,
          cellphone: response.error,
        });
      }
    }
    reset();
  });

  return (
    <form
      onSubmit={onSubmitForRequestOtp}
      style={{
        background: `rgba(78, 78, 97, 0.20)`,
      }}
      className="mx-auto max-w-[674px] auth-border-image-source rounded-3xl px-[8rem] pt-[3.5rem] pb-[3rem] backdrop-blur-[5px]"
    >
      <div className="flex flex-col items-stretch h-full justify-between gap-[9rem] text-center">
        {/* input */}
        <div className="flex items-stretch justify-between flex-col gap-12">
          {/* heading */}
          <div className="text-[14px] text-white leading-4">
            Insert your number for loging in.
          </div>
          <div className="flex flex-col items-stretch gap-4">
            <div>
              <div className="flex flex-col items-stretch gap-1">
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
                    disabled={codeStatus.isCodeExist}
                    {...register("cellphone", {
                      value: cellphone,
                      onChange(e) {
                        setCellphone(e.value);
                      },
                    })}
                  />
                </div>
                <p className="text-[12px] text-red-500 mt-1">
                  {errors?.cellphone?.message?.toString() ||
                    inputErrors.cellphone}
                </p>
              </div>
            </div>
            {/* otp code */}
            {codeStatus.isCodeExist ? (
              <div>
                <div className="flex flex-col items-stretch gap-2">
                  <div
                    className="h-[48px] rounded-lg border border-[#353542] flex gap-4 px-4 py-[0.6rem] text-white"
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
                      disabled={loading}
                      maxLength={20}
                      placeholder="Enter Code..."
                      value={codeStatus.code}
                      onChange={(e) =>
                        setCodeStatus((prev) => ({
                          ...prev,
                          code: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <p className="text-[12px] text-red-400">{inputErrors.otp}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/* buttons */}
        <div className="flex flex-col items-stretch justify-between grow gap-16">
          <div className="flex flex-col items-stretch gap-[2rem]">
            {/* send button */}
            <button
              disabled={loading}
              type="submit"
              className="bg-[#4E4E61] bg-opacity-50 rounded-full h-[40px] text-[14px] leading-4 text-white font-semibold flex items-center justify-center"
            >
              {loading ? (
                <SPINNER
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              ) : codeStatus.isCodeExist ? (
                "Log in"
              ) : (
                "Send code"
              )}
            </button>
            {/* navigate link */}
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-[12px] text-[#83839C]">
                  Have an account?
                </span>
                <Link
                  href={`/login`}
                  className="text-[#597AFF] font-semibold text-[14px]"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OTPForm;