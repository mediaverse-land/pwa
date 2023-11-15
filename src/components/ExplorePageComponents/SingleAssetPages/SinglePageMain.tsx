import { BACK_ICON, PLAY, VIDEO_ICON } from "@/components/SVG/svgs";
import Image from "next/image";

const AssetSinglePage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
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
          {/* title */}
          <div className="text-[18px] text-white font-bold">
            Model clothes are expensive
          </div>
          {/* desc and auth */}
          <div className="flex flex-col items-stretch">
            <div className="text-[#A2A2B5]">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat. more...
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 mr-auto">
                <div>image</div>
                <div>name</div>
              </div>
              <div className="text-[14px] text-[#666680]">08:15</div>
            </div>
          </div>
          {/* genrel info */}
          <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-2">
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#A2A2B5]">Genre</div>
              <div className="h-[70%] w-[1px] bg-[#A2A2B5]"></div>
              <div className="text-white font-semibold grow text-center">
                Sci-fi
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#A2A2B5]">Genre</div>
              <div className="h-[70%] w-[1px] bg-[#A2A2B5]"></div>
              <div className="text-white font-semibold grow text-center">
                Sci-fi
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-[#666680] px-4 py-1 gap-4">
              <div className="text-[12px] text-[#A2A2B5]">Genre</div>
              <div className="h-[70%] w-[1px] bg-[#A2A2B5]"></div>
              <div className="text-white font-semibold grow text-center">
                Sci-fi
              </div>
            </div>
          </div>
        </div>
        {/* files */}
        <div className="p-8 flex flex-col items-stretch gap-6 bg-[rgba(78,78,97,0.20)] rounded-2xl">
          <div className="text-white font-semibold">Files</div>
          <div className="flex flex-col items-stretch gap-2">
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.20)] px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.20)] px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.20)] px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.20)] px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
            <div className="flex items-center rounded-lg bg-[rgba(78,78,97,0.20)] px-6 py-4">
              <div className="text-white mr-auto">chapter</div>
              <div className="text-[12px] text-[#666680]">10:50</div>
            </div>
          </div>
        </div>
        {/* coment */}
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default AssetSinglePage;
