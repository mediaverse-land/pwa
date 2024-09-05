import SubSectionHeader from "@/components/ExplorePageComponents/shared/SubSectionHeader";
import { imagePlaceHolders } from "@/configs/base";
import { getDictionary } from "@/dictionary";
import { getRecentlyImages } from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";
import Image from "next/image";
import Link from "next/link";

const getRecentlyImagesData = async () => {
  const liveData = await getRecentlyImages();
  return {
    data: await liveData.json(),
    status: liveData.status,
  };
};
const WebAppRecentlyImages = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const data = await getRecentlyImagesData();
  const dic = await getDictionary(lang);
  return (
    <div className="h-full w-full p-4 lg:p-10 overflow-y-auto">
      <SubSectionHeader name={dic.generalApp.recently} />
      <div className="grid grid-cols-3 grid-flow-row gap-2 mt-8 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2">
        {data?.data?.data?.map((items: any, index: number) => {
          return (
            <Link
              href={`/${lang}/app/assets/image/${items?.media?.slug}?id=${items.id}`}
              key={items.id}
              className={`relative overflow-hidden rounded-lg w-full aspect-square `}
            >
              <Image
                className="object-cover"
                src={items.thumbnails["336x366"] || imagePlaceHolders.image}
                alt={items.media.name}
                fill
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WebAppRecentlyImages;
