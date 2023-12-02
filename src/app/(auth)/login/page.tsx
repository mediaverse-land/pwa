import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppleBtn from "@/components/Buttons/SocialLoginBtn";
import Motion from "@/components/motion";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SocialLoginBtn from "@/components/Buttons/SocialLoginBtn";
import { LoginWithPhone, LoginWithUsername } from "@/components/LoginInputs";

const Login = async (props: any) => {
  let loginType = props.searchParams.type || "phone";
  let refer = props.searchParams.refer;

  const session = await getServerSession(authOptions);
  // console.log(session, "server session");
  if (session) {
    redirect("/web-app/explore/assets");
  }
  return (
    <Motion>
      <div className="mt-28">
        <div
          style={{
            background: `rgba(78, 78, 97, 0.20)`,
          }}
          className="mx-auto max-w-[674px] auth-border-image-source rounded-3xl px-[8rem] pt-[3.5rem] pb-[3rem] backdrop-blur-[5px]"
        >
          <div className="flex flex-col items-stretch h-full justify-between gap-5 text-center">
            {/* providers */}
            <div className="flex flex-col items-stretch gap-4 [&_>_*]:py-[0.7rem] [&_>_*]:text-[14px] [&_>_*]:font-semibold [&_>_*]:leading-4 [&_>_*]:h-[40px] [&_>_*]:rounded-full">
              <SocialLoginBtn variant="google" />
              {/* <SocialLoginBtn variant="twitter" />
              <SocialLoginBtn variant="apple" />
              <SocialLoginBtn variant="facebook" /> */}
            </div>
            <div className="text-[#83839C] text-[12px] leading-3 uppercase">
              or
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
                      Dont have an account?
                    </span>
                    <Link
                      href={`/sign-up`}
                      className="text-[#597AFF] font-semibold text-[14px]"
                    >
                      Sign up
                    </Link>
                  </div>
                  {loginType === "phone" ? (
                    <Link
                      href={{ pathname: '/login', query: { type: 'account', refer: refer, } }}
                      className="text-[12px] leading-3 text-[#597AFF]"
                    >
                      Log in with password?
                    </Link>
                  ) : (
                    <Link
                      href={{ pathname: '/login', query: { type: 'phone', refer: refer, } }}
                      className="text-[12px] leading-3 text-[#597AFF]"
                    >
                      Log in with code?
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
