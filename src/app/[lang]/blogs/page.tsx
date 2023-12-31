import BlogsPagination from "@/components/BlogsPagination";
import Motion from "@/components/motion";
import { getDictionary } from "@/dictionary";
import { getBlogs } from "@/services/contactService";
import { Locale } from "@/types/dictionary-types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
export interface BlogsPageData {
  data: DataEntity[];
  links: Links;
  meta: Meta;
}
export interface DataEntity {
  id: number;
  title: string;
  slug: string;
  image: string;
  excerpt?: string | null;
  body: string;
  created_at: string;
  tags: CategoriesEntityOrTagsEntity[] | [];
  categories: CategoriesEntityOrTagsEntity1[];
  user: User;
}
export interface CategoriesEntityOrTagsEntity {
  id: number;
  name: string;
  slug: string;
}
export interface CategoriesEntityOrTagsEntity1 {
  id: number;
  name: string;
  slug: string;
}
export interface User {
  name: string;
  image: string;
}
export interface Links {
  first: string;
  last: string;
  prev?: null;
  next?: null;
}
export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: LinksEntity[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export interface LinksEntity {
  url: string;
  label: string;
  active: boolean;
}

async function getBlogsData(page: number) {
  const blogs = await getBlogs(page);

  // console.info(blogs);

  if (!blogs.ok) {
    throw new Error(`Failed to fetch data. ${blogs.statusText}`, {
      cause: `${blogs.status} Error`,
    });
  }
  return blogs.json();
}

const Blogs = async ({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: {
    [key: string]: string;
  };
}) => {
  if (!searchParams.page) {
    redirect(`/${lang}/blogs?page=1`);
  }
  let page = +searchParams.page;

  const blogsData: BlogsPageData = await getBlogsData(page);

  if (blogsData?.data && blogsData.data.length === 0 && page !== 1) {
    redirect(`/${lang}/blogs?page=1`);
  }
  const dic = await getDictionary(lang);
  return (
    <Motion>
      <div className="mt-28 flex flex-col items-center w-[80rem] max-w-screen-lg mx-auto">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold  text-white">
            {dic.blogSection.mediaverseNews}
          </h1>
          <div className=" flex items-center justify-center space-x-2 w-full mt-4">
            <span className="border-b-2 border-blue-600 w-6"></span>
            <p className="text-gray-500 text-xs">
              {dic.blogSection.alwaysBeUpdate}
            </p>
            <span className="border-b-2 border-blue-600 w-6"></span>
          </div>
        </div>

        {blogsData.data.length !== 0 ? (
          <>
            <div className="grid grid-cols-4 gap-6 w-full justify-center sm:justify-between items-center mt-6">
              {blogsData.data.map((item: any, index: number) => {
                return (
                  <Link
                    key={index}
                    href={`/${lang}/blogs/${item.id}`}
                    className="flex flex-col py-4 px-4 border border-[#262699] rounded-[24px] w-full h-full"
                  >
                    <div className="relative w-full aspect-square">
                      <Image
                        src={item.image}
                        alt="image"
                        quality={100}
                        className="rounded-[16px] aspect-square"
                        fill
                      />
                    </div>
                    {/* body */}
                    <div className="flex flex-col w-full grow">
                      <p className="text-[#CCCCFF] mt-6 px-2 text-[16px]">
                        {item.title}
                      </p>
                      <div
                        className="mt-1 text-[#666680] text-xs px-2 line-clamp-4 grow leading-[19px]"
                        dangerouslySetInnerHTML={{
                          __html: item.body.slice(0, 75),
                        }}
                      ></div>
                      <div className="flex justify-between w-full mt-4 text-[#666680] px-2 pb-2">
                        <div className="flex space-x-1">
                          <Image
                            src="/images/mini-avatar.png"
                            alt="avatar"
                            quality={100}
                            width={15}
                            height={15}
                          />
                          <p className="text-xs">{item.user.name}</p>
                        </div>
                        <p className="text-xs">
                          {item.created_at.slice(5, 11)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="my-20 text-white">
              <BlogsPagination
                lang={lang}
                currentPage={+page}
                links={blogsData.links}
                meta={blogsData.meta}
              />
            </div>
          </>
        ) : (
          <div className="my-20 flex items-center justify-center text-white mx-auto font-bold text-[32px]">
            No Blogs Found
          </div>
        )}
      </div>
    </Motion>
  );
};

export default Blogs;
