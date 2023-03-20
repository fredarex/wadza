import React from 'react'
import Image from 'next/image'
import SearchIcon from '../../assets/svg/search.svg'
import { ICommonProps } from '../../types/types'
import { useIntl } from 'react-intl'

interface IProps extends ICommonProps {
  searchButtonClass?: string
  searchIconClass?: string
  inputBoxClass?: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = (props: IProps) => {
  const intl = useIntl()
  const { className, searchButtonClass, searchIconClass, inputBoxClass, placeholder, onChange } = props

  return (
    <div className={`flex max-w-[338px] w-full ${className}`}>
      <button className={`flex w-auto justify-end items-center ${searchButtonClass}`}>
        <Image
          src={SearchIcon}
          alt='search icon'
          className={`${searchIconClass}`}
        />
      </button>
      <input
        type='text'
        className={`w-full rounded mr-4 caret-slate-800 text-[12px] text-purple font-poppins-400 focus:outline-none ${inputBoxClass}`}
        placeholder={placeholder}
        onChange={(e) => onChange? onChange(e) : () => {}}
      />
    </div>
  )
}

export default SearchBox
