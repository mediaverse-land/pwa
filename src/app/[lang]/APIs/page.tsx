import React from "react";
import {swaggerURL} from "@/configs/base";

export default function api() {
  return (
    <div className="h-[calc(100vh-195px)] overflow-auto mt-14">
      <iframe src={`${swaggerURL}`} className="w-full h-full" />
    </div>
  );
}
