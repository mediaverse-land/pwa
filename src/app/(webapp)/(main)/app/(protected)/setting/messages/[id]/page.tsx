import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutNoUser from "@/components/ExplorePageComponents/AccountComponents/Logout";
import { convertISOToDateAndTime } from "@/lib/convertISOToDateAndTime";
import { getUserSingleMessage } from "@/services/contactService";
import { getServerSession } from "next-auth";

const getSingleMessageDate = async ({
  id,
  token,
}: {
  token: string;
  id: string;
}) => {
  try {
    const req = await getUserSingleMessage({ token, id });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};
const WebAppSettingSingleMessage = async (params: any) => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";
  const [messagesData] = await Promise.all([
    getSingleMessageDate({ token, id: `${params.params.id}` }),
  ]);
  if (messagesData?.status === 401) {
    return <LogoutNoUser />;
  }
  if (messagesData?.status !== 200) {
    return (
      <div className="text-center pt-20 font-semibold text-[20px] text-white">
        Message Not Found
      </div>
    );
  }
  return (
    <div className="flex flex-col items-stretch gap-4 h-full overflow-y-auto pb-10">
      <div className="flex items-center justify-between">
        <div className="text-white leading-[19px]">New Message</div>
        <div className="text-[14px] text-[#666680] leading-4">
          {convertISOToDateAndTime(`${messagesData?.data.created_at}`)}
        </div>
      </div>
      <div className="text-[14px] text-[#666680] leading-4">
        {messagesData?.data.message}
      </div>
      {/* <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[14px] leading-4 text-[#597AFF]">#tag</span>
      </div> */}
    </div>
  );
};

export default WebAppSettingSingleMessage;
