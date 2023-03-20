import React, { useEffect, useRef, useState } from 'react'
import { ICommonProps, INftData } from '../../types/types'
import NavbarDropdown from '../dropdowns/NavbarDropdown'
import Image from 'next/image'
import SelectArrowDownIcon from '../../assets/svg/select_arrow_down.svg'

interface IProps extends ICommonProps {
  options: Array<any>
  data: INftData
  placeholder: string
  onChange: React.Dispatch<React.SetStateAction<INftData>>
}

const Autocomplete = (props: IProps) => {
  const { options, data, placeholder, onChange, className } = props
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string>('')

  const handleChange = (text: string) => {
    setLabel(text)
    if (!showOptions) {
      setShowOptions(true)
    }
  }

  const select = (option: any) => {
    onChange({
      ...data,
      collectionId: option._id
    })
    setLabel(option.name)
    setShowOptions(false)
  }
  
  const filteredOptions = options.filter(option => option.name.toLowerCase().includes(label.toLowerCase()))

  useEffect(() => {
    const handler = (event: any) => {
      if (ref.current !== null && !ref.current.contains(event.target)) {
        setShowOptions(false)
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [setShowOptions])

  useEffect(() => {
    if (data?.collectionId === '') {
      setLabel('')
    }
  }, [data])

  return (
    <div className={`relative font-poppins-400 text-sm leading-[21px] text-black-lighter ${className}`} ref={ref}>
      <div className='flex flex-row items-center w-full bg-white pr-[18px] rounded-md'>
        <input
          type={'text'}
          className='w-full rounded-md px-[19px] py-3 outline-none placeholder:text-[#BCBCBC]'
          value={label}
          onChange={(e) => handleChange(e.target.value)}
          onClick={() => setShowOptions(!showOptions)}
          placeholder={placeholder}
        />
        <Image
          src={SelectArrowDownIcon}
          alt='arrow down'
        />
      </div>
      <NavbarDropdown show={showOptions}>
        <ul className={`absolute w-full bg-white mt-2 p-2 divide-y divide-gray-100 rounded-md max-h-52 overflow-y-auto`}>
          {filteredOptions.length > 0 ? filteredOptions.map((option: any, index: number, arr: Array<any>) => (
            <li key={index} className='flex flex-row items-center text-black hover:bg-purple hover:text-white py-2 px-4 ease-in duration-200 cursor-pointer' onClick={() => select(option)}>
              <picture><img
                src={option.logoImage}
                alt='collection'
                className='rounded-full w-5 h-5 mr-2'
              /></picture>{option.name}
            </li>
          )) : <li className='px-4 py-2 text-gray-lighter'>No results</li>}
        </ul>
      </NavbarDropdown>
    </div>
  )
}

export default Autocomplete
