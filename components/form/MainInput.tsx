import React from 'react'
import { ICommonProps } from '../../types/types'

interface IProps extends ICommonProps {
  type: string
  label?: string
  value?: string
  onChange: (e: any) => void
  placeholder: string
  errorMsg?: string
  inputClassName?: string
  readonly?: boolean
}

const MainInput = (props: IProps) => {
  const { className, type, label, value, onChange, placeholder, errorMsg, inputClassName, readonly = false } = props
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (<span className='font-poppins-400 text-base text-purple mb-[5px] leading-6'>
        {label}
      </span>)}
      <input
        type={type}
        className={`${inputClassName} font-poppins-400 w-full caret-slate-800 text-black-lighter focus:outline-none`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
      {errorMsg && (<span className='font-poppins-400 text-[9px] text-red-600 mt-1 leading-4'>
        {errorMsg}
      </span>)}
    </div>
  )
}

export default MainInput
