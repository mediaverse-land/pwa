import { getLives } from "@/services/contactService";
import { DicProperties, Locale } from "@/types/dictionary-types";
import Image from "next/image";
import Link from "next/link";

export const ExploreLiveChannel = ({
  liveData,
  dic,
  lang,
}: {
  liveData: any;
  dic: DicProperties;
  lang: Locale;
}) => {
  return (
    <div className="flex items-stretch flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative overflow-hidden w-[30px] h-[26px] lg:w-[20px] lg:h-[20px]">
            <Image
              src="/icons/live-icon.png"
              quality={100}
              fill
              alt="camera icon"
            />
          </div>
          <p className="text-white font-semibold lg:font-normal lg:text-sm">
            {dic.homepage.liveTvChannels}
          </p>
        </div>
        <Link
          href={`/${lang}/app/lives`}
          className="text-[14px] text-[#597AFF]"
        >
          {dic.generalApp.viewAll}
        </Link>
      </div>
      <div className="">
        <div className="flex w-full">
          <div className="flex w-full overflow-x-auto items-center">
            {liveData?.map((item: any, i: number) => (
              <Link
                href={`/${lang}/app/lives/${item.id}`}
                key={i}
                className="relative rounded-[8px] min-w-[110px] lg:min-w-[190px] lg:w-[190px] lg:h-[125px] min-h-[72px] lg:min-h-[190px] mr-[8px] overflow-hidden"
              >
                <Image className="" src={item.thumbnail} alt="" fill />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
