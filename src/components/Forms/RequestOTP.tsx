"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { z } from "zod";
import { SPINNER } from "../SVG/svgs";
import { requestOTP } from "@/services/contactService";

interface Props {
  setFormState: Dispatch<SetStateAction<"requestOTP" | "registerOTP">>;
  cellphone: string;
  setFormFields: Dispatch<
    SetStateAction<{ cellPhone: string; expireTime: number }>
  >;
}

const schema = z.object({
  cellphone: z.string().min(1, { message: "*This field is required" }),
});

type formData = z.infer<typeof schema>;

const RequestOTPForm = ({ setFormFields, setFormState, cellphone }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      cellphone,
    },
  });

  const handleRequsetOTP = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const req = await requestOTP({
        captcha: "mxmxm",
        cellphone: data.cellphone,
      });
      if (req.ok) {
        const res = await req.json();
        setFormFields({
          cellPhone: data.cellphone,
          expireTime: res.expires_after,
        });
        setFormState("registerOTP");
      } else {
        const res = await req.json();
        setError("root", {
          message: res.message,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
      setIsLoading(false);
    }
  });
  return (
    <div>
      <form onSubmit={handleRequsetOTP}>
        {/* inputs */}
        <div>
          {/* phonenumber container */}
          <div>
            <div
              className="h-[48px] rounded-lg border border-[#353542] flex gap-4 px-4 py-[0.6rem] text-white"
              style={{
                background: `rgba(14, 14, 18, 0.50)`,
                direction: "ltr",
              }}
            >
              <Controller
                name="cellphone"
                defaultValue={""}
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="FR"
                      addInternationalOption={false}
                      value={cellphone}
                      onChange={(e) => {
                        onChange(e || "");
                        setFormFields((prev) => ({
                          ...prev,
                          cellPhone: e || "",
                        }));
                      }}
                    />
                  );
                }}
              />
            </div>
            <p className="mt-2 text-red-400 text-[12px] text-start">
              {errors?.cellphone?.message?.toString()}
            </p>
          </div>
        </div>
        {/* others */}
        <div className="mt-4">
          {/* root error */}
          <p className="mt-2 text-red-400 text-[12px] text-start">
            {errors?.root?.message?.toString()}
          </p>
          <div>
            <button
              type="submit"
              className="bg-[#4E4E61] bg-opacity-50 rounded-full w-full h-[40px] text-[14px] leading-4 text-white font-semibold"
            >
              {isLoading ? (
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
        </div>
      </form>
    </div>
  );
};

export default RequestOTPForm;
