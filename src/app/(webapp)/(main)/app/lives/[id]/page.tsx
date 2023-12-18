import { getLives } from "@/services/contactService";
import { redirect } from "next/navigation";
import Image from "next/image";
import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import HLSPlayer from "@/components/ExplorePageComponents/shared/HLSPlayer";

const getSingleLiveData = async ({ id }: { id: string }) => {
  try {
    const req = await getLives({ params: `/${id}` });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const WebAppSingleLiveChannel = async (params: any) => {
  const id = params.params.id || redirect("/app/explore/");
  const singleLiveData = await getSingleLiveData({ id });
  // console.log(singleLiveData, "live channel data");
  return (
    <div className="w-full h-full overflow-y-auto px-10 py-6">
      <div className="w-full h-full flex flex-col items-stretch gap-6">
        <SubSectionHeader name={`Live Channel`} />
        <div className="flex flex-col items-stretch gap-5">
          <div className="w-full aspect-video">
            <HLSPlayer src={`${singleLiveData?.data.link}`} />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative rounded-2xl overflow-hidden h-[80px] w-[120px]">
              <Image src={`${singleLiveData?.data.thumbnail}`} alt="" fill />
            </div>
            <div>{singleLiveData?.data.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebAppSingleLiveChannel;
