import { CIRCLE_VIDEO_ICON, VIDEO_ICON } from "@/components/SVG/svgs";
import Image from "next/image";
import "./styles.css";

const ExploreVideoCard = ({
  author,
  description,
  image,
  time,
  title,
}: {
  image: string;
  title: string;
  description: string;
  author: string;
  time: string;
}) => {
  return (
    <div className="flex flex-col items-stretch gap-3">
      <div
        className={`relative overflow-hidden rounded-lg w-full aspect-video min-h-[132px]`}
      >
        {/* overlay */}
        <div className="absolute left-0 top-0 w-full h-full video-overlay-bg z-20"></div>
        <Image className="z-10" src={image} alt={title} fill />
        <div className="flex items-center justify-center absolute inset-0 m-auto z-30">
          <CIRCLE_VIDEO_ICON
            fill="#8A8AE5"
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </div>
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

export default ExploreVideoCard;
