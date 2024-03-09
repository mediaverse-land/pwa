"use client";

import { URL } from "@/services/contactService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Token Name is required"),
  app: z.string().min(1, "Token App is required"),
});

type FormData = z.infer<typeof schema>;

const AddApiTokenButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      const req = await fetch(`${URL}/api-tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user?.token}`,
        },
        body: JSON.stringify({
          name: data.name,
          app: data.app,
        }),
      });
      if (req.ok) {
        router.refresh();
        setIsFormOpen(false);
        reset();
      } else {
      }
    } catch (error) {}
  });
  return isFormOpen ? (
    <form onSubmit={handleSubmitForm}>
      <div className="flex flex-col items-stretch gap-4">
        <div className="flex flex-col items-stretch">
          <div
            className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
            style={{
              background: `rgba(14, 14, 18, 0.50)`,
            }}
          >
            <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
              Token Name
            </div>
            <div className="h-full w-[1px] bg-white mx-1"></div>
            <input
              className="bg-transparent grow placeholder:text-[#353542] outline-none"
              placeholder={"Enter Your Token Name"}
              {...register("name")}
            />
          </div>
          <p className="text-[12px] text-red-400 text-start">
            {errors.name?.message?.toString()}
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
              Token App
            </div>
            <div className="h-full w-[1px] bg-white mx-1"></div>
            <input
              className="bg-transparent grow placeholder:text-[#353542] outline-none"
              placeholder={"Enter Your Token App"}
              {...register("app")}
            />
          </div>
          <p className="text-[12px] text-red-400 text-start">
            {errors.app?.message?.toString()}
          </p>
        </div>
        <div className="flex items-center gap-4 justify-center">
          {/* <button
            type="button"
            role="button"
            onClick={() => {
              setIsFormOpen(false);
            }}
          >
            Cancel
          </button> */}
          <button
            className="border-white border px-6 py-1 rounded-xl"
            disabled={isSubmitting}
            type="submit"
          >
            Generate
          </button>
        </div>
      </div>
    </form>
  ) : (
    <button
      onClick={() => {
        setIsFormOpen(true);
      }}
      className="border-dashed border-white border px-6 py-1 rounded-xl"
    >
      Add Token
    </button>
  );
};

export default AddApiTokenButton;
