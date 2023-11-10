import { getServerSession } from "next-auth";
import Image from "next/image";
import {
  ACTIVE_ACCOUNT,
  ACTIVE_APPS,
  ACTIVE_EXPLORE,
  ACTIVE_PLUS,
  ACTIVE_WALLET,
  INACTIVE_ACCOUNT,
  INACTIVE_APPS,
  INACTIVE_EXPLORE,
  INACTIVE_PLUS,
  INACTIVE_SETTING,
  INACTIVE_WALLET,
} from "@/components/SVG/svgs";
import LogoutBtn from "@/components/Buttons/LogoutBtn";
import Motion from "@/components/motion";
import { cookies } from "next/headers";
import Link from "next/link";
import ExploreSection from "@/components/ExplorePageComponents/Explore";
import AppsSection from "@/components/ExplorePageComponents/Apps";
import PlusSection from "@/components/ExplorePageComponents/Plus";
import WalletSection from "@/components/ExplorePageComponents/Wallet";
import AccountSection from "@/components/ExplorePageComponents/Account";
import { notFound, redirect } from "next/navigation";
type IexploreSections = {
  id: string;
  name: string;
  link: string;
  active_icon?: JSX.Element;
  inactive_icon?: JSX.Element;
  component: JSX.Element;
};

const Explore = async (params: {
  params: any;
  searchParams: {
    [key: string]: string;
  };
}) => {
  // console.log(params, "explore params");
  const exploreSections: IexploreSections[] = [
    {
      id: "1",
      name: "Explore",
      link: "explore",
      active_icon: <ACTIVE_EXPLORE />,
      inactive_icon: <INACTIVE_EXPLORE />,
      component: <ExploreSection searchParams={params.searchParams} />,
    },
    {
      id: "2",
      name: "Apps",
      link: "apps",
      active_icon: <ACTIVE_APPS />,
      inactive_icon: <INACTIVE_APPS />,
      component: <AppsSection />,
    },
    {
      id: "3",
      name: "Plus",
      link: "plus",
      active_icon: <ACTIVE_PLUS />,
      inactive_icon: <INACTIVE_PLUS />,
      component: <PlusSection />,
    },
    {
      id: "4",
      name: "Wallet",
      link: "wallet",
      active_icon: <ACTIVE_WALLET />,
      inactive_icon: <INACTIVE_WALLET />,
      component: <WalletSection />,
    },
    {
      id: "5",
      name: "Account",
      link: "account",
      active_icon: <ACTIVE_ACCOUNT />,
      inactive_icon: <INACTIVE_ACCOUNT />,
      component: <AccountSection />,
    },
    {
      id: "6",
      name: "Search",
      link: "search",
      component: <AccountSection />,
    },
  ];
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  // console.log(session, " server session");
  const isLogin = cookies().get("isLogin")?.value;
  const activeSection = params.searchParams.section || exploreSections[0].link;
  // console.log(activeSection, "search params");

  return (
    <Motion center>
      <div className="mt-24 mx-auto flex items-center justify-center">
        <div className="grid grid-cols-6 grid-rows-1 gap-4 h-[520px] w-[674px] text-[#C1C1CD]">
          <aside
            className="col-span-2 rounded-2xl border border-[#CFCFFC] border-opacity-20 py-8 px-6 flex flex-col items-stretch justify-between"
            style={{ background: `rgba(78, 78, 97, 0.20)` }}
          >
            <div className="flex flex-col items-stretch gap-8">
              {/* user info */}
              <div className="flex justify-between items-center gap-2">
                <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden">
                  {session?.user?.image && (
                    <Image
                      src={session?.user?.image || "/images/no.png"}
                      alt="user profile picture"
                      fill
                    />
                  )}
                </div>
                <div className="flex flex-col items-stretch max-w-[80%] grow text-start">
                  <div className="line-clamp-1 w-full h-full font-semibold text-white">
                    {session?.user?.name}
                  </div>
                  <div className="line-clamp-1 max-w-full h-full text-[#83839C] text-[10px]">
                    {session?.user?.email}
                  </div>
                </div>
              </div>
              <div>
                <nav>
                  <ul className="flex flex-col gap-6">
                    {/* navbar exept search and recently */}
                    {exploreSections.slice(0, 5).map((item) => (
                      <li key={item.id} className="">
                        <Link
                          className="flex items-center gap-4 cursor-pointer text-[14px] font-normal"
                          href={`/explore?section=${item.link}`}
                        >
                          <div
                            className={`${
                              activeSection === item.link
                                ? "font-semibold"
                                : "duration-150"
                            }`}
                          >
                            {activeSection === item.link
                              ? item.active_icon
                              : item.inactive_icon}
                          </div>
                          <div
                            className={`duration-150 ${
                              activeSection === item.link
                                ? "font-medium text-white"
                                : ""
                            }`}
                          >
                            {item.name}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-6">
              <div className="flex items-center gap-4">
                <INACTIVE_SETTING />
                <div className="text-[14px]">Setting</div>
              </div>
              <LogoutBtn />
            </div>
          </aside>
          <div
            className="col-span-4 rounded-2xl border border-[#CFCFFC] border-opacity-20 overflow-y-auto flex flex-col items-stretch gap-4"
            style={{ background: `rgba(78, 78, 97, 0.20)` }}
          >
            <div className="">
              {exploreSections.find((item) => item.link === activeSection)
                ?.component || redirect("/explore?section=explore")}
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default Explore;
