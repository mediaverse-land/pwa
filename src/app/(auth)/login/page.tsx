import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppleBtn from "@/components/Buttons/SocialLoginBtn";
import Motion from "@/components/motion";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SocialLoginBtn from "@/components/Buttons/SocialLoginBtn";

const Login = async (props: any) => {
  console.log(props, "login props");
  const providers = await fetch(
    "http://localhost:3000/api/auth/providers"
  ).then((res) => res.json());
  const session = await getServerSession(authOptions);
  console.log(session, "server session");
  if (session) {
    redirect("/");
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
              {/* <div
                className="text-white flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(0deg, #000000, #000000), linear-gradient(153.43deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 83.33%)`,
                }}
              >
                <div className="relative w-[16px] h-[16px]">
                  <Image src={"/icons/apple.svg"} alt="logo" fill />
                </div>
                Sign up with Apple
              </div> */}
              <SocialLoginBtn variant="apple" />
              <SocialLoginBtn variant="google" />
              <SocialLoginBtn variant="facebook" />
              <SocialLoginBtn variant="github" />
            </div>
            <div className="text-[#83839C] text-[12px] leading-3 uppercase">
              or
            </div>
            {/* inputs */}
            <div className="flex flex-col items-stretch justify-between grow gap-16">
              <div
                className="h-[48px] rounded-lg border border-[#353542] flex gap-4 px-4 py-[0.6rem] text-white"
                style={{
                  background: `rgba(14, 14, 18, 0.50)`,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="relative w-[1.4rem] h-[1rem]">
                    <Image src={"/images/france-flag.png"} alt="flage" fill />
                  </div>
                  <span className="">+33</span>
                </div>
                <div className="h-full w-[1px] bg-white"></div>
                <input
                  className="bg-transparent grow placeholder:text-[#353542] outline-none"
                  placeholder="your number..."
                  type="text"
                />
              </div>
              <div className="flex flex-col items-stretch gap-5">
                <button className="bg-[#4E4E61] bg-opacity-50 rounded-full h-[40px] text-[14px] leading-4 text-white font-semibold">
                  Send Code
                </button>
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
                  <div className="text-[12px] leading-3 text-[#597AFF]">
                    Log in with password?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
    // <div></div>
  );
};

export default Login;
