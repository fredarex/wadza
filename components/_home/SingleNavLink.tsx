import Image from 'next/image'
import React from 'react'

function SingleNavLink(props:any) {
  return (
    <div className="relative h-[68px] items-center justify-center  cursor-pointer flex flex-col">
          <div className='h-full flex items-center'  onClick={props.onClick}>
            {props.modal ? <Image src={props.activeIcon} alt="nav icon" width="28px" height={"28px"} />:<Image src={props.icon} alt="nav icon" width="28px" height={"28px"} />}
            
          </div>
          {props.modal && <div className="w-[67px] h-full bg-transparent absolute top-0 z-[999099999]"></div>}
          <div className={`w-[67px] h-[7px] rounded-[15px,15px,0,0] ${props.modal && 'bg-[#3C1361]'} `}></div>
    </div>
  )
}

export default SingleNavLink