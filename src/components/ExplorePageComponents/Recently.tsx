import { redirect } from "next/navigation";
import { RecentlyAudio } from "./ExploreAssetsComponents/AudioAssets";
import { RecentlyImages } from "./ExploreAssetsComponents/ImageAssets";
import { RecentlyTexts } from "./ExploreAssetsComponents/TextsAssets";
import { RecentlyVideos } from "./ExploreAssetsComponents/VideoAssets";
import Link from "next/link";
import { BACK_ICON } from "../SVG/svgs";

const allowedType = ["images", "videos", "texts", "audios"];
const RecentlyComponent = [
  {
    id: 1,
    name: "images",
    component: <RecentlyImages />,
  },
  {
    id: 2,
    name: "videos",
    component: <RecentlyVideos />,
  },
  {
    id: 3,
    name: "texts",
    component: <RecentlyTexts />,
  },
  {
    id: 4,
    name: "audios",
    component: <RecentlyAudio />,
  },
];

const ExploreRecently = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const type = searchParams.type || allowedType[0];
  if (!type || !allowedType.find((item) => item === type)) {
    redirect("/explore?section=explore&content=all");
  }
  //   console.log(searchParams.content);
  return (
    <div className="flex flex-col items-stretch gap-8 px-10 py-10">
      <div className="flex items-center">
        <Link
          href={`/explore?section=explore&content=${
            RecentlyComponent.find((item) => item.name === type)?.name
          }`}
          className="mr-auto"
        >
          <BACK_ICON fill="#666680" />
        </Link>
        <div className="grow text-center font-semibold">Recently</div>
      </div>
      <div>
        {RecentlyComponent.find((item) => item.name === type)?.component}
      </div>
    </div>
  );
};

export default ExploreRecently;
