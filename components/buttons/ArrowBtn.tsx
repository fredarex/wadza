import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowType, ICommonProps } from '../../types/types'

import ArrowLeftIcon from '../../assets/svg/arrow_left.svg'
import ArrowRightIcon from '../../assets/svg/arrow_right.svg'
import { isMobile } from 'react-device-detect'

interface IProps extends ICommonProps {
  direction: ArrowType
}

const ArrowBtn = (props: IProps) => {
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [])

  return (
    <button
      className={`flex justify-center items-center max-w-[46px] sm:max-w-[61px] w-full h-[46px] sm:h-[61px] rounded-[50%] bg-purple ${props.className}`}
    >
      <Image
        src={ props.direction === 'left' ? ArrowLeftIcon : ArrowRightIcon}
        alt='arrow button'
        width={_isMobile? 13 : 17}
        height={_isMobile? 23 : 30}
      />
    </button>
  )
}

export default ArrowBtn
