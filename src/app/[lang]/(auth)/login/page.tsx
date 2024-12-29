import { authOptions } from "@/data/Auth";
import SocialLoginBtn from "@/components/Buttons/SocialLoginBtn";

import Motion from "@/components/motion";
import { Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getDictionary } from "@/dictionary";
import { locales } from "@/middleware";
import { LoginWithUsername } from "@/components/Forms/LoginForms";
import OtpForm from "@/components/Forms/OtpForm";

const Login = async ({
  searchParams,
  params: { lang },
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const dic = await getDictionary(
    locales.find((item) => item === lang) ?? locales[0]
  );

  let loginType = searchParams.type || "phone";
  let refer = searchParams.refer;

  const session = await getServerSession(authOptions);

  if (session) {
    redirect(
      refer ? `${refer}?token=${session.user.token}` : `/${lang}/app/explore`
    );
  }
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
                {dic.login.or}
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
