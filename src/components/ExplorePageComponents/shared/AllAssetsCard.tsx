import {
  AUDIO_ICON,
  PICTURE_ICON,
  TEXT_ICON,
  VIDEO_ICON,
} from "@/components/SVG/svgs";
import Image from "next/image";
import "./styles.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/data/Auth";
import { Locale } from "@/types/dictionary-types";
import { imagePlaceHolders } from "@/configs/base";

const icons: { [key: string]: JSX.Element } = {
  video: <VIDEO_ICON fill="#83839C" />,
  image: <PICTURE_ICON fill="#83839C" />,
  audio: <AUDIO_ICON fill="#83839C" />,
  text: <TEXT_ICON fill="#83839C" />,
};

const ExploreAssetsCard = async ({
  cover,
  author,
  title,
  type,
  id,
  ownershipcard = false,
  lang,
}: {
  cover?: string;
  lang: Locale;
  id: number;
  ownershipcard?: boolean;
  type?: "video" | "image" | "text" | "audio";
  title?: string;
  author?: {
    picture?: string;
    name?: string;
  };
}) => {
  const session = await getServerSession(authOptions);
  const authorImage = () => {
    if (ownershipcard) {
      if (session?.user?.image) {
        return (
          <Image
            className="object-cover"
            src={`${session?.user?.image}`}
            alt={`${session?.user?.lastName}`}
            fill
          />
        );
      } else {
        return (
          <Image
            className="object-cover"
            src={`${imagePlaceHolders.account}`}
            alt={``}
            fill
          />
        );
      }
    } else {
      if (author?.picture) {
        return (
          <Image
            className="object-cover"
            src={`${author?.picture}`}
            alt={`${author?.name}`}
            fill
          />
        );
      } else {
        return (
          <Image
            className="object-cover"
            src={`${imagePlaceHolders.account}`}
            alt={``}
            fill
          />
        );
      }
    }
  };

  return (
    <Link
      href={`/${lang}/app/assets/${type}/${title?.replaceAll(
        " ",
        "-"
      )}?id=${id}`}
      className="flex flex-col items-stretch gap-4 min-w-[140px] lg:min-w-[190px] overflow-hidden max-w-full"
    >
      {/* image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
        <Image
          className="z-10 object-cover"
          src={`${cover || imagePlaceHolders[type || "image"]}`}
          alt=""
          fill
        />

        <div className="overlay-bg absolute w-full h-full top-0 left-0 z-20"></div>
        <div className="flex items-center justify-center absolute bottom-[15px] right-[15px] z-30">
          {icons[`${type}`]}
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col gap-2 items-stretch">
        {/* title */}
        <div className="line-clamp-1 text-[#666680] w-full max-w-full overflow-hidden break-words">
          {title || "Tiger love..."}
        </div>
        {/* author */}
        <div className="flex items-center gap-2">
          <div className="relative w-[16px] h-[16px] rounded-full overflow-hidden">
            {authorImage()}
          </div>
          <div className="text-[12px] text-[#666680] line-clamp-1 leading-3 break-words">
            {ownershipcard
              ? `${session?.user?.firstName} ${session?.user?.lastName}`
              : author?.name || ""}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExploreAssetsCard;
