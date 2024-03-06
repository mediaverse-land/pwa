import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ShowUserTokenButton from "@/components/Buttons/ShowUserToken";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { getServerSession } from "next-auth";

const API_Token_Page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div
      className={`h-full w-full flex flex-col items-stretch justify-start gap-10 p-10`}
    >
      <SubSectionHeader name="API Token" />
      {/* top section */}
      <div className="flex flex-col items-stretch gap-14">
        <div className="flex items-center gap-4 bg-[rgba(78,78,97,0.75)] rounded-lg px-4 py-3">
          <div className="text-[14px] text-[#83839C]">Token</div>
          <div className="w-[1px] h-full bg-[#83839C]"></div>
          <div className="font-bold text-[14px] text-white flex items-center line-clamp-1">
            <ShowUserTokenButton token={session?.user.token as string} />
            ShowUserTokenButton
          </div>
        </div>
      </div>
    </div>
  );
};

export default API_Token_Page;
