import React from 'react'
import { ICommonProps } from '../../types/types'

interface IProps extends ICommonProps {
  title?: string
  onClick?: () => void
  children?: any
}

const LoginOptionBtn = (props: IProps) => {
  const { className, title, onClick, children } = props
  return (
    <button
      className={`flex flex-row justify-start items-center max-w-[501px] w-full max-h-[58px] h-full bg-purple hover:bg-purple-light p-[7px] rounded-[6px] ease-in duration-100 ${className}`}
      onClick={onClick}
    >
      <div className='w-11 h-11 bg-white/[0.17] p-[14px] mr-5 rounded-[3px]'>
        {children}
      </div>
      <span className='font-poppins-600 text-base text-white leading-[98.3%]'>
        {title}
      </span>
    </button>
  )
}

export default LoginOptionBtn
