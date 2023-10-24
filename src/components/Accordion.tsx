'use client'
import { useState } from "react"

export default function Accordion({ item }: any) {
    const [collapsed, setCollapsed] = useState<boolean>(true)
    return <>
        <div className="w-full border-blue-500 border-b-2 pb-2 mt-11 flex justify-between cursor-pointer"
            onClick={() => setCollapsed(e => !e)}>
            <p className="text-white text-base">{item.question}</p>
            <p className="text-blue-500 text-xl cursor-pointer">
                {collapsed ? '+' : '-'}
            </p>
        </div>
        <div className={`text-white transition-height ease-in-out duration-300 ${collapsed ? 'h-0 hidden opacity-0 closed' : 'h-[50px] opacity-100 opened'}`}>
            {item.answer}
        </div>
    </>
}