import { cookies } from "next/headers";
import Motion from "../motion";
import LogoutNoUser from "./Account/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import SettingMainPage from "./Setting/MainPage";
import { redirect } from "next/navigation";

const Setting = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
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
      component: <div>s</div>,
    },
  };
  return (
    <Motion key={"setting"} fullHeight>
      {settingComponents[searchParams["page"]]?.component ||
        redirect("/explore?section=setting&page=main")}
    </Motion>
  );
};

export default Setting;
