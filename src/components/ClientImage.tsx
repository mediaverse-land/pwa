"use client";
import React from "react";

export default function ClientImage({ src, className }: any) {
  if (src)
    return (
      <img
        className={className}
        src={src}
        onError={({ currentTarget }) => {
          console.info(currentTarget);
        }}
        alt="photo"
      />
    );
  else {
    return (
      <img
        className={`bg-[#535381] ${className}`}
        src={"/images/no.png"}
        onError={({ currentTarget }) => {
          console.info(currentTarget);
        }}
        alt="photo"
      />
    );
  }
}
