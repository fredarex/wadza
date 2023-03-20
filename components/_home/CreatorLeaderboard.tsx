import React from 'react'
import { FormattedMessage } from 'react-intl'
import { LeaderboardData } from '../../mock/LeaderboardData'
import { IMockLeaderboard } from '../../types/types'
import { LeaderboardCard, LeaderboardGradeCard } from '../cards/LeaderboardCard'
import CrownIcon from '../../assets/svg/crown.svg'
import Image from 'next/image'

const CreatorLeaderboard = () => {
  return (
    <div className='flex justify-center items-center mt-[70px] sm:mt-[105px]'>
      <div className='max-w-[1250px] w-full h-[619px] sm:h-[352px] bg-purple-light shadow-[0_10px_10px_rgba(0,0,0,0.05)] sm:rounded-[15px]'>
        <div className='sm:flex sm:justify-between'>
          {/* Leaderboard */}
          <div className='flex-col pt-[26px] sm:pt-[35px] pl-[25px] sm:pl-[42px]'>
            {/* Leaderboard title */}
            <div className='sm:flex font-poppins-400 text-[22px] sm:text-[33px] text-white uppercase leading-[104.3%]'>
              <FormattedMessage id='page.home.creator.leaderboard.section.label.creator' />&nbsp;
              <div className='font-poppins-600'>
                <FormattedMessage id='page.home.creator.leaderboard.section.label.leaderboard' />
              </div>
            </div>
            {/* Leaderboard body */}
            <div className='flex mt-[18px] sm:mt-[19px]'>              
              <div className='flex-col mr-[11px]'>
                {LeaderboardData.length > 0 && LeaderboardData.map((leaderboard: IMockLeaderboard, index: number) => (
                  <div key={`leaderboard-left-${index}`}>
                    {index < 5 && (<LeaderboardCard leaderboard={leaderboard} />)}
                  </div>
                ))}
              </div>
              <div className='hidden lg:block lg:flex-col'>
                {LeaderboardData.length > 0 && LeaderboardData.map((leaderboard: IMockLeaderboard, index: number) => (
                  <div key={`leaderboard-right-${index}`}>
                    {index > 4 && (<LeaderboardCard leaderboard={leaderboard} />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Grade */}
          <div className='flex-col sm:max-w-[348px] w-full h-[297px] sm:bg-white/[0.08] rounded-[9px] mt-[27px] mr-[29px]'>
            <div className='flex justify-center items-center mb-[14px] mt-[22px]'>
              <Image
                src={CrownIcon}
                alt='crown icon'
                width={34}
                height={25}
              />
            </div>
            <div className='flex justify-center items-center'>
              <div className='relative flex justify-center items-center w-[348px]'>
                <div className='z-[1]'>
                  <LeaderboardGradeCard leaderboard={LeaderboardData[0]} />
                </div>
                <div className='absolute bottom-[-26px] left-[42px]'>
                  <LeaderboardGradeCard leaderboard={LeaderboardData[1]} />
                </div>
                <div className='absolute bottom-[-26px] right-[42px]'>
                  <LeaderboardGradeCard leaderboard={LeaderboardData[2]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorLeaderboard
