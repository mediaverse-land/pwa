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
    <div className="flex flex-col items-stretch gap-4">
      {/* image */}
      <div className="relative w-[143px] h-[143px] rounded-2xl overflow-hidden">
        <Image className="z-10" src={`/images/car.png`} alt="" fill />
        <div className="overlay-bg absolute w-full h-full top-0 left-0 z-20"></div>
        <div className="flex items-center justify-center absolute bottom-[15px] right-[15px] z-30">
          {icons[`${type}`]}
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col gap-2 items-stretch">
        {/* title */}
        <div className="line-clamp-1 text-[#666680] leading-none">
          Tiger love...
        </div>
        {/* author */}
        <div className="">
          <div></div>
          <div className="text-[12px] text-[#666680] line-clamp-1 leading-3">
            Arlene McCoys
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreAssetsCard;
