import React from 'react'

const Header = ({title, subTitle} : {title:string, subTitle:string}) => {
  return (
    <>
        <h2 className='text-2xl font-bold text-weight-900'>{title}</h2>
        {subTitle && <p className="text-[16px] mt-4 text-gray-200">{subTitle}</p>}
    </>
  )
}

export default Header