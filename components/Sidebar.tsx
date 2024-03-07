"use client"

import Link from 'next/link'
import React from 'react'
import { navLinks } from "../constants/index";
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = () => {

  const pathname = usePathname();
  return (
    <div className="w-1/6 h-lvh flex size-full flex-col" style={{backgroundColor:"#171717"}}>

      <div className='flex my-5 ms-5'>
        <Image 
          src="/assets/icons/chatgpt-icon.svg"
          alt="logo"
          width={24}
          height={24}
          className='me-2 text-white h-[32px] w-[32px] bg-gray-100 my-auto rounded-full' 
        />
        <div className="logo text-gray-200 my-auto ms-1">PixelPulse</div>
      </div>

      {/* <hr className="bg-gray-100 border-dashed"></hr> */}
      
      <div className='mt-2'>
        {navLinks.slice(0,6).map((obj) => {
            const isActive = obj.route === pathname; 
            return (
              <div className='text-gray-200 mx-auto w-full px-3 py-1 block'>
                <Link href={obj.route} className={`w-full flex block px-3 py-2 text-base hover:bg-[#212121] rounded-md ${isActive && "bg-[#212121]"}`}>
                    <Image 
                      src={obj.icon}
                      alt="logo"
                      width={18}
                      height={18}
                      className='me-2 brightness-200' 
                    />
                      {obj.label}
                </Link>
              </div>
            );
        })}
      </div>

      
      <div className='mt-auto mb-3'>
        {navLinks.slice(6).map((obj) => {
                  const isActive = obj.route === pathname; 
                  return (
                    <div className='text-gray-200 mx-auto w-full px-3 py-1 block'>
                      <Link href={obj.route} className={`w-full flex block px-3 py-2 text-base hover:bg-[#212121] rounded-md ${isActive && "bg-[#212121]"}`}>
                          <Image 
                            src={obj.icon}
                            alt="logo"
                            width={18}
                            height={18}
                            className='me-2 brightness-200' 
                          />
                            {obj.label}
                      </Link>
                    </div>
                  );
        })}
      </div>
      
    </div>
  )
}

export default Sidebar