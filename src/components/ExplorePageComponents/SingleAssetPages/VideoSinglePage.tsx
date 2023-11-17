import { BACK_ICON, PLAY, VIDEO_ICON } from "@/components/SVG/svgs";
import { getSingleImage } from "@/services/contactService";
import Image from "next/image";
import { redirect } from "next/navigation";
import AssetSinglePageTitleAndDescription from "./shared/TitleAndDescription";

const getSingleImageData = async (id: string) => {
  try {
    const req = await getSingleImage({ id });
    if (req.ok) {
      const res = await req.json();
      return res;
    } else {
      if (req.status === 404) {
        return "not-found";
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const VideoSinglePage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const assetID = searchParams.id || "0";
  const singleImageData = await getSingleImageData(assetID);
  if (singleImageData === "not-found") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Page Not Found
      </div>
    );
  }
  return (
    <div className="flex flex-col items-stretch h-full overflow-y-auto">
      {/* top section */}
      <div className="rounded-b-2xl h-[450px] min-h-[450px] relative overflow-hidden">
        {/* overlay */}
        <div
          style={{
            background: `linear-gradient(0deg, rgba(11, 11, 49, 0.70) -19.12%, rgba(11, 11, 50, 0.00) 83.82%)`,
          }}
          className="absolute w-full h-full z-20"
        ></div>
        {/* asset */}
        <div className="relative w-full h-full overflow-hidden z-10">
          <Image className="" src={`/images/single-asset.png`} alt="" fill />
        </div>
        {/* back */}
        <div className="absolute z-30 left-10 top-10">
          <BACK_ICON fill="#597AFF" />
        </div>
        {/* icon */}
        <div className="absolute z-30 left-10 bottom-10">
          <VIDEO_ICON />
        </div>
        {/* play */}
        <div className="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <PLAY fill="#597AFF" />
        </div>
      </div>
      {/* content */}
      <div className="py-8 px-10 flex flex-col items-stretch gap-6">
        {/* info */}
        <div className="flex flex-col items-stretch gap-2">
          <AssetSinglePageTitleAndDescription
            author={{
              image: singleImageData.asset.user.image_url,
              name: singleImageData.asset.user.username,
            }}
            description={singleImageData.description}
            title={singleImageData.name}
          />
          {/* genrel info */}
          <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-2">
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Genre</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center">
                Sci-fi
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Genre</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center">
                Sci-fi
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#666680]">Genre</div>
              <div className="h-[70%] w-[1px] bg-[#666680]"></div>
              <div className="text-white text-[14px] grow text-center">
                Sci-fi
              </div>
            </div>
          </div>
        </div>
        {/* files */}
        <div className="p-8 flex flex-col items-stretch gap-6 bg-[rgba(78,78,97,0.30)] backdrop-blur-sm rounded-2xl">
          <div className="text-white font-semibold">Files</div>
          <div className="flex flex-col items-stretch gap-2">
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.30)] backdrop-blur-md px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
          </div>
        </div>
        {/* comment */}
        <div className="p-8 rounded-2xl bg-[rgba(78,78,97,0.30)] backdrop-blur-sm flex flex-col items-stretch justify-between leading-none gap-6 select-none cursor-pointer">
          <div className="flex items-center">
            <div className="mr-auto text-[14px] text-white font-semibold">
              Comments
            </div>
            <div className="text-[14px] text-[#666680]">56</div>
          </div>
          <div className="flex items-center gap-4">
            <div>image</div>
            <div className="rounded-lg bg-[rgba(28,28,35,0.75)] text-[#666680] text-[14px] px-4 py-3 grow">
              Add a comment...
            </div>
          </div>
        </div>
      </div>
      {/* buy */}
      <div className="px-10 py-8 flex flex-col items-stretch justify-between gap-8 rounded-t-2xl bg-[rgba(78,78,97,0.75)] backdrop-blur-md">
        <div className="flex flex-col items-stretch gap-4">
          <div className="flex items-center justify-between border border-[#666680] px-6 py-4 rounded-lg bg-[rgba(78,78,97,0.50)] backdrop-blur-md">
            <div className="flex items-center gap-4 mr-auto leading-4">
              <div className="text-[#CCCCFF]">Ownership</div>
              <div className="text-white font-semibold">150 $</div>
            </div>
            <div className="w-[18px] aspect-square border border-[#CCCCFF] rounded-full"></div>
          </div>
          <div className="flex items-center justify-between border border-[#666680] px-6 py-4 rounded-lg bg-[rgba(78,78,97,0.50)] backdrop-blur-md">
            <div className="flex items-center gap-4 mr-auto leading-4">
              <div className="text-[#CCCCFF]">Ownership</div>
              <div className="text-white font-semibold">150 $</div>
            </div>
            <div className="w-[18px] aspect-square border border-[#CCCCFF] rounded-full"></div>
          </div>
        </div>
        <div className="rounded-full text-white text-center font-semibold bg-[#597AFF] py-2">
          Buy
        </div>
      </div>
    </div>
  );
};

export default VideoSinglePage;
