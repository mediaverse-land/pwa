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
    href: "/api",
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
