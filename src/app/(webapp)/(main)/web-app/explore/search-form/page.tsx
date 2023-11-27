"use client";

import {
  BACK_ICON,
  CHEVRON_LEFT,
  SEARCH_ICON,
  SEARCH_TEXT_ICON,
} from "@/components/SVG/svgs";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  q: z.string().min(1),
  searchIn: z.string(),
});

const WebAppSearchForm = () => {
  const [contentType, setContentType] = useState<"tag" | "plan">("tag");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const handleSubmitForm = handleSubmit((data) => {
    // console.log(data);
    // console.log(
    //   `/explore?section=explore&content=search?q=${data.q}${
    //     data.searchIn && `&${contentType}=${data.searchIn}`
    //   }`
    // );
    router.push(
      `/web-app/explore/search-result?q=${data.q}${
        data.searchIn && `&${contentType}=${data.searchIn}`
      }`
    );
  });
  return (
    <div className="flex flex-col items-stretch pl-8 pr-6 pt-6 gap-8 h-full">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-stretch gap-4"
      >
        {/* search input and back icon */}
        <div className="flex items-center justify-between gap-6">
          <div
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="cursor-pointer"
          >
            <BACK_ICON fill="#666680" />
          </div>
          <div className="bg-[rgba(14,14,18,0.50)] border border-[#353542] rounded-lg px-4 py-3 flex items-center justify-between grow">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-[12px] placeholder:text-[#83839C] text-white"
              {...register("q")}
            />
            <button type="submit">
              <SEARCH_ICON fill="#666680" />
            </button>
          </div>
        </div>
        {/* search in tags */}
        <div className="flex items-center justify-between gap-6">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((curr) => {
                return !curr;
              });
            }}
            className="relative select-none"
          >
            <div className="flex items-center justify-between gap-4 cursor-pointer">
              <div
                className={`transition-all duration-200 ${
                  isMenuOpen ? "-rotate-90" : "rotate-90"
                }`}
              >
                <CHEVRON_LEFT
                  style={{
                    width: "18px",
                    height: "20px",
                  }}
                />
              </div>
              <div className="text-[#83839C] font-semibold text-[16px] capitalize">
                {contentType}:
              </div>
            </div>
            {/* options */}
            <motion.div
              variants={{
                hidden: { opacity: 0, display: "none" },
                enter: { opacity: 1, display: "flex" },
                exit: { opacity: 0, display: "none" },
                open: { opacity: 1, display: "flex" },
              }}
              initial={`${isMenuOpen ? "open" : "hidden"}`} // Set the initial state to variants.hidden
              animate={`${isMenuOpen ? "open" : "hidden"}`} // Animated state to variants.enter
              transition={{ duration: 0.5 }} // Set the transition to linear
              className={`absolute left-0 top-[125%] z-20 flex-col items-stretch backdrop-blur-sm rounded-lg bg-[rgba(78,78,97,0.75)] text-white min-w-[100px] overflow-hidden`}
            >
              <div
                className="cursor-pointer hover:backdrop-blur py-4 px-5"
                onClick={(e) => {
                  e.stopPropagation();
                  setContentType("tag");
                  setIsMenuOpen(false);
                }}
              >
                Tag
              </div>
              <div
                className="cursor-pointer hover:backdrop-blur py-4 px-5"
                onClick={(e) => {
                  e.stopPropagation();
                  setContentType("plan");
                  setIsMenuOpen(false);
                }}
              >
                Plan
              </div>
            </motion.div>
          </div>
          <div className="bg-[rgba(14,14,18,0.50)] border border-[#353542] flex rounded-lg px-4 py-3 grow">
            <input
              type="text"
              placeholder={`Search in ${
                contentType === "tag" ? "tags" : "plans"
              }`}
              className="bg-transparent outline-none w-full text-[12px] placeholder:text-[#353542] text-white"
              {...register("searchIn")}
            />
          </div>
        </div>
      </form>
      <div className="grow flex flex-col items-center mt-16 text-[#666680] gap-4">
        <div>
          <SEARCH_TEXT_ICON fill="#666680" />
        </div>
        <div className="leading-5 max-w-[170px] text-center">
          Search in more then 2.000.000 content
        </div>
      </div>
    </div>
  );
};

export default WebAppSearchForm;
