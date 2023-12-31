import Link from "next/link";
import { CHEVRON_LEFT, CHEVRON_RIGHT } from "./SVG/svgs";
import { BlogsPageData } from "@/app/[lang]/blogs/page";
import { Locale } from "@/types/dictionary-types";

const BlogsPagination = ({
  currentPage,
  links,
  meta,
  lang,
}: {
  currentPage: number;
  lang: Locale;
  links?: BlogsPageData["links"];
  meta: BlogsPageData["meta"];
}) => {
  const pages = [];
  for (let i = 1; i <= meta.last_page; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center gap-7 items-center my-8 w-full min-w-[250px]">
      <Link
        className={`select-none aspect-square h-[25px] text-white ${
          currentPage <= 1 && "hidden"
        }`}
        href={`/${lang}/blogs?page=${currentPage - 1}`}
      >
        <CHEVRON_RIGHT />
      </Link>
      {currentPage <= 1 ? (
        <>
          {pages.slice(0, 3).map((page, i) => {
            return (
              <Link
                href={`/${lang}/blogs?page=${page}`}
                key={page}
                className={`rounded-full m-auto aspect-square min-w-[32px] text-[16px] flex justify-center items-center leading-none ${
                  currentPage === page
                    ? "bg-[#597AFF] text-white"
                    : "text-white"
                }`}
              >
                {page}
              </Link>
            );
          })}
          {pages.length > 1 && <span>...</span>}
        </>
      ) : currentPage === meta.last_page ? (
        <>
          {pages.length > 1 && <span>...</span>}
          {pages.slice(-3).map((page, i) => {
            return (
              <Link
                href={`/${lang}/blogs?page=${page}`}
                key={page}
                className={`rounded-full m-auto aspect-square min-w-[32px] text-[16px] flex justify-center items-center leading-none ${
                  currentPage === page
                    ? "bg-[#597AFF] text-white"
                    : "text-white"
                }`}
              >
                {page}
              </Link>
            );
          })}
        </>
      ) : (
        <>
          <Link
            href={`/${lang}/blogs?page=${currentPage - 1}`}
            className="rounded-full m-auto aspect-square m50-w-[34px] text-[16px] flex justify-center items-center leading-none text-white"
          >
            {currentPage - 1}
          </Link>
          <div className="rounded-full m-auto aspect-square min-w-[32px] text-[16px] flex justify-center items-center leading-none bg-[#597AFF] text-white">
            {currentPage}
          </div>
          <Link
            href={`/${lang}/blogs?page=${currentPage + 1}`}
            className="rounded-full m-auto aspect-square m50-w-[34px] text-[16px] flex justify-center items-center leading-none text-white"
          >
            {currentPage + 1}
          </Link>
        </>
      )}

      <Link
        className={`select-none aspect-square h-[25px] text-white ${
          currentPage >= meta.last_page && "hidden"
        }`}
        href={`/${lang}/blogs?page=${currentPage + 1}`}
      >
        <CHEVRON_LEFT />
      </Link>
    </div>
  );
};

export default BlogsPagination;
