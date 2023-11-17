import {
  AUDIO_ICON,
  CIRCLE_VIDEO_ICON,
  VIDEO_ICON,
} from "@/components/SVG/svgs";
import Image from "next/image";
import "./styles.css";
import { secondsToHMS } from "@/lib/convertSecondsToHMS";
import Link from "next/link";

const ExploreAudioCard = ({
  author,
  description,
  image,
  time,
  title,
  id,
}: {
  image?: string;
  title: string;
  description: string;
  id: number;
  author: {
    picture: string;
    name: string;
  };
  time: number;
}) => {
  return (
    <Link
      href={`/explore?section=explore&content=asset-single-page&name=${title}&id=${id}&type=audio`}
      className="flex flex-col items-stretch gap-3"
    >
      <div
        className={`relative overflow-hidden rounded-2xl w-full aspect-square`}
      >
        {/* overlay */}
        {image && image?.length > 0 ? (
          <>
            <div className="absolute left-0 top-0 w-full h-full audio-overlay z-20"></div>
            <Image className="z-10 object-cover" src={image} alt={title} fill />
          </>
        ) : (
          <div className="absolute left-0 top-0 w-full h-full z-20">
            <Image
              className="z-10 object-cover"
              src={"/images/no-cover.png"}
              alt={title}
              fill
            />
            <div className="flex items-center justify-center absolute inset-0 m-auto z-30">
              <AUDIO_ICON
                style={{
                  width: "30px",
                  height: "27px",
                }}
              />
            </div>
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col gap-3 leading-none">
        <div className="grow line-clamp-2 text-[12px] text-[#666680] leading-tight">
          {description}
        </div>
        <div className="flex justify-between text-[12px] text-[#666680]">
          <div className="flex items-center gap-2">
            <div className="relative w-[16px] h-[16px] rounded-full overflow-hidden">
              {author?.picture ? (
                <Image
                  className="object-cover"
                  src={`${author?.picture}`}
                  alt={`${author?.name}`}
                  fill
                />
              ) : (
                <div className="bg-white w-full aspect-square overflow-hidden rounded-full"></div>
              )}
            </div>
            <div className="text-[12px] text-[#666680] line-clamp-1 leading-3">
              {author?.name || "Arlene McCoys"}
            </div>
          </div>
          <div>{time && secondsToHMS(time)}</div>
        </div>
      </div>
    </Link>
  );
};

export default ExploreAudioCard;
