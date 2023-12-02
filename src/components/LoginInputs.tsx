"use client";

import { URL, requestOTP, signInWithUsername } from "@/services/contactService";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { SPINNER } from "./SVG/svgs";
import { useSearchParams } from "next/navigation";
import { convertSecondsForTimer } from "@/lib/convertSecondToTimer";
const loginWithPhoneSchema = z.object({
  cellphone: z
    .string()
    .min(1, { message: "*This field is required" })
    .regex(/^\d+$/, "*Please Enter Valid Numbers"),
});
const loginWithUsernameSchema = z.object({
  username: z.string().min(1, { message: "*This field is required" }),
  password: z.string().min(1, { message: "*This field is required" }),
});

const LoginWithPhone = () => {
  const params = useSearchParams();
  const [counter, setCounter] = useState<number>(0);
  // const [timer, setTimer] = useState(convertSecondsForTimer(counter));
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState<string>("");
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

  useEffect(() => {
    const time = setInterval(() => {
      if (counter > 0) {
        setCounter((prev) => {
          return prev - 1;
        });
      }
      // setTimer(convertSecondsForTimer(counter));
    }, 1000);
    return () => clearInterval(time);
  }, [counter]);
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
        setCounter(response.expires_after);
        // setCounter(10);
      }
    } else {
      if (code.length < 1) {
        setError({
          ...error,
          code: "*This field is required",
        });
        setIsLoading(false);
        return;
      }
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
      // console.log(response, "response");
      // If no error and we have user data, return it
      // console.log({ user: response }, "req body");
      if (res.ok && response) {
        signIn(
          "loginWithOTP",
            { callbackUrl: params.get("refer") ? params.get("refer") + "?token=" + response.token : "/web-app/explore/assets" },
          { user: JSON.stringify(response) }
        );
        // console.log(response);
      } else {
        setError({
          ...error,
          code: response.message,
        });
      }
    }
  });

  const handleSendCodeAgain = async () => {
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
      setCounter(response.expires_after);
      // setCounter(10);
    }
  };

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
              type="tel"
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
              className="bg-transparent grow placeholder:text-[#353542] outline-none autofill:bg-transparent"
              disabled={isLoading || !isCodeExist}
              maxLength={20}
              placeholder="Enter Code..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <p className="mt-2 text-[12px] text-red-400 text-start line-clamp-1">
            {error.code}
          </p>
        </div>
      </div>

      <div>
        {/* counter */}
        <div
          className={`mb-4 text-white text-[12px] overflow-hidden ${
            isCodeExist ? "block" : "hidden"
          }`}
        >
          {counter > 0 ? (
            convertSecondsForTimer(counter)
          ) : (
            <button
              onClick={async (e) => {
                e.preventDefault();
                handleSendCodeAgain();
              }}
              className="text-white text-[14px]"
            >
              Send Code Again
            </button>
          )}
        </div>
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
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    // console.log(
    //   {
    //     password: data.password,
    //     cellphone: data.username,
    //   },
    //   "data"
    // );
    const req = await signInWithUsername({
      password: data.password,
      username: data.username,
    }).finally(() => setIsLoading(false));
    const res = await req.json();
    // console.log(res);
    if (req.ok && res) {
      signIn(
        "loginWithUsername",
        { callbackUrl: params.get("refer") ? params.get("refer") + "?token=" + res.token : "/web-app/explore/assets" },
        { user: JSON.stringify(res) }
      );
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
export { LoginWithPhone, LoginWithUsername };
