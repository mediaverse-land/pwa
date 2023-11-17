import { BACK_ICON, PLAY, VIDEO_ICON } from "@/components/SVG/svgs";
import { getSingleImage } from "@/services/contactService";
import Image from "next/image";
import ImageSinglePage from "./ImageSinglePage";
import { redirect } from "next/navigation";

const AssetSinglePage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const pageType = searchParams.type || "image";
  const componentType: {
    [key: string]: {
      component: JSX.Element;
    };
  } = {
    image: {
      component: <ImageSinglePage searchParams={searchParams} />,
    },
  };
  return (
    componentType[pageType].component || redirect("/explore?section=explore")
  );
};

export default AssetSinglePage;
