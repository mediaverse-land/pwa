import { authOptions } from "@/data/Auth";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { getDictionary } from "@/dictionary";
import { convertISOToDateAndTime } from "@/lib/convertISOToDateAndTime";
import { getUserMessages } from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";
import { getServerSession } from "next-auth";
import Link from "next/link";
const getUserMessagesData = async (token: string) => {
  try {
    const req = await getUserMessages(token);
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};
const WebAppSettingAllMessages = async ({
  searchParams,
  params: { lang },
}: {
  searchParams: {
    [key: string]: string;
  };
  params: { lang: Locale };
}) => {
  const session = await getServerSession(authOptions);
  const dic = await getDictionary(lang);
  const token = session?.user?.token || "";
  const [messagesData] = await Promise.all([getUserMessagesData(token)]);
  if (messagesData?.data.data.length === 0) {
    return (
      <div className="p-10">
        <SubSectionHeader name={dic.setting.messages} />
        <div className="text-white text-[22px] pt-20 font-semibold text-center">
          {dic.setting.noMessage}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-stretch gap-2 h-full overflow-y-auto pb-10">
      {messagesData?.data.data.map((item: any) => (
        <Link
          key={item.id}
          href={`/${lang}/app/setting/messages/${item.id}`}
          className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md rounded-2xl p-6 flex flex-col items-stretch gap-2 leading-none"
        >
          <div className="flex items-center justify-between">
            <div className="text-white leading-[19px]">New Message</div>
            <div className="text-[14px] text-[#666680] leading-4">
              {convertISOToDateAndTime(`${item.created_at}`)}
            </div>
          </div>
          <div className="grow text-[14px] text-[#666680] leading-4 line-clamp-2">
            {item.message}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WebAppSettingAllMessages;
