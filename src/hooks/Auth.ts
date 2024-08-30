import { AdapterUser } from "next-auth";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";

export const useLogin = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const loginUser = ({
    cellphone,
    email,
    firstName,
    image,
    lastName,
    token,
    id,
    username,
    address,
    callBack = "/app/explore",
  }: AdapterUser & {
    callBack?: string;
  }) => {
    signIn(
      "customLogin",
      {
        callbackUrl: searchParams.get("refer")
          ? `${searchParams.get("refer")}?token=${token}`
          : `/${params.lang}${callBack}`,
      },
      {
        user: JSON.stringify({
          id,
          firstName: firstName || "",
          lastName: lastName || "",
          image,
          email,
          cellphone,
          token,
          username,
          address,
        }),
      }
    );
  };

  return {
    loginUser,
  };
};
