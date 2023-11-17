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
      className="cursor-pointer"
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
