import React from 'react'
import { ICommonProps } from '../../types/types'

interface IProps extends ICommonProps {
  title?: string
  onClick?: () => void
  children?: any
}

const WalletOptionBtn = (props: IProps) => {
  const { className, title, onClick, children } = props
  return (
    <button
      className={`flex flex-row justify-start items-center max-w-[501px] w-full max-h-[38px] h-full bg-[#F9F9F9] hover:bg-purple-lightest py-[6px] px-3 rounded ease-in duration-100 ${className}`}
      onClick={onClick}
    >
      {children}
      <span className='font-poppins-600 text-sm text-black-lighter leading-[98.3%] ml-[14px]'>
        {title}
      </span>
    </button>
  )
}

export default WalletOptionBtn
