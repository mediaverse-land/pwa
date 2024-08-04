"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckUserData = () => {
  const session = useSession();
  const params = useParams();
  const router = useRouter();
  useEffect(() => {
    if (session.status === "authenticated") {
      const user = session.data.user;
      if (
        !user.firstName ||
        !user.lastName ||
        !user.cellphone ||
        !user.username
      ) {
        router.push(`/${params.lang}/sign-up/info`);
      }
    }
  }, [session]);
  return null;
};

export default CheckUserData;
