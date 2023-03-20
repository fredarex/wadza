import React from 'react'
import { ICommonProps } from '../../../types/types'

interface IProps extends ICommonProps {
  label: string
  id: string
  name: string,
  onMobile?: boolean,
  checked?: boolean
  onClick?: () => void
}

const QuantityRadio = (props: IProps) => {
  const { label, id, name, checked, onClick, className,onMobile } = props

  return (
    <label htmlFor={id} onClick={onClick} className={`flex flex-row justify-between items-center ${onMobile ? 'py-2':'p-2'}  rounded-sm ${!onMobile && 'hover:bg-slate-50' }  cursor-pointer ease-in duration-100`}>
      <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%] cursor-pointer'>
        {label}
      </span>
      <input type={'radio'} id={id} name={name} checked={checked} readOnly className={`appearance-none rounded-full w-[14px] h-[14px] border-none ${onMobile ? 'bg-white':'bg-[#D9D9D9]'}  checked:bg-purple checked:border-2 checked:border-solid checked:border-[#D9D9D9] transition duration-200 cursor-pointer`} />
    </label>
  )
}

export default QuantityRadio
