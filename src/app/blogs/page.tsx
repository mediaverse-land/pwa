import BlogsPagination from "@/components/BlogsPagination";
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

async function getBlogsData(page: string) {
  const blogs = await fetch(
    `https://blog.mediaverse.land/api/posts?page=${page}`,
    {
      cache: "no-store",
    }
  );

  if (!blogs.ok) {
    throw new Error(`Failed to fetch data`, { cause: `${blogs.status} Error` });
  }
  return blogs.json();
}

const Blogs = async (params: any) => {
  if (!params.searchParams.page) {
    redirect("/blogs?page=1");
  }
  let page = params.searchParams.page;
  const blogsData: BlogsPageData = await getBlogsData(page);
  if (blogsData.data.length === 0) {
    redirect("/blogs?page=1");
  }
  return (
    <div className=" mt-28 flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold  text-white">MediaVerse News</h1>
        <div className=" flex items-center justify-center space-x-2 w-full mt-4">
          <span className="border-b-2 border-blue-600 w-6"></span>
          <p className="text-gray-500 text-xs">Always be update!</p>
          <span className="border-b-2 border-blue-600 w-6"></span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 w-full justify-center sm:justify-between sm:w-8/12 items-center mt-6">
        {blogsData.data.map((item: any, index: number) => {
          return (
            <Link
              key={index}
              href={`/blogs/${item.id}`}
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
                  <p className="text-xs">{item.created_at.slice(5, 11)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="my-20 text-white">
        <BlogsPagination
          currentPage={+page}
          links={blogsData.links}
          totalPage={+blogsData.meta.total}
          meta={blogsData.meta}
        />
      </div>
    </div>
  );
};

export default Blogs;
