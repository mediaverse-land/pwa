import { socialMediaIcons } from "@/types";

export const GTM_ID = process.env.GTM_ID || '';

export const navbar: {
  title: "home" | "blog" | "terms" | "privacy" | "api" | "faq" | "about";
  href: string;
  query: string;
}[] = [
  {
    title: "home",
    href: "",
    query: "",
  },
  {
    title: "blog",
    href: "blogs",
    query: "?page=1",
  },
  {
    title: "terms",
    href: "terms",
    query: "",
  },
  {
    title: "privacy",
    href: "privacy",
    query: "",
  },
  {
    title: "api",
    href: "APIs",
    query: "",
  },
  {
    title: "faq",
    href: "faq",
    query: "",
  },
  {
    title: "about",
    href: "about-us",
    query: "",
  },
];

export const socialMedia: socialMediaIcons[] = [
  {
    name: "X",
    icon: "/icons/x-social-media-black-icon.svg",
  },
  {
    name: "Instagram",
    icon: "/icons/black-instagram-icon.svg",
  },
  {
    name: "Facebook",
    icon: "/icons/meta-black-icon.svg",
  },
  {
    name: "Linkedin",
    icon: "/icons/linkedin-square-icon.svg",
  },
];

export const AssetPurchasePlan: any = {
  1: "Free",
  2: "Ownership",
  3: "Subscribe",
};

export const VideoType: any = {
  1: "Movie",
  2: "Serial",
  3: "Episode",
  4: "Collection",
  5: "Trailer",
  6: "Live",
  7: "VLog",
  8: "Photo Album",
};

export const AssetType = {
  1: "Text",
  2: "Image",
  3: "Sound",
  4: "Video",
  5: "3d",
  6: "Thumbnail",
};
export const AssetCommentStatus = {
  1: "Confirm Requested",
  2: "Accepted",
  3: "Rejected",
};

export const ChannelTypes = {
  1: "Image",
  2: "Sound",
  3: "Text",
};
