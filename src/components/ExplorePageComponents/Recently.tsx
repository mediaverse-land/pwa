import { redirect } from "next/navigation";
import { BACK_ICON } from "../SVG/svgs";
import Link from "next/link";
const allowedContent = ["images", "videos", "texts", "audios"];

const ExploreRecently = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const content = searchParams.content || allowedContent[0];
  if (!content || !allowedContent.find((item) => item === content)) {
    redirect("/explore?section=explore&content=all");
  }
  //   console.log(searchParams.content);
  return (
    <div className="flex flex-col items-stretch gap-8 px-6 py-10">
      <div className="flex items-center">
        <Link href={`/explore?section=explore`} className="mr-auto">
          <BACK_ICON fill="#666680" />
        </Link>
        <div className="grow text-center font-semibold">Recently</div>
      </div>
      <div></div>
    </div>
  );
};

export default ExploreRecently;
