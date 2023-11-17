import { BACK_ICON, PLAY, VIDEO_ICON } from "@/components/SVG/svgs";
import { getSingleImage } from "@/services/contactService";
import Image from "next/image";
import ImageSinglePage from "./ImageSinglePage";
import { redirect } from "next/navigation";
import VideoSinglePage from "./VideoSinglePage";
import TextSinglePage from "./TextSinglePage";
import AudioSinglePage from "./AudioSinglePage";

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
    video: {
      component: <VideoSinglePage searchParams={searchParams} />,
    },
    text: {
      component: <TextSinglePage searchParams={searchParams} />,
    },
    audio: {
      component: <AudioSinglePage searchParams={searchParams} />,
    },
  };
  return (
    componentType[pageType]?.component || redirect("/explore?section=explore")
  );
};

export default AssetSinglePage;
