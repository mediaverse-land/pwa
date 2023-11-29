import { CIRCLE_VIDEO_ICON, VIDEO_ICON } from "@/components/SVG/svgs";
import Image from "next/image";
import "./styles.css";
import { secondsToHMS } from "@/lib/convertSecondsToHMS";
import Link from "next/link";

const ExploreVideoCard = ({
  author,
  description,
  image,
  time,
  title,
  id,
}: {
  image: string;
  title: string;
  description: string;
  id: number;
  author: {
    picture: string | null | undefined;
    name: string | null | undefined;
  };
  time: number;
}) => {
  return (
    <Link
      href={`/web-app/assets/video/${title}?id=${id}`}
      className="flex flex-col items-stretch gap-3"
    >
      <div
        className={`relative overflow-hidden rounded-lg w-full aspect-video min-h-[145px]`}
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
      <div className="flex flex-col gap-3 leading-none mt-auto">
        <div className="grow line-clamp-2 text-[12px] text-[#666680] leading-tight">
          {description}
        </div>
        <div className="flex justify-between text-[12px] text-[#666680] mt-auto">
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
              {author?.name}
            </div>
          </div>
          <div>{secondsToHMS(time)}</div>
        </div>
      </div>
    </Link>
  );
};

export default ExploreVideoCard;
