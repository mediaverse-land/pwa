"use client";
import Image from "next/image";

const ScrollToBottomBtn = ({ title }: { title: string }) => {
  const scrollToBottom = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToBottom}
      className="flex flex-col items-center justify-center"
    >
      <a className="text-white text-2xl font-semibold">{title}</a>
      <Image
        src="/icons/down-icon.png"
        className="mt-2 animate-icon relative"
        alt="down"
        width={15}
        height={15}
        quality={100}
      />
    </button>
  );
};

export default ScrollToBottomBtn;
