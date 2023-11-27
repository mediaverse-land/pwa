"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import SubSectionHeader from "../shared/SubSectionHeader";
import { SPINNER } from "@/components/SVG/svgs";
import Cookies from "js-cookie";
import { getUserProfile, putUserProfile } from "@/services/contactService";
import { revalidatePath, revalidateTag } from "next/cache";
const putUserProfileData = async ({
  data,
  token,
}: {
  token: string;
  data: any;
}) => {
  try {
    const req = await putUserProfile({ data, token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const schema = z.object({
  // username: z.string().min(1, {
  //   message: "*Please enter your Username",
  // }),
  // password: z.string().min(1, {
  //   message: "*Please enter your Password",
  // }),
  first_name: z.string().min(1, {
    message: "*Please enter your Firstname",
  }),
  last_name: z.string().min(1, {
    message: "*Please enter your Lastname",
  }),
  email: z.string().min(1, {
    message: "*Please enter your Email",
  }),
  cellphone: z.string().min(1, {
    message: "*Please enter your Cellphone",
  }),

  // address: z.string().min(1, {
  //   message: "*Please enter your Username",
  // }),
});
const SettingGeneralInformation = () => {
  const userCookie = Cookies.get("user");
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [serverErrors, setServerErrors] = useState("");
  const token = session.data?.user.token || "";
  const [refetch, setRefetch] = useState(false);
  const [inputValues, setInputValues] = useState({
    username: "",
    // password: "",
    email: "",
    cellphone: "",
    // address: data?.address || "",
    first_name: "",
    last_name: "",
  });
  const [message, setMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: "",
    // password: "",
    email: "",
    cellphone: "",
    // address: "",
    first_name: "",
    last_name: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (session.status === "authenticated") {
      const getUserProfileData = async () => {
        try {
          const req = await getUserProfile({
            token,
          });
          if (req.status === 200) {
            const res = await req.json();
            setInputValues({
              ...inputValues,
              username: res.username,
              email: res.email || "",
              cellphone: res.cellphone || "",
              first_name: res.first_name || "",
              last_name: res.last_name || "",
            });
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getUserProfileData();
    }
  }, [refetch, session.status]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const handleEditUserInfo = handleSubmit(async (data) => {
    // console.log(data);
    setInputErrors({
      username: "",
      // password: "",
      email: "",
      cellphone: "",
      // address: "",
      first_name: "",
      last_name: "",
    });
    setServerErrors("");
    setMessage("");
    const token = userCookie && JSON.parse(userCookie).token;
    const res = await putUserProfileData({ data, token });
    // console.log(res, "edit info");
    if (res?.status === 200) {
      // revalidatePath("/explore?section=wallet");

      router.refresh();
      setRefetch(!refetch);
      await session.update({
        name: `${res.data.first_name} ${res.data.last_name}`,
        email: res.data.email,
        cellphone: res.data.cellphone,
      });
      setInputValues({
        ...inputValues,
        email: res.data.email || "",
        cellphone: res.data.cellphone || "",
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
      });
      // console.log(res);
      setMessage("Profile updated successfully");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    if (res?.status !== 200) {
      setServerErrors(res?.data.message);
    }
  });
  return (
    <div className="flex flex-col items-stretch gap-4 px-10 py-6 h-full">
      <SubSectionHeader name="General information" />
      {loading ? (
        <div className="flex flex-col items-stretch h-full gap-2">
          <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
          <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
          <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
          <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
        </div>
      ) : (
        <form
          onSubmit={handleEditUserInfo}
          className="grow flex flex-col items-stretch justify-between"
        >
          <div className="flex flex-col items-stretch h-full justify-between gap-2 text-center">
            <div className="flex flex-col items-stretch h-full gap-2 text-center">
              {/* <div className="flex flex-col items-stretch">
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
                value: inputValues.username,
                onChange(event) {
                  setInputValues((prevState) => ({
                    ...prevState,
                    username: event.target.value,
                  }));
                },
              })}
            />
          </div>
          <p className="text-[12px] text-red-400 text-start">
            {errors.username?.message?.toString() || inputErrors.username}
          </p>
        </div> */}
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
                    {...register("first_name", {
                      value: inputValues.first_name,
                      onChange(event) {
                        setInputValues((prevState) => ({
                          ...prevState,
                          first_name: event.target.value,
                        }));
                      },
                    })}
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
                    {...register("last_name", {
                      value: inputValues.last_name,
                      onChange(event) {
                        setInputValues((prevState) => ({
                          ...prevState,
                          last_name: event.target.value,
                        }));
                      },
                    })}
                  />
                </div>
                <p className="text-[12px] text-red-400 text-start">
                  {errors.last_name?.message?.toString() ||
                    inputErrors.last_name}
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
                    Cellphone
                  </div>
                  <div className="h-full w-[1px] bg-white mx-1"></div>
                  <input
                    className="bg-transparent grow placeholder:text-[#353542] outline-none"
                    placeholder="Cellphone"
                    {...register("cellphone", {
                      value: inputValues.cellphone,
                      onChange(event) {
                        setInputValues((prevState) => ({
                          ...prevState,
                          cellphone: event.target.value,
                        }));
                      },
                    })}
                  />
                </div>
                <p className="text-[12px] text-red-400 text-start">
                  {errors.cellphone?.message?.toString() ||
                    inputErrors.cellphone}
                </p>
              </div>
              {/* <div className="flex flex-col items-stretch">
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
        </div> */}

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
                    {...register("email", {
                      value: inputValues.email,
                      onChange(event) {
                        setInputValues((prevState) => ({
                          ...prevState,
                          email: event.target.value,
                        }));
                      },
                    })}
                  />
                </div>
                <p className="text-[12px] text-red-400 text-start">
                  {errors.email?.message?.toString() || inputErrors.email}
                </p>
              </div>

              {/* <div className="flex flex-col items-stretch">
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
              {...register("address", {
                value: inputValues.address,
                onChange(event) {
                  setInputValues((prevState) => ({
                    ...prevState,
                    address: event.target.value,
                  }));
                },
              })}
            />
          </div>
          <p className="text-[12px] text-red-400 text-start">
            {errors.address?.message?.toString() || inputErrors.address}
          </p>
        </div> */}
            </div>
            <div>
              <div>
                <p
                  className={`line-clamp-2 mb-2 text-[14px] text-red-400 text-start ${
                    serverErrors ? "block" : "hidden"
                  }`}
                >
                  {serverErrors}
                </p>
                <p
                  className={`line-clamp-2 mb-2 text-[14px] text-white text-start ${
                    message ? "block" : "hidden"
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          </div>

          <button
            disabled={loading || isSubmitting}
            className="bg-[#4E4E61] bg-opacity-50 w-full mt-5 rounded-full text-[14px] leading-none text-white font-semibold flex items-center justify-center"
            type="submit"
          >
            {isSubmitting ? (
              <span className="py-2">
                <SPINNER
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </span>
            ) : (
              <span className="py-4">Edit</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default SettingGeneralInformation;
