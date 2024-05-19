import { PICTURE_ICON } from "@/components/SVG/svgs";
import { DicProperties, Locale } from "@/types/dictionary-types";
import Image from "next/image";
import Link from "next/link";

const ExploreMostViewd = ({
  mostViewedImages,
  dic,
  lang,
}: {
  mostViewedImages: any[];
  dic: DicProperties;
  lang: Locale;
}) => {
  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <PICTURE_ICON />
          <p className="text-white font-semibold lg:font-normal lg:text-sm">
            {dic.homepage.mostViewedImages}
          </p>
        </div>
        {/* <div className="text-[14px] text-[#597AFF]">
          {dic.generalApp.viewAll}
        </div> */}
      </div>
      <div className="grid grid-rows-3 grid-cols-3 grid-flow-row gap-2">
        {mostViewedImages?.slice(0, 6)?.map((items: any, index: number) => {
          return (
            <Link
              href={`/${lang}/app/assets/image/${items.name.replaceAll(
                " ",
                "-"
              )}?id=${items.id}`}
              key={items.id}
              className={`relative overflow-hidden rounded-lg w-full aspect-square ${
                index === 1 ? " col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                className="object-cover"
                src={items.thumbnails["336x366"]}
                alt={items.name}
                fill
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMostViewd;
