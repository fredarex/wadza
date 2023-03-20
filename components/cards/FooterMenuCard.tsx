import React from 'react'
import Link from 'next/link'
import { ICommonProps, IMenu, ISubMenu } from '../../types/types'

interface IProps extends ICommonProps, IMenu {}

const FooterMenuCard = (props: IProps) => {
  const { className, title, menus } = props

  return (
    <div className='font-poppins-600 text-base text-black leading-6 mt-[50px] sm:mt-0 mb-[9px] sm:mb-0'>
      <b>{title}</b>
      <ul className='flex-col mt-4'>
        {menus.length > 0 && menus.map((menu: ISubMenu, index: number) => (
          <div key={index}>
            <Link href={menu.url} className='font-poppins-400 text-xs leading-4 hover:text-purple'>
              {menu.name}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default FooterMenuCard
