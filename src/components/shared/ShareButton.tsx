"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButton = ({ url }: { url: string }) => {
  return (
    <div className="flex items-center flex-wrap gap-4">
      <WhatsappShareButton url={url}>
        <WhatsappIcon
          round
          bgStyle={{
            display: "none",
          }}
          size={36}
        />
      </WhatsappShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon
          round
          pathLength={100}
          bgStyle={{
            display: "none",
          }}
          size={36}
        />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon
          round
          pathLength={100}
          bgStyle={{
            display: "none",
          }}
          size={36}
        />
      </TwitterShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon
          round
          pathLength={100}
          bgStyle={{
            display: "none",
          }}
          size={36}
        />
      </TelegramShareButton>
    </div>
  );
};

export default ShareButton;
