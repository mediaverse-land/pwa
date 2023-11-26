import { getSessions } from "@/services/contactService";
import SubSectionHeader from "../shared/SubSectionHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { convertISOToDateAndTime } from "@/lib/convertISOToDateAndTime";
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

const SettingSessions = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";
  const sessionsData = await getSessionsData(token);
  // console.log(sessionsData?.data[0].details);
  return (
    <div className="flex flex-col items-stretch gap-10 p-10 w-full h-full overflow-y-auto">
      <SubSectionHeader name="Sessions" />
      <div className="flex flex-col items-stretch gap-2">
        {sessionsData?.data.map((item: any) => (
          <div
            key={item.id}
            className="bg-[rgba(78,78,97,0.50)] backdrop-blur-md rounded-2xl p-6 flex flex-col items-stretch gap-4 leading-none"
          >
            <div className="text-[14px] text-white line-clamp-1 leading-[17px]">
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

export default SettingSessions;
