import Image from "next/image";
import "./styles.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/data/Auth";
import { Locale } from "@/types/dictionary-types";
import { imagePlaceHolders } from "@/configs/base";

const ExploreTextCard = async ({ data, lang }: { data: any; lang: Locale }) => {
  const session = await getServerSession(authOptions);
  const authorImage = () => {
    if (!data.user?.image_url) {
      if (session?.user?.image && data.user_id === session.user.id) {
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
      return (
        <Image
          className="object-cover"
          src={`${data.user?.image_url}`}
          alt={`${data.user?.username}`}
          fill
        />
      );
    }
  };
  return (
    <Link
      href={`/${lang}/app/assets/text/${data?.slug}?id=${data.id}`}
      className="max-w-full min-w-full w-full aspect-square block max-h-[154px] lg:max-h-[190px]"
    >
      <div className="text-card w-full h-full px-4 py-6 flex flex-col items-stretch leading-none">
        <div className="text-[#CCCCFF] line-clamp-1 text-[14px] leading-4 break-words">
          {data.name}
        </div>
        <div className="text-[#666680] line-clamp-3 mt-2 mb-3 text-[14px] leading-4">
          {data.description}
        </div>
        <div className="text-[#666680] text-[12px] flex items-center gap-2 mt-auto">
          <div className="relative w-[16px] h-[16px] rounded-full overflow-hidden">
            {authorImage()}
          </div>
          <div className="line-clamp-1 break-words">
            {data?.asset?.user?.username ||
              data?.user?.username ||
              `${session?.user?.firstName} ${session?.user?.lastName}` ||
              ""}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExploreTextCard;
