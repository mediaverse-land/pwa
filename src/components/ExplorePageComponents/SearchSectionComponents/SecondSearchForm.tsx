"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const SecondSearchForm = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const [inputValue, setInputValue] = useState(searchParams.q);
  const router = useRouter();
  const plan = searchParams.plan;
  const tag = searchParams.tag;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length > 1 && inputValue.length < 100) {
      router.push(
        `/app/explore/search-result?q=${inputValue}${
          plan ? `&plan=${plan}` : ""
        }${tag ? `&tag=${tag}` : ""}`
      );
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
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SecondSearchForm;
