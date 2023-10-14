'use client'

import { navbar } from "@/data";
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="nav ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center">
                    <Image src="/images/media-verse-logo.png" quality={100} width={30} height={40} className="h-8 mr-3" alt="MediaVerse Logo" />
                    <div className="flex flex-col">
                        <span className="self-center text-lg font-semibold whitespace-nowrap text-white">MediaVerse</span>
                        <span className="self-center text-xs top-0 text-gray-500 whitespace-nowrap">content is wealth</span>
                    </div>
                </a>
                <div className="flex md:order-2 justify-between">
                    <a className="text-blue-500 mr-1 hover:text-white" href="#">Sign In</a>
                    <span className="text-blue-500 mr-1">/</span>
                    <a className="text-blue-500 hover:text-white" href="#">Sign Up</a>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        {navbar.map((item, index) => (
                            <li >
                                <a href={item.href} key={index} className="text-gray-400 hover:text-white border-blue-600 md:bg-transparent md:p-0 hover:border-b-2">{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;