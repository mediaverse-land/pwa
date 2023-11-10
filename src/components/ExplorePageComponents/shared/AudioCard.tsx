import {
  AUDIO_ICON,
  CIRCLE_VIDEO_ICON,
  VIDEO_ICON,
} from "@/components/SVG/svgs";
import Image from "next/image";
import "./styles.css";

const ExploreAudioCard = ({
  author,
  description,
  image,
  time,
  title,
}: {
  image?: string;
  title: string;
  description: string;
  author: string;
  time: string;
}) => {
  return (
    <div className="flex flex-col items-stretch gap-3">
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
          <div>{author}</div>
          <div>{time}</div>
        </div>
      </div>
    </div>
  );
};

export default ExploreAudioCard;
