import {
  SearchForAll,
  SearchForAudios,
  SearchForImages,
  SearchForTexts,
  SearchForVideos,
} from "@/components/ExplorePageComponents/SearchSectionComponents/SearchTypes";
import SecondSearchForm from "@/components/ExplorePageComponents/SearchSectionComponents/SecondSearchForm";
import {
  AUDIO_ICON,
  BACK_ICON,
  PICTURE_ICON,
  SEARCH_SETTING_ICON,
  TEXT_ICON,
  VIDEO_ICON,
} from "@/components/SVG/svgs";
import { Locale } from "@/types/dictionary-types";
import Link from "next/link";
import { redirect } from "next/navigation";
type IExploreSearchResultNav = {
  id: number;
  name: string;
  link: string;
  active_icon?: JSX.Element;
  inactive_icon?: JSX.Element;
  component?: JSX.Element;
};
const ExploreSearchResultNav: IExploreSearchResultNav[] = [
  {
    id: 1,
    name: "All",
    link: "all",
    active_icon: <span className="text-[14px] text-[#D9D9FF]">All</span>,
    inactive_icon: <span className="text-[#666680] text-[14px]">All</span>,
  },
  {
    id: 2,
    name: "Images",
    link: "images",
    active_icon: <PICTURE_ICON />,
    inactive_icon: <PICTURE_ICON fill="#666680" />,
  },
  {
    id: 3,
    name: "Videos",
    link: "videos",
    active_icon: <VIDEO_ICON />,
    inactive_icon: <VIDEO_ICON fill="#666680" />,
  },
  {
    id: 4,
    name: "Audios",
    link: "audios",
    active_icon: <AUDIO_ICON />,
    inactive_icon: <AUDIO_ICON fill="#666680" />,
  },
  {
    id: 5,
    name: "Texts",
    link: "texts",
    active_icon: <TEXT_ICON />,
    inactive_icon: <TEXT_ICON fill="#666680" />,
  },
];

const SearchSectionResultFrom = async ({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: {
    [key: string]: string;
  };
}) => {
  const searchQuery = searchParams.q;
  const plan = searchParams.plan;
  const tag = searchParams.tag;
  const dataType = searchParams.type || ExploreSearchResultNav[0].link;

  const searchResultsComponents: {
    [key: string]: {
      component: JSX.Element;
    };
  } = {
    all: {
      component: <SearchForAll params={params} searchParams={searchParams} />,
    },
    images: {
      component: (
        <SearchForImages params={params} searchParams={searchParams} />
      ),
    },
    videos: {
      component: (
        <SearchForVideos params={params} searchParams={searchParams} />
      ),
    },
    audios: {
      component: (
        <SearchForAudios params={params} searchParams={searchParams} />
      ),
    },
    texts: {
      component: <SearchForTexts params={params} searchParams={searchParams} />,
    },
  };
  return (
    <div className="h-full flex flex-col items-stretch overflow-y-auto">
      <div className="pl-6 pr-4 pt-4 flex flex-col items-stretch justify-between bg-[rgba(78,78,97,0.50)] backdrop-blur gap-4 rounded-md">
        {/* input section */}
        <div className="flex items-center h-[40px]">
          <div className="mr-6">
            <Link href={`/${params.lang}/app/explore/search-form`}>
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
          {ExploreSearchResultNav.map((item) => (
            <Link
              key={item.id}
              href={`/${
                params.lang
              }/app/explore/search-result?q=${searchQuery}&type=${item.link}${
                plan ? `&plan=${plan}` : ""
              }${tag ? `&tag=${tag}` : ""}`}
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
          redirect(`/${params.lang}/app/explore/search-form`)}
      </div>
    </div>
  );
};

export default SearchSectionResultFrom;
