import React from 'react'
import { ICommonProps } from '../../../types/types'

interface IProps extends ICommonProps {
  checked: boolean
  id: string
  name: string
  label: string
  description?: string
  onClick: () => void
}

const styles = {
  label: 'flex flex-row justify-start items-center px-6 py-[22px] rounded-[15px] border border-solid hover:border-purple-lighter cursor-pointer',
  input: 'appearance-none rounded-full w-[25px] h-[25px] border-none bg-[#D7CCE5] checked:bg-purple checked:border-[5px] checked:border-solid checked:border-[#D7CCE5] transition duration-200 cursor-pointer',
}

const ItemRadio = (props: IProps) => {
  const { checked, id, name, label, description, onClick, className } = props

  return (
    <label onClick={onClick} htmlFor={id} className={`${styles.label} ${className} ${checked? 'border-purple-lighter' : 'border-[#D7CDE5]'}`}>
      <input type={'radio'} id={id} name={name} checked={checked} readOnly className={`${styles.input} `} />
      <div className='flex flex-col ml-5'>
        <h3 className='font-poppins-700 text-base text-black leading-[98.3%] '>
          {label}
        </h3>
        {description && <h3 className='font-poppins-400 text-[15px] text-black leading-[98.3%] mt-2'>
          {description}
        </h3>}
      </div>
    </label>
  )
}

export default ItemRadio
