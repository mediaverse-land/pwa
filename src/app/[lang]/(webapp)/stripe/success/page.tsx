import { Locale } from "@/types/dictionary-types";
import Link from "next/link";

const StripeSuccess = ({
  searchParams,
  params,
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-stretch gap-6 bg-[rgba(78,78,97,0.50)] border rounded-2xl py-14 px-8 text-[14px] max-w-[286px] lg:px-16 lg:py-16 text-white lg:text-[18px] font-semibold  md:max-w-[568px] md:text-[16px] lg:max-w-[768px] mx-auto text-center">
        <p className="">
          Wallet Successfully Recharged! Congratulations! Your wallet has been
          successfully charged, and you're ready to make seamless transactions
          and enjoy our services hassle-free.
        </p>
        <Link href={`/${params.lang}/app/wallet`} className="flex mx-auto">
          <div
            style={{
              background: `linear-gradient(0deg, #597AFF, #597AFF),
          linear-gradient(126.58deg, rgba(255, 255, 255, 0.3) 23.2%, rgba(255, 255, 255, 0) 71.3%)`,
              boxShadow: `0px 0px 25px 0px rgba(89, 122, 255, 0.3)`,
            }}
            className="h-8 px-8 py-2 leading-none bg-indigo-500 rounded-[999px] shadow border border-white border-opacity-30 justify-center items-center inline-flex"
          >
            <div className="text-center text-white text-sm font-semibold whitespace-nowrap">
              Back To Web app
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StripeSuccess;
