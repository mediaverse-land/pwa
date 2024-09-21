"use client";

import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { SPINNER } from "@/components/SVG/svgs";
import {
  getCities,
  getUserProfile,
  putUserProfile,
} from "@/services/contactService";
import { DicProperties } from "@/types/dictionary-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectCountryDropdown from "../SelectCountryDropdown";
import SelectCityDropDown from "../SelectCityDropDown";
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
  email: z.string().min(0, {
    message: "*Please enter your Email",
  }),
  image: z.any(),
  countryISO: z.string().min(1, { message: "*Please Select Your Country" }),
  cityID: z.number(),
  line1: z.string(),
  line2: z.string(),
});

type formData = z.infer<typeof schema>;

const WebAppSettingGeneralInformation = ({ dic }: { dic: DicProperties }) => {
  const session = useSession();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [serverErrors, setServerErrors] = useState("");
  const token = session.data?.user.token || "";
  const [refetch, setRefetch] = useState(false);
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    cellphone: "",
    first_name: "",
    last_name: "",
    country: {
      iso: "",
      name: "",
    },
    city: {
      id: 0,
      name: "",
    },
    line1: "",
    line2: "",
  });
  const [message, setMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: "",
    email: "",
    cellphone: "",
    first_name: "",
    last_name: "",
    image: "",
    countryISO: "",
    cityID: "",
    line1: "",
    line2: "",
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
              username: res.data?.username,
              email: res.data?.email || "",
              cellphone: res.data?.cellphone || "",
              first_name: res.data?.first_name || "",
              last_name: res.data?.last_name || "",
              country: {
                iso: res.data.address.country.iso || "",
                name: res.data.address.country.title || "",
              },
              city: {
                id: res.data.address.city_id || 0,
                name: res.data.address.city || "",
              },
              line1: res.data.address.line1 || "",
              line2: res.data.address.line2 || "",
            });
            setValue("countryISO", res.data.address.country.iso || "");
            setValue("cityID", res.data.address.city_id || 0);
            setValue("line1", res.data.address.line1 || "");
            setValue("line2", res.data.address.line2 || "");
            setLoading(false);
          } else if (req.status === 406) {
            router.push(`/${params.lang}/sign-up/info`);
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
    setValue,
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const handleEditUserInfo = handleSubmit(async (data) => {
    setInputErrors({
      username: "",
      email: "",
      cellphone: "",
      first_name: "",
      last_name: "",
      image: "",
      countryISO: "",
      cityID: "",
      line1: "",
      line2: "",
    });
    setServerErrors("");
    setMessage("");
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("country_iso", data.countryISO);
    formData.append("city_id", `${data.cityID}`);
    formData.append("line_1", data.line1);
    formData.append("line_2", data.line2);
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    const res = await putUserProfileData({ data: formData, token });
    if (res?.status === 200) {
      await session.update({
        firstName: res.data.data.first_name,
        lastName: res.data.data.last_name,
        email: res.data.data.email,
        cellphone: res.data.data.cellphone,
        image: res.data.data?.image_url || null,
        address: res.data.data.address,
      });
      setInputValues({
        ...inputValues,
        email: res.data.data.email || "",
        cellphone: res.data.data.cellphone || "",
        first_name: res.data.data.first_name || "",
        last_name: res.data.data.last_name || "",
        country: {
          iso: res.data.data.address?.country.iso || "",
          name: res.data.data.address?.title || "",
        },
        city: {
          id: res.data.address?.city_id || 0,
          name: res.data.address?.city || "",
        },
        line1: res.data.address?.line1 || "",
        line2: res.data.address?.line2 || "",
      });
      //
      router.refresh();
      setRefetch(!refetch);
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
      <SubSectionHeader name={dic.setting.generalInforamtion} />
      {loading ? (
        <div className="flex flex-col items-stretch h-full gap-2">
          <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
          <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
          <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
          <div className="flex items-center justify-center gap-4 [&_>_*]:flex-1">
            <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
            <div className="bg-[rgba(64,64,88,0.5)] animate-pulse h-[40px] rounded-lg"></div>
          </div>
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
              <div className="flex flex-col items-stretch">
                <div
                  className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                  style={{
                    background: `rgba(14, 14, 18, 0.50)`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                    {dic.auth.firstName}
                  </div>
                  <div className="h-full w-[1px] bg-white mx-1"></div>
                  <input
                    className="bg-transparent grow placeholder:text-[#353542] outline-none"
                    placeholder={dic.auth.firstName}
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
                    {dic.auth.lastName}
                  </div>
                  <div className="h-full w-[1px] bg-white mx-1"></div>
                  <input
                    className="bg-transparent grow placeholder:text-[#353542] outline-none"
                    placeholder={dic.auth.lastName}
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
                    {dic.auth.email}
                  </div>
                  <div className="h-full w-[1px] bg-white mx-1"></div>
                  <input
                    className="bg-transparent grow placeholder:text-[#353542] outline-none"
                    placeholder={dic.auth.email}
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
              <div className="flex flex-col items-stretch">
                <div
                  className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                  style={{
                    background: `rgba(14, 14, 18, 0.50)`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                    {"Image"}
                  </div>
                  <div className="h-full w-[1px] bg-white mx-1"></div>
                  <input
                    className="bg-transparent grow placeholder:text-[#353542] outline-none"
                    type="file"
                    {...register("image")}
                  />
                </div>
                <p className="text-[12px] text-red-400 text-start">
                  {errors.image?.message?.toString() || inputErrors.image}
                </p>
              </div>
              {/* address section */}
              <div className="flex flex-col gap-2">
                {/* country and city */}
                <div>
                  <div className="flex items-center justify-center [&_>_*]:flex-1 gap-4">
                    {/* country */}
                    <div>
                      <div className="flex flex-col items-stretch">
                        <div
                          className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                          style={{
                            background: `rgba(14, 14, 18, 0.50)`,
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                            {"Country"}
                          </div>
                          <div className="h-full w-[1px] bg-white mx-1"></div>
                          <SelectCountryDropdown
                            defaultValue={{
                              iso: inputValues.country.iso,
                              name: inputValues.country.name,
                            }}
                            setValue={(value: string) => {
                              setValue("countryISO", value);
                              setInputValues({
                                ...inputValues,
                                country: {
                                  iso: value,
                                  name: inputValues.country.name,
                                },
                              });

                              setValue("cityID", 0);
                            }}
                          />
                        </div>
                        <p className="text-[12px] text-red-400 text-start">
                          {errors.countryISO?.message?.toString() ||
                            inputErrors.countryISO}
                        </p>
                      </div>
                    </div>
                    {/* city */}
                    <div>
                      <div className="flex flex-col items-stretch">
                        <div
                          className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                          style={{
                            background: `rgba(14, 14, 18, 0.50)`,
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                            {"City"}
                          </div>
                          <div className="h-full w-[1px] bg-white mx-1"></div>
                          <SelectCityDropDown
                            defaultValue={{
                              id: inputValues.city.id,
                              name: inputValues.city.name,
                            }}
                            setValue={(value: number) => {
                              setValue("cityID", value);
                            }}
                            countryISO={inputValues.country.iso}
                            disabled={!inputValues.country.iso}
                          />
                        </div>
                        <p className="text-[12px] text-red-400 text-start">
                          {errors.cityID?.message?.toString() ||
                            inputErrors.cityID}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* line 1 and line 2 */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-stretch">
                    <div
                      className="h-[48px] rounded-lg border border-[#353542] flex gap-2 px-4 py-[0.6rem] text-white"
                      style={{
                        background: `rgba(14, 14, 18, 0.50)`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 text-[14px] text-[#666680]">
                        {"Line 1"}
                      </div>
                      <div className="h-full w-[1px] bg-white mx-1"></div>
                      <input
                        className="bg-transparent grow placeholder:text-[#353542] outline-none"
                        placeholder={"Line 1"}
                        {...register("line1", {
                          value: inputValues.line1,
                          onChange(event) {
                            setInputValues((prevState) => ({
                              ...prevState,
                              line1: event.target.value,
                            }));
                          },
                        })}
                      />
                    </div>
                    <p className="text-[12px] text-red-400 text-start">
                      {errors.line1?.message?.toString() || inputErrors.line1}
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
                        {"Line 2"}
                      </div>
                      <div className="h-full w-[1px] bg-white mx-1"></div>
                      <input
                        className="bg-transparent grow placeholder:text-[#353542] outline-none"
                        placeholder={"Line 2"}
                        {...register("line2", {
                          value: inputValues.line2,
                          onChange(event) {
                            setInputValues((prevState) => ({
                              ...prevState,
                              line2: event.target.value,
                            }));
                          },
                        })}
                      />
                    </div>
                    <p className="text-[12px] text-red-400 text-start">
                      {errors.line2?.message?.toString() || inputErrors.line2}
                    </p>
                  </div>
                </div>
              </div>
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
              <span className="py-4">{dic.auth.edit}</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default WebAppSettingGeneralInformation;
