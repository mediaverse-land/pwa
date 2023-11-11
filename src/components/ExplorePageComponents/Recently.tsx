import { redirect } from "next/navigation";

const ExploreRecently = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const content = searchParams.content;
  if (!content) {
    redirect("/explore?section=explore&content=all");
  }
  //   console.log(searchParams.content);
  return <div></div>;
};

export default ExploreRecently;
