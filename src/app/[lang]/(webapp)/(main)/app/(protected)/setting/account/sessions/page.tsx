import { getSessions } from "@/services/contactService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/data/Auth";
import { convertISOToDateAndTime } from "@/lib/convertISOToDateAndTime";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { Locale } from "@/types/dictionary-types";
import { getDictionary } from "@/dictionary";
const getSessionsData = async (token: string) => {
  try {
    const req = await getSessions({ token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const WebAppSettingSessions = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const session = await getServerSession(authOptions);
  const dic = await getDictionary(lang);
  const token = session?.user?.token || "";
  const sessionsData = await getSessionsData(token);
  return (
    <div className="flex flex-col items-stretch gap-10 p-10 w-full h-full overflow-y-auto">
      <SubSectionHeader name={dic.setting.sessions} />
      <div className="flex flex-col items-stretch gap-2">
        {sessionsData?.data.data.map((item: any) => (
          <div
            key={item.id}
            className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md rounded-2xl p-6 flex flex-col items-stretch gap-4 leading-none"
          >
            <div className="text-[14px] text-white line-clamp-1 leading-[17px] break-words">
              {item.app}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-white leading-[19px]">
                {convertISOToDateAndTime(`${item.created_at}`)}
              </div>
              <div className="text-[16px] text-[#666680] leading-[19px]">
                {item.ip}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebAppSettingSessions;
