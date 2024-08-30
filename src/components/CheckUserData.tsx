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
      if (!user.username && !user.firstName && !user.lastName) {
        return router.push(`/${params.lang}/sign-up/info`);
      }
      if (!user.address.country_iso) {
        return router.push(`/${params.lang}/app/setting/account/general-info`);
      }
    }
  }, [session]);
  return null;
};

export default CheckUserData;
