"use client";
import { useState } from "react";

export default function Accordion({ item }: any) {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  return (
    <div className="border-blue-500 border-b-2">
      <div
        className="w-full pb-2 mt-6 lg:mt-11 flex justify-between cursor-pointer"
        onClick={() => {
          // console.log("clicked");
          setCollapsed((e) => !e);
        }}
      >
        <p className="text-white text-base">{item.question}</p>
        <p className="text-blue-500 text-xl cursor-pointer">
          {collapsed ? "+" : "-"}
        </p>
      </div>
      <div
        className={`text-[14px] text-[#C1C1CC] transition-all duration-700 overflow-hidden mb-4 ${
          collapsed ? "max-h-0" : "max-h-[500px]"
        }`}
      >
        {item.answer}
      </div>
      <div className="max-h-[500px] hidden"></div>
      <div className="max-h-0 hidden"></div>
    </div>
  );
}
