import { authOptions } from "@/data/Auth";
import SocialLoginBtn from "@/components/Buttons/SocialLoginBtn";
import { LoginWithPhone, LoginWithUsername } from "@/components/LoginInputs";
import Motion from "@/components/motion";
import { Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getDictionary } from "@/dictionary";
import { locales } from "@/middleware";

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
  // console.log(session, "server session");
  if (session) {
    redirect(refer ? `${refer}?token=${session.user.token}` : "/app/explore");
  }
  return (
    <Motion>
      <div className="mt-36 lg:mt-28">
        <div className="mx-auto max-w-[500px] lg:max-w-[674px] lg:auth-border-image-source lg:bg-[rgba(78,78,97,0.20)] lg:rounded-3xl px-[2rem] lg:px-[8rem] lg:pt-[3.5rem] lg:pb-[3rem] lg:backdrop-blur-[5px]">
          <div className="flex flex-col items-stretch h-full justify-between gap-5 text-center">
            {/* providers */}
            <div className="flex flex-col items-stretch gap-4 [&_>_*]:py-[0.7rem] [&_>_*]:text-[14px] [&_>_*]:font-semibold [&_>_*]:leading-4 [&_>_*]:h-[40px] [&_>_*]:rounded-full">
              <SocialLoginBtn variant="google" />
              {/* <SocialLoginBtn variant="twitter" />
              <SocialLoginBtn variant="apple" />
              <SocialLoginBtn variant="facebook" /> */}
            </div>
            <div className="text-[#83839C] text-[12px] leading-3 uppercase">
              {dic.login.or}
            </div>
            {/* inputs */}
            <div className="flex flex-col items-stretch grow gap-8">
              {loginType === "phone" ? (
                <LoginWithPhone />
              ) : (
                <LoginWithUsername />
              )}
              <div className="flex flex-col items-stretch gap-5">
                <div className="flex items-center justify-around">
                  <div>
                    <span className="text-[12px] text-[#83839C]">
                      {dic.login.noAccount}
                    </span>
                    <Link
                      href={`/${lang}/sign-up`}
                      className="text-[#597AFF] font-semibold text-[14px]"
                    >
                      {dic.generalApp.signUp}
                    </Link>
                  </div>
                  {loginType === "phone" ? (
                    <Link
                      href={{
                        pathname: `/${lang}/login`,
                        query: { type: "account", refer: refer },
                      }}
                      className="text-[12px] leading-3 text-[#597AFF]"
                    >
                      {dic.login.signInWithPassQ}
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: `/${lang}/login`,
                        query: { type: "phone", refer: refer },
                      }}
                      className="text-[12px] leading-3 text-[#597AFF]"
                    >
                      {dic.login.signInWithOtpQ}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default Login;
