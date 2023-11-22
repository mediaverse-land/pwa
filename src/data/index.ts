import { socialMediaLinks } from "@/types";

export const navbar = [
  {
    title: "Home",
    href: "/",
    query: "",
  },
  {
    title: "Blog",
    href: "/blogs",
    query: "?page=1",
  },
  {
    title: "Terms",
    href: "/terms",
    query: "",
  },
  {
    title: "Privacy",
    href: "/privacy",
    query: "",
  },
  {
    title: "API",
    href: "/APIs",
    query: "",
  },
  {
    title: "FAQ",
    href: "/faq",
    query: "",
  },
  {
    title: "About",
    href: "/about-us",
    query: "",
  },
];

export const socialMedia: socialMediaLinks[] = [
  {
    id: 1,
    link: "https://x.com/MediaverseLand",
    name: "X",
    icon: "/icons/x-social-media-black-icon.svg",
  },
  {
    id: 2,
    link: "https://instagram.com/mediaverse.land",
    name: "Instagram",
    icon: "/icons/black-instagram-icon.svg",
  },
  {
    id: 3,
    link: "https://www.facebook.com/mediaverse.profile",
    name: "Facebook",
    icon: "/icons/meta-black-icon.svg",
  },
  {
    id: 4,
    link: "https://www.linkedin.com/in/mediaverse-land-profile",
    name: "LinkedIn",
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
