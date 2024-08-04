"use client";

import { INACTIVE_PLUS } from "@/components/SVG/svgs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  username: z.string().min(1, {
    message: "*Please Enter Your Username",
  }),
  password: z.string().min(1, {
    message: "*Please Enter Your Password",
  }),
  name: z.string().min(1, {
    message: "*Please The App",
  }),
});

const ShareAccountForm = () => {
  const [drawerStatus, setDrawerStatus] = useState({
    isOpen: false,
    info: {},
  });
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: "",
    password: "",
    name: "",
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const handleAddAccount = handleSubmit((data) => {
    // console.log(data);
  });
  return (
    <>
      <div>
        <div
          onClick={() => setDrawerStatus({ isOpen: true, info: {} })}
          className="rounded-2xl border border-dashed border-[#666680] text-[14px] cursor-pointer leading-none capitalize text-center text-[#A2A2B5] flex items-center justify-center gap-2 py-5"
        >
          <span>Add Account</span>
          <span>
            <INACTIVE_PLUS fill="#A2A2B5" />
          </span>
        </div>
      </div>
      {/* Drawer */}
      <div
        className={`absolute bottom-0 left-0 w-full z-50 rounded-t-2xl bg-[rgba(78,78,97,0.75)] backdrop-blur-md overflow-hidden duration-700 transition-[max-height] ${
          drawerStatus.isOpen ? "max-h-[400px]" : "max-h-[0px]"
        }`}
      >
        <div className={`p-8`}>
          <div className="flex flex-col items-stretch gap-6 h-full justify-between">
            {/* title */}
            <div className="flex items-center justify-between">
              <div className="text-[#D9D9FF]">Add Account</div>
              <div
                onClick={() => {
                  setDrawerStatus({ isOpen: false, info: {} });
                  reset();
                }}
                className="text-[14px] text-[#83839C] cursor-pointer"
              >
                Cancel
              </div>
            </div>
            {/* content  */}
            <form
              onSubmit={handleAddAccount}
              className="flex flex-col items-stretch gap-2"
            >
              <div className="flex flex-col items-stretch">
                <div
                  className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                  style={{
                    background: `rgba(14, 14, 18, 0.50)`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                    App
                  </div>
                  <div className="h-full w-[1px] bg-white mx-1"></div>
                  <input
                    className="bg-transparent grow placeholder:text-[#353542] outline-none"
                    placeholder="App"
                    {...register("name")}
                  />
                </div>
                <p className="text-[12px] text-red-400 text-start">
                  {errors.name?.message?.toString() || inputErrors.name}
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

              <button
                type="submit"
                className="bg-[rgba(78,78,97,0.50)] rounded-full capitalize border border-white text-center py-4 leading-none mt-8"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareAccountForm;
