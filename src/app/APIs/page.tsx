import Motion from "@/components/motion";
import React from "react";

export default function api() {
  return (
    <div className="h-[calc(100vh-195px)] overflow-auto mt-14">
      <Motion>
        <iframe src="https://docs.mediaverse.land" className="w-full h-full" />
      </Motion>
    </div>
  );
}
