import { socialMedia } from "@/data";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex justify-between px-2 sm:px-72 items-center py-6 bg-blue-950 mt-auto">
      <p className="text-white">Haven't tried the app yet?</p>
      <div className="flex space-x-5">
        {socialMedia.map((item) => (
          <Link
            href={item.link}
            target="_blank"
            className="relative w-[30px] aspect-square"
            key={item.id}
          >
            <Image
              className="text-white"
              src={item.icon}
              alt={`${item.name}`}
              fill
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
