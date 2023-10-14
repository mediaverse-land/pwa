import Image from "next/image";

const Footer = () => {
    return (
        <div className="w-full flex justify-between px-24 items-center py-6 bg-blue-950 mt-8 ">
            <p className="text-white">Haven't tried the app yet?</p>
            <div className="flex space-x-1">
                <div className="app-store-container px-2 py-1 cursor-pointer">
                    <Image src="/images/apple-app-store-logo.png" quality={100} width={70} height={40} alt="google play store logo" />
                </div>
                <div className="app-store-container px-2 py-1 cursor-pointer ">
                    <Image src="/images/google-play-store-logo.png" quality={100} width={70} height={40} alt="google play store logo" />
                </div>
            </div>

        </div>
    );
}

export default Footer;