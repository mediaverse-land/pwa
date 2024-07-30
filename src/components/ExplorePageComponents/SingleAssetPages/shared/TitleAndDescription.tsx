import { imagePlaceHolders } from "@/configs/base";
import { secondsToHMS } from "@/lib/convertSecondsToHMS";
import Image from "next/image";

const AssetSinglePageTitleAndDescription = ({
  title,
  description,
  author,
  time,
}: {
  title: string;
  description: string;
  author: {
    image: string;
    name: string;
  };
  time?: number;
}) => {
  return (
    <div className="flex flex-col items-stretch gap-2">
      {/* title */}
      <div className="text-[18px] text-white font-bold">{title}</div>
      {/* desc and auth */}
      <div className="flex flex-col items-stretch">
        <div className="text-[#A2A2B5]">{description}</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-2 mr-auto">
            <div className="relative w-[18px] h-[18px] aspect-square overflow-hidden rounded-full">
              {author.image ? (
                <Image
                  src={`${author?.image || imagePlaceHolders.image}`}
                  alt={`${author.name}`}
                  fill
                />
              ) : (
                <div className="w-full h-full bg-white"></div>
              )}
            </div>
            <div>{author.name}</div>
          </div>
          {time && (
            <div className="text-[14px] text-[#666680]">
              {secondsToHMS(time)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetSinglePageTitleAndDescription;
