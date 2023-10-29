import { getBlog } from "@/services/contactService";
import Image from "next/image";
import Link from "next/link";

async function getBlogsData(props: any) {
  const blogs = await getBlog(props.params.blog);
  if (!blogs.ok) {
    throw new Error("Failed to fetch data");
  }
  return blogs.json();
}
const regex = /\b(\w{3}), (\w{3}) (\d{2}),/;

const Blog = async (props: any) => {
  const data = await getBlogsData(props);
  const date = data.data.created_at.match(regex);
  // console.log(data);

  return (
    <div className="w-full flex justify-center flex-col items-center sm:items-start sm:flex-row mt-36 space-x-0 px-4  sm:space-x-10 mb-10">
      <div className="flex flex-col">
        {/* <div className="w-80 h-80 bg-cover bg-[url('/images/image-room.png')]">
            </div> */}
        <div className="relative w-80 aspect-square">
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
            <div>
              {date[3]} {date[2]}
            </div>
          </div>
          <Image className="rounded-[24px]" src={data.data.image} alt="" fill />
        </div>
        <Link
          href={"./"}
          className="flex items-center justify-center py-2 rounded-3xl w-80 bg-card mt-6 space-x-2"
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
        <h1 className="text-white text-4xl mt-8 sm:mt-0">{data.data.title}</h1>
        {/* <p className="text-blue-500 mt-2">About Basic Display API</p> */}
        <div
          className="text-white w-full sm:w-[650px] mt-4"
          dangerouslySetInnerHTML={{ __html: data.data.body }}
        />
      </div>
    </div>
  );
};

export default Blog;
