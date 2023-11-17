"use client";

import { useState } from "react";

const buyMethods: {
  id: number;
  name: string;
}[] = [
  {
    id: 1,
    name: "Ownership",
  },
  {
    id: 2,
    name: "Monthly",
  },
];

const BuySection = () => {
  const [selectedMethod, setSelectedMethod] = useState<
    "Ownership" | "Monthly" | string
  >("Monthly");
  const handleSelectedMethod = (name: string) => {
    setSelectedMethod(name);
  };
  return (
    <div className="px-10 py-8 flex flex-col items-stretch justify-between gap-8 rounded-t-2xl bg-[rgba(78,78,97,0.75)] backdrop-blur-md">
      <div className="flex flex-col items-stretch gap-4">
        {buyMethods.map((item) => (
          <div
            onClick={() => {
              handleSelectedMethod(item.name);
            }}
            key={item.id}
            className={`flex items-center justify-between border cursor-pointer ${
              selectedMethod === item.name
                ? "border-[#597AFF]"
                : "border-[#666680]"
            } px-6 py-4 rounded-lg bg-[rgba(78,78,97,0.50)] backdrop-blur-md`}
          >
            <div className="flex items-center gap-4 mr-auto leading-4">
              <div className="text-[#CCCCFF]">{item.name}</div>
              <div className="text-white font-semibold">150 $</div>
            </div>
            <div
              className={`w-[18px] aspect-square border border-[#CCCCFF] rounded-full ${
                selectedMethod === item.name ? "bg-[#597AFF]" : ""
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="rounded-full text-white text-center font-semibold bg-[#597AFF] py-2">
        Buy
      </div>
    </div>
  );
};

export default BuySection;
