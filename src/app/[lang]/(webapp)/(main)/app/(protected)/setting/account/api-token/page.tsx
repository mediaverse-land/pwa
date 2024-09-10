import { authOptions } from "@/data/Auth";
import AddApiTokenButton from "@/components/Buttons/AddApiToken";
import ShowUserTokenButton from "@/components/Buttons/ShowUserToken";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { getUserApiTokens } from "@/services/contactService";
import { getServerSession } from "next-auth";

const reqUserApiTokens = async (token: string) => {
  try {
    const req = await getUserApiTokens({
      token,
    });
    if (req.ok) {
      return await req.json();
    } else {
    }
  } catch (error) {}
};

const API_Token_Page = async () => {
  const session = await getServerSession(authOptions);
  const userApiTokens = await reqUserApiTokens(session?.user.token as string);
  return (
    <div
      className={`h-full w-full flex flex-col items-stretch justify-start gap-10 p-10`}
    >
      <SubSectionHeader name="API Token" />
      {/* top section */}
      <div className="flex flex-col items-stretch gap-6 overflow-y-auto">
        {userApiTokens.data.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-[rgba(78,78,97,0.75)] rounded-lg px-4 py-3"
          >
            <div className="text-[14px] text-[#83839C]">
              {/* {item.details.requests[0].name || item.app} */}
              {item.app}
            </div>
            <div className="w-[1px] h-full bg-[#83839C]"></div>
            <div className="font-bold text-[14px] text-white flex items-center line-clamp-1">
              <ShowUserTokenButton token={item.token as string} />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto">
        <AddApiTokenButton />
      </div>
    </div>
  );
};

export default API_Token_Page;
