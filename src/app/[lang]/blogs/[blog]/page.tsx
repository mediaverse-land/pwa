import Motion from "@/components/motion";
import { getBlog } from "@/services/contactService";
import {
  FullLocaleNames,
  Locale,
  TFullLocales,
} from "@/types/dictionary-types";
import Image from "next/image";
import Link from "next/link";

async function getBlogsData({ id, lang }: { id: string; lang: TFullLocales }) {
  const blogs = await getBlog({ id, lang });
  if (!blogs.ok) {
    throw new Error("Failed to fetch data");
  }
  return blogs.json();
}
const regex = /\b(\w{3}), (\w{3}) (\d{2}),/;

const Blog = async ({
  params: { blog, lang },
}: {
  params: {
    blog: string;
    lang: Locale;
  };
}) => {
  const data = await getBlogsData({ id: blog, lang: FullLocaleNames[lang] });
  let date = new Date(data.data.created_at);

  // Extract the month and day
  let month = date.toLocaleString("default", { month: "short" });
  let day = date.getDate();

  // Construct the output string
  let outputDateString = `${month} ${day}`;

  return (
    <Motion>
      <div className="w-full flex justify-center flex-col items-center lg:items-start lg:flex-row mt-36 space-x-0 px-6 lg:px-4 lg:space-x-10 mb-10 max-w-screen-lg lg:mx-auto">
        <div className="flex flex-col w-full">
          {/* <div className="w-80 h-80 bg-cover bg-[url('/images/image-room.png')]">
         </div> */}
          <div className="relative w-full md:w-[500px] lg:w-80 aspect-square mx-auto lg:mx-0">
            <div className="absolute bottom-[1.5rem] left-[1.5rem] right-[1.5rem] flex justify-between items-center z-50 text-white">
              {/* author */}
              <div className="flex justify-between items-center gap-3">
                {/* picture */}
                <div className="relative w-[20px] aspect-square rounded-full overflow-hiddend">
                  <Image
                    src={data.data.user.image || "/images/mini-avatar.png"}
                    alt={`${data.data.user.name} picture`}
                    fill
                  />
                </div>
                <div>{data.data.user.name}</div>
              </div>
              {/* date */}
              <div>{outputDateString}</div>
            </div>
            <Image
              className="rounded-[24px]"
              src={data.data.image}
              alt=""
              fill
            />
          </div>
          <Link
            href={`./`}
            className="hidden lg:flex items-center justify-center py-2 rounded-3xl w-80 bg-card mt-6 space-x-2"
          >
            <Image
              src="/icons/back.png"
              alt="back"
              quality={100}
              width={20}
              height={20}
            />
            <p className="text-white">Back To Blog</p>
          </Link>
        </div>
        <div className="min-h-screen">
          <h1 className="text-white text-4xl mt-8 lg:mt-0">
            {data.data.title}
          </h1>
          {/* <p className="text-blue-500 mt-2">About Basic Display API</p> */}
          <div
            className="text-white w-full lg:w-[650px] mt-4"
            dangerouslySetInnerHTML={{ __html: data.data.body }}
          />
        </div>
      </div>
    </Motion>
  );
};

export default Blog;
