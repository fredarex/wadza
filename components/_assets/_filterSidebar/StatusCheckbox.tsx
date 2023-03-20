import React from 'react'
import { ICommonProps } from '../../../types/types'

interface IProps extends ICommonProps {
  label: string
  id: string
  name: string
  checked?: boolean,
  onMobile?:boolean,
  onClick: (e: any) => void
}

const StatusCheckbox = (props: IProps) => {
  const { label, id, name, onClick, className, checked, onMobile } = props

  return (
    <label htmlFor={id} onClick={(e) => onClick(e)} className={`flex flex-row justify-between items-center ${onMobile ? 'py-2':'p-2'} rounded-sm ${!onMobile && 'hover:bg-slate-50'}  cursor-pointer ease-in duration-100`}>
      <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%]'>
        {label}
      </span>
      <input type={'checkbox'} id={id} name={name} checked={checked} readOnly={true} className={`form-check-input appearance-none w-[18px] h-[18px] border-none rounded-sm ${onMobile ? 'bg-white':'bg-[#F0F0F0]'} checked:bg-purple transition duration-200 cursor-pointer`} />
    </label>
  )
}

export default StatusCheckbox
