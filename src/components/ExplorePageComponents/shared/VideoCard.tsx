import { CIRCLE_VIDEO_ICON } from "@/components/SVG/svgs";
import { imagePlaceHolders } from "@/configs/base";
import { secondsToHMS } from "@/lib/convertSecondsToHMS";
import { Locale } from "@/types/dictionary-types";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";

const ExploreVideoCard = ({
  author,
  description,
  image,
  time,
  title,
  lang,
  id,
}: {
  lang: Locale;
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
      href={`/${lang}/app/assets/video/${title.replaceAll(" ", "-")}?id=${id}`}
      className="flex flex-col items-stretch gap-3"
    >
      <div
        className={`relative overflow-hidden rounded-lg w-full aspect-video min-h-[145px]`}
      >
        {/* overlay */}
        <div className="absolute left-0 top-0 w-full h-full video-overlay-bg z-20"></div>
        <Image className="z-10 object-cover" src={image} alt={title} fill />
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
              <Image
                className="object-cover"
                src={`${author?.picture || imagePlaceHolders.account}`}
                alt={`${author?.name}`}
                fill
              />
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
