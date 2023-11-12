import Image from "next/image";
import ExploreAssetsCard from "../shared/AllAssetsCard";
import Link from "next/link";
const imageData = [
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
  {
    asset: {
      thumbnails: {
        "336x366": "/images/car.png",
      },
    },
  },
];

const ExploreImageAssets = async () => {
  return (
    <div className="flex flex-col items-stretch gap-6 pb-8">
      {/* best in month */}
      <div className="flex items-stretch flex-col gap-4">
        {/* header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <p className="text-white text-sm ">Best in month</p>
          </div>
          <div className="text-[14px] text-[#597AFF]">View all</div>
        </div>
        <div>
          <div className="overflow-x-hidden">
            <div className="flex items-stretch gap-4 overflow-x-auto">
              <ExploreAssetsCard type="image" />
              <ExploreAssetsCard type="image" />
              <ExploreAssetsCard type="image" />
              <ExploreAssetsCard type="image" />
              <ExploreAssetsCard type="image" />
              <ExploreAssetsCard type="image" />
              <ExploreAssetsCard type="image" />
              <ExploreAssetsCard type="image" />
              <ExploreAssetsCard type="image" />
            </div>
          </div>
        </div>
      </div>
      {/* recently */}
      <div className="flex items-stretch flex-col gap-4">
        {/* header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <p className="text-white text-sm ">Recently</p>
          </div>
          <Link
            href={`/explore?section=recently&content=images`}
            className="text-[14px] text-[#597AFF]"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2">
          {imageData.map((items: any, index: number) => {
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg w-full aspect-square `}
              >
                <Image
                  src={items.asset.thumbnails["336x366"]}
                  alt={items.name}
                  fill
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreImageAssets;
