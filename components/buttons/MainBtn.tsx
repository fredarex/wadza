import React from 'react'
import { ICommonProps } from '../../types/types'

interface IProps extends ICommonProps {
  onClick: () => void
  caption: string
}

const MainBtn = (props: IProps) => {
  const { className, onClick, caption} = props
  return (
    <button onClick={onClick} className={`max-w-[70px] sm:max-w-[72px] w-full h-[23px] sm:h-8 rounded sm:rounded-[19px] bg-gray-light sm:bg-purple text-purple sm:text-white text-xs sm:text-sm leading-3 sm:leading-[14px] hover:bg-purple-lighter active:bg-purple-light ease-in duration-100 ${className}`}>
      {caption}
    </button>
  )
}

export default MainBtn
