import LogoutButtons from "@/components/ExplorePageComponents/SettingComponents/LogoutButtons";
import { getDictionary } from "@/dictionary";
import { Locale } from "@/types/dictionary-types";

const WebAppLogout = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dic = await getDictionary(lang);
  return (
    <div className="flex flex-col items-stretch p-10 h-full w-full gap-16 lg:gap-4">
      <div className="text-white text-center leading-5">
        {dic.generalApp.logout}
      </div>
      <div className="grow flex items-center justify-center gap-8">
        <div className="flex flex-col items-stretch justify-center gap-8 w-[290px] mx-auto">
          <div className="text-[#D9D9FF] text-center">
            {dic.auth.confirmLogout}
          </div>
          <div>
            <LogoutButtons dic={dic} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebAppLogout;
