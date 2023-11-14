import { BACK_ICON, SEARCH_SETTING_ICON } from "@/components/SVG/svgs";
import Link from "next/link";
import { ExploreSectionNavs } from "../Explore";
import { getSearch } from "@/services/contactService";
import {
  SearchForAll,
  SearchForAudios,
  SearchForImages,
  SearchForTexts,
  SearchForVideos,
} from "./SearchTypes";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SecondSearchForm from "./SecondSearchForm";

const SearchSectionResultFrom = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const searchQuery = searchParams.q;
  const plan = searchParams.plan;
  const tag = searchParams.tag;
  const dataType = searchParams.type || ExploreSectionNavs[0].link;

  const searchResultsComponents: {
    [key: string]: {
      component: JSX.Element;
    };
  } = {
    all: {
      component: <SearchForAll searchParams={searchParams} />,
    },
    images: {
      component: <SearchForImages searchParams={searchParams} />,
    },
    videos: {
      component: <SearchForVideos searchParams={searchParams} />,
    },
    audios: {
      component: <SearchForAudios searchParams={searchParams} />,
    },
    texts: {
      component: <SearchForTexts searchParams={searchParams} />,
    },
  };
  return (
    <div className="h-full flex flex-col items-stretch overflow-y-auto">
      <div className="pl-6 pr-4 pt-4 flex flex-col items-stretch justify-between bg-[rgba(78,78,97,0.50)] backdrop-blur gap-4">
        {/* input section */}
        <div className="flex items-center h-[40px]">
          <div className="mr-6">
            <Link href={`/explore?section=explore&content=search`}>
              <BACK_ICON fill="#666680" />
            </Link>
          </div>
          <div className="bg-[rgba(14,14,18,0.20)] h-full border border-[#353542] rounded-lg px-4 py-3 flex items-center justify-between grow mr-4">
            <SecondSearchForm searchParams={searchParams} />
          </div>
          <div className="rounded-lg p-2 aspect-square border border-[#353542] bg-[rgba(14,14,18,0.20)] h-full">
            <SEARCH_SETTING_ICON
              style={{
                width: "100%",
                height: "100%",
              }}
              fill="#666680"
            />
          </div>
        </div>
        {/* nav */}
        <div className="flex justify-around w-full">
          {ExploreSectionNavs.map((item) => (
            <Link
              key={item.id}
              href={`/explore?section=explore&content=search&q=${searchQuery}&type=${
                item.link
              }${plan ? `&plan=${plan}` : ""}${tag ? `&tag=${tag}` : ""}`}
            >
              <div
                className={`relative after:bg-[#597AFF] after:m-auto after:absolute after:left-0 after:rounded-full after:bottom-0 after:origin-center px-2 py-2 after:content-[''] flex items-center justify-between h-full ${
                  dataType === item.link
                    ? "after:w-full after:h-[1px]"
                    : "after:w-[0%] after:h-[1px]"
                }`}
              >
                {dataType === item.link ? item.active_icon : item.inactive_icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {searchResultsComponents[dataType]?.component ||
          redirect("/explore?section=explore&content=search")}
      </div>
    </div>
  );
};

export default SearchSectionResultFrom;
