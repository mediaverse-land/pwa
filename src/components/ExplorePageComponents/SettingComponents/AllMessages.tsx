import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { convertISOToDateAndTime } from "@/lib/convertISOToDateAndTime";
import { getUserMessages } from "@/services/contactService";
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
const SettingAllMessages = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";
  const [messagesData] = await Promise.all([getUserMessagesData(token)]);
  if (messagesData?.data.data.length === 0) {
    return (
      <div className="text-white text-[22px] pt-5 font-semibold text-center">
        You Have No Messages
      </div>
    );
  }
  return (
    <div className="flex flex-col items-stretch gap-2 h-full overflow-y-auto pb-10">
      {messagesData?.data.data.map((item: any) => (
        <Link
          key={item.id}
          href={`/explore?section=setting&page=messages&id=${item.id}`}
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

export default SettingAllMessages;