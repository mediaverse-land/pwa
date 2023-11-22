"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const LiveChannelSearchFrom = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const [inputValue, setInputValue] = useState(searchParams?.title || "");
  const router = useRouter();
  const plan = searchParams.plan;
  const tag = searchParams.tag;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length > 1 && inputValue.length < 100) {
      router.push(
        `/explore?section=explore&content=live-channels&title=${inputValue}`
      );
    } else if (inputValue.length < 100) {
      router.push(`/explore?section=explore&content=live-channels`);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((cur) => {
      return e.target.value.trim();
    });
  };
  return (
    <form className="grow" onSubmit={handleFormSubmit}>
      <input
        className="text-white text-[12px] select-none bg-transparent outline-none w-full"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default LiveChannelSearchFrom;
