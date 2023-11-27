import Image from "next/image";
import Link from "next/link";
import {
  getMostViewedImages,
  getRecentlyImages,
} from "@/services/contactService";
import ExploreSearchAndNavSection from "@/components/ExplorePageComponents/ExploreAssetsComponents/SearchAndNavSection";
import ExploreAssetsCard from "@/components/ExplorePageComponents/shared/AllAssetsCard";
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

const getMostViewedImagesData = async () => {
  const liveData = await getMostViewedImages();
  if (liveData.ok) {
    return liveData.json();
  }
};
const getRecentlyImagesData = async () => {
  const liveData = await getRecentlyImages();
  if (liveData.ok) {
    return liveData.json();
  }
};

const WebAppImageAssets = async () => {
  const [mostViewedImages] = await Promise.all([getMostViewedImagesData()]);
  return (
    <div className="w-full overflow-y-auto">
      <ExploreSearchAndNavSection activeTab={"Images"} />
      <div className="flex flex-col items-stretch gap-6 py-6 px-10">
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
                {mostViewedImages.slice(0, 10).map((item: any) => (
                  <ExploreAssetsCard
                    key={item.id}
                    id={item.id}
                    type="image"
                    cover={item.asset.thumbnails["336x366"]}
                    title={item.name}
                    author={{
                      name: item.asset.user.username,
                      picture: item.asset.user.image_url,
                    }}
                  />
                ))}
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
              href={`/explore?section=explore&content=recently&type=images`}
              className="text-[14px] text-[#597AFF]"
            >
              View all
            </Link>
          </div>
          <RecentlyImages />
        </div>
      </div>
    </div>
  );
};

export default WebAppImageAssets;

export const RecentlyImages = async () => {
  const data = await getRecentlyImagesData();
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2 [&_>_*:nth-child(6n+2)]:col-span-2 [&_>_*:nth-child(6n+2)]:row-span-2">
      {data.map((items: any, index: number) => {
        return (
          <Link
            href={`/explore?section=explore&content=asset-single-page&name=${items.name}&id=${items.id}&type=image`}
            key={items.id}
            className={`relative overflow-hidden rounded-lg w-full aspect-square `}
          >
            <Image
              src={items.asset.thumbnails["336x366"]}
              alt={items.name}
              fill
            />
          </Link>
        );
      })}
    </div>
  );
};
