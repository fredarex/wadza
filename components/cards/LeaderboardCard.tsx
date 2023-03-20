import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ICommonProps, IMockLeaderboard } from '../../types/types'
import { FormattedMessage } from 'react-intl'
import { abbreviation } from '../../utils/utils'
import { isMobile } from 'react-device-detect'

interface IProps extends ICommonProps {
  leaderboard: IMockLeaderboard
}

const LeaderboardCard = (props: IProps) => {
  const { className, leaderboard } = props
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [])

  return (
    <div className='flex justify-center items-center w-[340px] min-[391px]:w-[calc(100vw-50px)] sm:w-[391px] h-[34px] bg-[#65478A] rounded mb-[10px] sm:mb-3'>
      <div className='items-center font-poppins-700 text-xs max-w-[33px] w-full text-white px-[13px]'>
        {leaderboard.grade}
      </div>
      <div className='flex justify-between items-center w-full h-full bg-[#765B97] pl-[9px] pr-[11px] sm:px-2 rounded'>
        <div className='flex justify-start items-center py-[6px]'>
          <Image
            src={leaderboard.profileImage}
            alt='profile image'
            width={23}
            height={23}
            className='rounded-[50%] mr-[9px]'
          />
          <div className='font-poppins-400 text-base leading-6 text-white'>
            @{leaderboard.username}
          </div>
        </div>
        <div className='flex justify-center items-center sm:bg-white sm:max-w-[97px] sm:w-full h-[21px] rounded-[3px]'>
          <div className='flex justify-center items-center font-poppins-600 text-sm sm:text-[10px] text-white sm:text-purple leading-[21px] sm:leading-[15px] '>
            {!_isMobile && (<><FormattedMessage id='page.home.creator.leaderboard.section.label.sold' />:&nbsp;</>)}
            <div className='font-poppins-400'>
              {leaderboard.value} {leaderboard.currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LeaderboardGradeCard = (props: IProps) => {
  const { className, leaderboard } = props
  const [borderColor, setBorderColor] = useState<string>('')
  const [width, setWidth] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [bottom, setBottom] = useState<string>('')
  
  useEffect(() => {
    switch (leaderboard.grade) {
      case 1:
        setBorderColor('border-[#FFC700]')
        setWidth('w-[114px]')
        setHeight('h-[99px]')
        setBottom('bottom-[-42px]')
        break;
      case 2:
        setBorderColor('border-[#CACACA]')
        setWidth('w-[91px]')
        setHeight('h-[79px]')
        setBottom('bottom-[-40px]')
        break;
      case 3:
        setBorderColor('border-[#A64F11]')
        setWidth('w-[91px]')
        setHeight('h-[79px]')
        setBottom('bottom-[-40px]')
        break;
    
      default:
        break;
    }
  }, [leaderboard])

  return (
    <div className='relative flex-col'>
      <div className={`flex justify-center items-center ${width} font-poppins-700 text-sm text-white leading-[21px] mb-[9px]`}>
        {leaderboard.grade}
      </div>
      <div className={`absolute ${bottom} ${width} ${height} bg-[rgba(142,110,181,0.45)] backdrop-blur-[5px] rounded`}>
        <div className='flex justify-center items-end h-full font-poppins-600 text-xs text-white leading-[18px] pb-[13px]'>
          @{abbreviation(leaderboard.username, 5)}
        </div>
      </div>
      <Image
        src={leaderboard.profileImage}
        alt='profile image'
        width={leaderboard.grade === 1? 114 : 91}
        height={leaderboard.grade === 1? 114 : 91}
        className={`rounded-[50%] border-[5px] ${borderColor} drop-shadow-[0_0_23px_rgba(255,255,255,0.24)]`}
      />
    </div>
  )
}

export { LeaderboardCard, LeaderboardGradeCard }
