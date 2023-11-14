import {
  AUDIO_ICON,
  PICTURE_ICON,
  TEXT_ICON,
  VIDEO_ICON,
} from "@/components/SVG/svgs";
import Image from "next/image";
import "./styles.css";

const icons: { [key: string]: JSX.Element } = {
  video: <VIDEO_ICON fill="#83839C" />,
  image: <PICTURE_ICON fill="#83839C" />,
  audio: <AUDIO_ICON fill="#83839C" />,
  text: <TEXT_ICON fill="#83839C" />,
};

const ExploreAssetsCard = ({
  cover,
  author,
  title,
  type,
}: {
  cover?: string;
  type?: "video" | "image" | "text" | "audio";
  title?: string;
  author?: {
    picture?: string;
    name?: string;
  };
}) => {
  return (
    <div className="flex flex-col items-stretch gap-4 min-w-[190px] overflow-hidden max-w-full">
      {/* image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
        {cover ? (
          <Image
            className="z-10 object-cover"
            src={`${cover || "/images/car.png"}`}
            alt=""
            fill
          />
        ) : (
          <div className="w-full h-full bg-slate-400 relative">
            <Image src={`/images/no.png`} alt="no image" fill />
          </div>
        )}
        <div className="overlay-bg absolute w-full h-full top-0 left-0 z-20"></div>
        <div className="flex items-center justify-center absolute bottom-[15px] right-[15px] z-30">
          {icons[`${type}`]}
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col gap-2 items-stretch">
        {/* title */}
        <div className="line-clamp-1 text-[#666680] leading-none max-w-full overflow-hidden">
          {title || "Tiger love..."}
        </div>
        {/* author */}
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
      </div>
    </div>
  );
};

export default ExploreAssetsCard;
