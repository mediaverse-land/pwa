import Image from "next/image";

const Terms = () => {
    return (<div className="w-full flex mt-40">
        <div className="py-10 px-10 flex flex-col space-y-6 rounded-3xl border border-blue-800">
            <div className="flex space-x-2 w-full">
                <Image src="/icons/compass.png" alt="icon" width={22} height={22} quality={100} />
                <p className="text-white">MediaVers Features</p>
            </div>
            <div className="flex space-x-2">
                <Image src="/icons/account.png" alt="icon" width={22} height={22} quality={100} />
                <p className="text-white">Manage your account</p>
            </div>
            <div className="flex space-x-2">
                <Image src="/icons/protect.png" alt="icon" width={22} height={22} quality={100} />
                <p className="text-white">Staying safe</p>
            </div>
            <div className="flex space-x-2">
                <Image src="/icons/lock.png" alt="icon" width={22} height={22} quality={100} />
                <p className="text-white">Privacy, Security</p>
            </div>
            <div className="flex space-x-2">
                <Image src="/icons/info.png" alt="icon" width={22} height={22} quality={100} />
                <p className="text-white">Terms & Policies</p>
            </div>
        </div>
    </div>);
}

export default Terms;