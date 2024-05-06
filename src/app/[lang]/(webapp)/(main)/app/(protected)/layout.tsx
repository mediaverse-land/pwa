import { authOptions } from "@/data/Auth";
import { Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Layout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="w-full h-full">
        <div className="p-10 mt-28 flex flex-col justify-center items-center gap-6">
          <div className="text-white font-semibold text-[24px]">
            Please Login To See This Page.
          </div>
          <Link
            href={`/${lang}/login`}
            style={{
              background: `linear-gradient(0deg, #597AFF, #597AFF), linear-gradient(126.58deg, rgba(255, 255, 255, 0.3) 23.2%, rgba(255, 255, 255, 0) 71.3%)`,
              boxShadow: `0px 0px 25px 0px rgba(89, 122, 255, 0.3)`,
            }}
            className="px-10 py-2 rounded-full text-white font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
  return <div className="w-full h-full">{children}</div>;
};

export default Layout;
