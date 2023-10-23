import React from 'react'

export default function BorderGradient({ className, children, to, sColor, tColor, deg }: any) {
  return (
    <div className={`flex p-[2px] justify-center items-center ${className}`}
      style={{
        background: 'linear-gradient(114.85deg, rgba(207, 207, 252, 0.3) 0%, rgba(207, 207, 252, 0) 65.83%)'
      }}>
      <div className='bg-[#1C1C51] w-full h-full px-10 py-[1.75rem] rounded-3xl'>
        {children}
      </div>
    </div>
  )
}
