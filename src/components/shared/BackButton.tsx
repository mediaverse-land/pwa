"use client";

import { CSSProperties } from "react";
import { BACK_ICON } from "../SVG/svgs";
import { useRouter } from "next/navigation";

const BackButton = ({
  containerStyle,
  iconStyle,
  fill,
}: {
  iconStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  fill?: string;
}) => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer bg-[rgba(14,14,18,0.5)] lg:bg-transparent px-6 lg:px-0 py-2 lg:py-0 rounded-2xl lg:rounded-none"
      onClick={(e) => {
        e.stopPropagation();
        router.back();
      }}
      style={containerStyle}
    >
      <BACK_ICON fill={fill} style={iconStyle} />
    </div>
  );
};

export default BackButton;
