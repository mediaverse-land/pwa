import { cookies } from "next/headers";
import Motion from "../motion";
import LogoutNoUser from "./AccountComponents/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import SettingMainPage from "./SettingComponents/MainPage";
import { redirect } from "next/navigation";
import SettingWalletSection from "./SettingComponents/WalletSection";
import SettingAccountSection from "./SettingComponents/SettingAccount";
import SettingSignIns from "./SettingComponents/SignIns";
import SettingGeneralInformation from "./SettingComponents/GeneralInformation";
import SettingMessages from "./SettingComponents/Messages";
import SettingSessions from "./SettingComponents/Sessions";

const Setting = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const activePage = searchParams["page"] || "main";
  const cookie = cookies().get("user")?.value;
  if (!cookie) {
    return <LogoutNoUser />;
  }

  const settingComponents: {
    [key: string]: {
      component: JSX.Element;
    };
  } = {
    main: {
      component: <SettingMainPage searchParams={searchParams} />,
    },
    account: {
      component: <SettingAccountSection searchParams={searchParams} />,
    },
    wallet: {
      component: <SettingWalletSection />,
    },
    "sign-ins": {
      component: <SettingSignIns />,
    },
    info: {
      component: <SettingGeneralInformation />,
    },
    messages: {
      component: <SettingMessages searchParams={searchParams} />,
    },
    sessions: {
      component: <SettingSessions />,
    },
  };
  return (
    <Motion key={"setting"} fullHeight>
      {settingComponents[activePage]?.component ||
        redirect("/explore?section=setting")}
    </Motion>
  );
};

export default Setting;
