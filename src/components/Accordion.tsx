'use client'
import { useState } from "react"

export default function Accordion({ item }: any) {
    const [collapsed, setCollapsed] = useState<boolean>(true)
    return <div className="border-blue-500 border-b-2 ">
        <div className="w-full pb-2 mt-11 flex justify-between cursor-pointer"
            onClick={() => setCollapsed(e => !e)}>
            <p className="text-white text-base">{item.question}</p>
            <p className="text-blue-500 text-xl cursor-pointer">
                {collapsed ? '+' : '-'}
            </p>
        </div>
        <div className={`text-[14px] text-[#C1C1CC] transition-all duration-1000 ease-linear mb-4 ${collapsed ? 'max-h-0 opacity-0' : 'max-h-[500px]  opacity-100'}`}>
            {item.answer}
        </div>
        <div className="max-h-[500px] hidden"></div>
        <div className="max-h-0 hidden"></div>
    </div>
}