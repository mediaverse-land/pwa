import { PICTURE_ICON } from "@/components/SVG/svgs";
import Image from "next/image";
import Link from "next/link";

// const imageData = [
//   {
//     asset: {
//       thumbnails: {
//         "336x366": "/images/car.png",
//       },
//     },
//   },
//   {
//     asset: {
//       thumbnails: {
//         "336x366": "/images/car.png",
//       },
//     },
//   },
//   {
//     asset: {
//       thumbnails: {
//         "336x366": "/images/car.png",
//       },
//     },
//   },
//   {
//     asset: {
//       thumbnails: {
//         "336x366": "/images/car.png",
//       },
//     },
//   },
//   {
//     asset: {
//       thumbnails: {
//         "336x366": "/images/car.png",
//       },
//     },
//   },
//   {
//     asset: {
//       thumbnails: {
//         "336x366": "/images/car.png",
//       },
//     },
//   },
// ];

const ExploreMostViewd = ({
  mostViewedImages,
}: {
  mostViewedImages: any[];
}) => {
  // console.log(mostViewedImages);
  return (
    <div className="flex items-stretch flex-col gap-4">
      {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <PICTURE_ICON />
          <p className="text-white text-sm ">Most Viewed</p>
        </div>
        <div className="text-[14px] text-[#597AFF]">View all</div>
      </div>
      <div className="grid grid-rows-3 grid-cols-3 grid-flow-row gap-2">
        {mostViewedImages.slice(0, 6).map((items: any, index: number) => {
          return (
            <Link
              href={`/explore?section=explore&content=asset-single-page&name=${items.name}&id=${items.id}&type=image`}
              key={items.id}
              className={`relative overflow-hidden rounded-lg w-full aspect-square ${
                index === 1 ? " col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                className="object-cover"
                src={items.asset.thumbnails["336x366"]}
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
