"use client";

import SocialLoginBtn from "@/components/Buttons/SocialLoginBtn";
import Motion from "@/components/motion";
import { Locale } from "@/types/dictionary-types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = ({
     params: { lang },
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const { data: session } = useSession(); // Client-side session hook
  const router = useRouter();
  const refer = `/${lang}/app/explore`;

  useEffect(() => {
      console.log("Session:", session);
      console.log("Language:", lang);
      console.log("Redirect Target:", refer);
    if (session) {
      router.push(refer);
    }
  }, [session, router, refer]);

  return (
    <Motion>
      <div className="mt-36 lg:mt-28">
        <div className="mx-auto max-w-[500px] lg:max-w-[674px] lg:auth-border-image-source lg:bg-[rgba(78,78,97,0.20)] lg:rounded-3xl px-[2rem] lg:px-[8rem] lg:pt-[3.5rem] lg:pb-[3rem] lg:backdrop-blur-[5px]">
          <div className="flex flex-col items-stretch h-full justify-between gap-5 text-center">
            {/* providers */}
            <div
                className="flex flex-col items-stretch gap-4 [&_>_*]:py-[0.7rem] [&_>_*]:text-[14px] [&_>_*]:font-semibold [&_>_*]:leading-4 [&_>_*]:h-[40px] [&_>_*]:rounded-full">
              <SocialLoginBtn variant="pkce-app"/>
              <div className="text-[#83839C] text-[12px] leading-3 uppercase">
                Or
              </div>
              <SocialLoginBtn variant="google"/>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default Login;
