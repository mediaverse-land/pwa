"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BACK_ICON, CHEVRON_LEFT, SEARCH_ICON } from "../SVG/svgs";
import { motion } from "framer-motion";
import { DicProperties } from "@/types/dictionary-types";
import Link from "next/link";

const formSchema = z.object({
  q: z.string().min(1),
  searchIn: z.string(),
});
const WebAppSearchForm = ({ dic }: { dic: DicProperties }) => {
  const params = useParams();
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
    router.push(
      `/${params.lang}/app/explore/search-result?q=${data.q}${
        data.searchIn && `&${contentType}=${data.searchIn}`
      }`
    );
  });
  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col items-stretch gap-4"
    >
      {/* search input and back icon */}
      <div className="flex items-center justify-between gap-6">
        <Link href={`/${params.lang}/app/explore`} className="cursor-pointer">
          <BACK_ICON fill="#666680" />
        </Link>
        <div className="bg-[rgba(14,14,18,0.50)] border border-[#353542] rounded-lg px-4 py-3 flex items-center justify-between grow">
          <input
            type="text"
            placeholder={dic.generalApp.search}
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
            placeholder={`${dic.generalApp.searchIn} ${
              contentType === "tag" ? "tags" : "plans"
            }`}
            className="bg-transparent outline-none w-full text-[12px] placeholder:text-[#353542] text-white"
            {...register("searchIn")}
          />
        </div>
      </div>
    </form>
  );
};

export default WebAppSearchForm;
