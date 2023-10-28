import Image from "next/image";
import Link from "next/link";

async function getBlogsData(props: any) {

    const blogs = await fetch(`https://blog.mediaverse.land/api/posts/${props.params.blog}`, { cache: 'no-store' });

    if (!blogs.ok) {
        throw new Error("Failed to fetch data");
    }
    return blogs.json();
}


const Blog = async (props: any) => {

    const data = await getBlogsData(props);

    return (<div className="w-full flex justify-center flex-col items-center sm:items-start sm:flex-row mt-36 space-x-0 px-4  sm:space-x-10">
        <div className="flex flex-col">
            {/* <div className="w-80 h-80 bg-cover bg-[url('/images/image-room.png')]">
            </div> */}
            <img className="w-80 h-80 rounded-[24px]" src={data.data.image} />
            <Link href={'./'} className="flex items-center justify-center py-2 rounded-3xl w-80 bg-card mt-6 space-x-2">
                <Image src='/icons/back.png' alt="back" quality={100} width={20} height={20} />
                <p className="text-white">Back To Blog</p>
            </Link>
        </div>
        <div>
            <h1 className="text-white text-4xl mt-8 sm:mt-0">{data.data.title}</h1>
            <p className="text-blue-500 mt-2">About Basic Display API</p>
            <div className="text-white w-full sm:w-[650px]" dangerouslySetInnerHTML={{ __html: data.data.body }} />
        </div>
    </div>);
}

export default Blog;