import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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
type InavbarSections = {
  id: string;
  name: string;
  link: string;
  active_icon: JSX.Element;
  inactive_icon: JSX.Element;
};
const navbarSections: InavbarSections[] = [
  {
    id: "1",
    name: "Explore",
    link: "explore",
    active_icon: <ACTIVE_EXPLORE />,
    inactive_icon: <INACTIVE_EXPLORE />,
  },
  {
    id: "2",
    name: "Apps",
    link: "apps",
    active_icon: <ACTIVE_APPS />,
    inactive_icon: <INACTIVE_APPS />,
  },
  {
    id: "3",
    name: "Plus",
    link: "plus",
    active_icon: <ACTIVE_PLUS />,
    inactive_icon: <INACTIVE_PLUS />,
  },
  {
    id: "4",
    name: "Wallet",
    link: "wallet",
    active_icon: <ACTIVE_WALLET />,
    inactive_icon: <INACTIVE_WALLET />,
  },
  {
    id: "5",
    name: "Account",
    link: "account",
    active_icon: <ACTIVE_ACCOUNT />,
    inactive_icon: <INACTIVE_ACCOUNT />,
  },
];

const Explore = async () => {
  const session = await getServerSession();
  const isLogin = Boolean(cookies().get("isLogin")?.value);
  if (!session && !isLogin) {
    redirect("/login");
  }
  return (
    <Motion>
      <div className="mt-28 mx-auto flex items-center justify-center">
        <div className="grid grid-cols-5 grid-rows-1 gap-4 h-[32rem] min-w-[640px] max-w-screen-md text-[#C1C1CD]">
          <aside
            className="col-span-2 rounded-2xl border border-[#CFCFFC] border-opacity-20 py-8 px-6 flex flex-col items-stretch justify-between"
            style={{ background: `rgba(78, 78, 97, 0.20)` }}
          >
            <div className="flex flex-col items-stretch gap-8">
              {/* user info */}
              <div className="flex justify-between items-center gap-2">
                <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden">
                  <Image
                    src={session?.user?.image || ""}
                    alt="user profile picture"
                    fill
                  />
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
                    {navbarSections.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-4 cursor-pointer text-[14px]"
                      >
                        <div>{item.inactive_icon}</div>
                        <div>{item.name}</div>
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
            className="col-span-3 rounded-2xl border border-[#CFCFFC] border-opacity-20 overflow-hidden flex flex-col items-stretch gap-4"
            style={{ background: `rgba(78, 78, 97, 0.20)` }}
          >
            {/* search */}
            <div></div>
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default Explore;
