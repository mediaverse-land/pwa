"use client";

import { convertSecondsForTimer } from "@/lib/convertSecondToTimer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SPINNER } from "../SVG/svgs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitOTP } from "@/services/contactService";
import { useLogin } from "@/hooks/Auth";
import { useParams, useRouter } from "next/navigation";

interface Props {
  initialCounter: number;
  cellPhone: string;
  setFormState: Dispatch<SetStateAction<"requestOTP" | "registerOTP">>;
}

const schema = z.object({
  otp: z.string().min(1, { message: "*This field is required" }),
});

type formData = z.infer<typeof schema>;

const RegisterOTPForm = ({
  cellPhone,
  initialCounter,
  setFormState,
}: Props) => {
  const [counter, setCounter] = useState<number>(initialCounter);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useLogin();

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmitOTP = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const req = await submitOTP({
        cellphone: cellPhone,
        otp: data.otp,
      });
      if (req.ok) {
        const res = await req.json();
        if (!res.user.first_name && !res.user.last_name && !res.user.username) {
          return loginUser({
            address: res.user.address,
            cellphone: res.user.cellphone,
            email: res.user.email,
            firstName: res.user.first_name,
            lastName: res.user.last_name,
            image: res.user.image_url,
            id: res.user.id,
            token: res.token,
            username: res.user.username,
            callBack: `/sign-up/info`,
          });
        }
        if (!res.user.username) {
          return loginUser({
            address: res.user.address,
            cellphone: res.user.cellphone,
            email: res.user.email,
            firstName: res.user.first_name,
            lastName: res.user.last_name,
            image: res.user.image_url,
            id: res.user.id,
            token: res.token,
            username: res.user.username,
            callBack: `/sign-up/info`,
          });
        }
        return loginUser({
          address: res.user.address,
          cellphone: res.user.cellphone,
          email: res.user.email,
          firstName: res.user.first_name,
          lastName: res.user.last_name,
          image: res.user.image_url,
          id: res.user.id,
          token: res.token,
          username: res.user.username,
        });
      } else {
        const res = await req.json();
        setError("root", { message: res.message });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div>
      <form onSubmit={handleSubmitOTP}>
        {/* inputs */}
        <div className="flex flex-col items-stretch gap-4">
          {/* cellphone */}
          <div>
            <div
              className={`h-[48px] rounded-lg border border-[#353542] flex gap-4 px-4 py-[0.6rem] transition-all duration-700 text-white overflow-hidden`}
              style={{
                background: `rgba(14, 14, 18, 0.50)`,
              }}
            >
              <div className="flex items-center justify-center text-[14px] text-[#666680]">
                Phone
              </div>
              <div className="h-full w-[1px] bg-white"></div>
              <input
                className="bg-transparent grow placeholder:text-[#353542] outline-none autofill:bg-transparent"
                placeholder="Enter Code..."
                disabled
                value={cellPhone}
              />
            </div>
          </div>
          {/* otp code input */}
          <div>
            <div
              className={`h-[48px] rounded-lg border border-[#353542] flex gap-4 px-4 py-[0.6rem] transition-all duration-700 text-white overflow-hidden`}
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
                placeholder="Enter Code..."
                {...register("otp")}
              />
            </div>
            <p className="mt-2 text-[12px] text-red-400 text-start line-clamp-1">
              {errors.otp?.message?.toString()}
            </p>
          </div>
        </div>
        {/* counter */}
        <div
          className={`mt-4 text-white text-[12px] overflow-hidden w-fit mx-auto`}
        >
          {counter > 0 ? (
            convertSecondsForTimer(counter)
          ) : (
            <button
              type="button"
              role="button"
              onClick={async (e) => {
                e.preventDefault();
                setFormState("requestOTP");
              }}
              className="text-white text-[12px]"
            >
              Send Code Again
            </button>
          )}
        </div>
        {/* root error */}
        <p className="mt-2 text-red-400 text-[12px] text-start">
          {errors?.root?.message?.toString()}
        </p>
        {/* submit button */}
        <button
          type="submit"
          className="bg-[#4E4E61] bg-opacity-50 rounded-full w-full h-[40px] text-[14px] leading-4 text-white font-semibold mt-6"
        >
          {isLoading ? (
            <SPINNER
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterOTPForm;
