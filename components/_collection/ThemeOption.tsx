import Image from 'next/image'
import React from 'react'
import { ICollectionData, ICollectionTheme, ICommonProps } from '../../types/types'
import { CheckSvgIcon } from '../icons'

interface IProps extends ICommonProps {
  theme: ICollectionTheme
  checked: boolean
  collectionData: ICollectionData
  setCollectionData: React.Dispatch<React.SetStateAction<ICollectionData>>
}

const ThemeOption = (props: IProps) => {
  const { theme, checked, collectionData, setCollectionData, className } = props

  return (
    <div onClick={() => setCollectionData({ ...collectionData, displayTheme: theme.slug, })} className={`relative flex flex-col items-center text-center max-w-[186px] w-full h-[256px] ${checked? 'border-[3px] border-purple' : 'border border-[#B79ECD]'} border-solid hover:border-purple rounded-md pt-[23px] px-[21px] cursor-pointer ${className}`}>
      <Image
        src={theme.icon}
        alt='theme image'        
      />
      <h2 className='font-poppins-600 text-lg text-purple leading-[98.3%] mt-[21px]'>
        {theme.label}
      </h2>
      <h3 className='font-poppins-400 text-sm text-purple leading-[140.5%] mt-[11px]'>
        {theme.description}
      </h3>
      {checked && <div className='absolute top-[-14px] right-[-14px] flex justify-center items-center w-[27px] h-[27px] bg-purple rounded-full'>
        <CheckSvgIcon color='#E6E2EC'/>
      </div>}
    </div>
  )
}

export default ThemeOption
