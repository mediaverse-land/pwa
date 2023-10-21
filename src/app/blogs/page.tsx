import Image from "next/image";
import Link from "next/link";

async function getBlogsData() {
    const blogs = await fetch("https://blog.mediaverse.land/api/posts");

    if (!blogs.ok) {
        throw new Error("Failed to fetch data");
    }
    return blogs.json();
}

const Blogs = async () => {

    const blogsData = await getBlogsData();

    return (<div className=" mt-28 flex flex-col items-center">

        <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold  text-white">
                MediaVerse News
            </h1>
            <div className=" flex items-center justify-center space-x-2 w-full mt-4">
                <span className="border-b-2 border-blue-600 w-6"></span>
                <p className="text-gray-500 text-xs">Always be update!</p>
                <span className="border-b-2 border-blue-600 w-6"></span>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-6 w-full justify-center sm:justify-between sm:w-8/12 items-center mt-6">
            {blogsData.data.map((item: any, index: number) => {
                return <Link key={index} href={`/blogs/blog`} className="flex flex-col py-4 px-4 border border-[#262699] rounded-[24px] aspect-[302/477] ">
                    <div className="relative w-full aspect-square">
                        <Image src="/images/room.png" alt="image" quality={100} className="rounded-[16px] aspect-square" fill />
                    </div>
                    <p className="text-[#CCCCFF] text-base mt-6 px-2" style={{ fontSize: '16px' }}>{item.title}</p>
                    <p className="mt-1 text-[#666680] text-xs px-2 line-clamp-4" style={{ lineHeight: '19px', }} dangerouslySetInnerHTML={{ __html: item.body }}></p>
                    <div className="flex justify-between w-full mt-4 text-[#666680] px-2 pb-2">
                        <div className="flex space-x-1">
                            <Image src="/images/mini-avatar.png" alt="avatar" quality={100} width={15} height={15} />
                            <p className="text-xs">{item.user.name}</p>
                        </div>
                        <p className="text-xs">{item.created_at.slice(5, 11)}</p>
                    </div>
                </Link>
            })}

            {/* Fake Data */}
            {/* Fake Data */}
        </div>

    </div>);
}

export default Blogs;