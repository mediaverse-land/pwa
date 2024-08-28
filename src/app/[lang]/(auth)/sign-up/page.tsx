import OtpForm from "@/components/Forms/OtpForm";
import Motion from "@/components/motion";
import { getDictionary } from "@/dictionary";
import { Locale } from "@/types/dictionary-types";
import Link from "next/link";

const SingUpPage = async ({ params }: { params: { lang: Locale } }) => {
  const dic = await getDictionary(params.lang);
  return (
    <Motion>
      <div className="mt-36 lg:mt-28">
        <div className="mx-auto max-w-[674px] lg:auth-border-image-source lg:bg-[rgba(78,78,97,0.20)] lg:rounded-3xl px-[2rem] lg:px-[8rem] lg:pt-[3.5rem] lg:pb-[3rem] lg:backdrop-blur-[5px]">
          {/* heading */}
          <div className="text-[14px] text-white leading-4 mx-auto w-fit mb-8">
            Insert your number for loging in.
          </div>
          <OtpForm />
          {/* navigate link */}
          <div className="flex items-center justify-center mt-10">
            <div className="flex items-center justify-center gap-1">
              <span className="text-[12px] text-[#83839C]">
                Have an account?
              </span>
              <Link
                href={`/${params.lang}/login`}
                className="text-[#597AFF] font-semibold text-[14px]"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default SingUpPage;
