import React from 'react'
import { ISvgIconProps } from '../../types/types'

const BookmarkSvgIcon = (props: ISvgIconProps) => {
  const { color = '#3C1361', width = 14, height = 20 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.1308 1.187C8.40081 0.729333 5.59901 0.729333 2.86906 1.187C1.87171 1.3542 1.07745 2.11987 0.877479 3.11264C-0.0386411 7.66074 -0.0886272 12.3408 0.730142 16.9074L1.06349 18.7667C1.16628 19.34 1.86519 19.5691 2.28745 19.1679L6.31116 15.3454C6.69713 14.9788 7.3027 14.9788 7.68866 15.3454L11.7124 19.168C12.1346 19.5691 12.8335 19.34 12.9363 18.7667L13.2697 16.9074C14.0884 12.3408 14.0385 7.66073 13.1223 3.11264C12.9224 2.11987 12.1281 1.3542 11.1308 1.187Z" fill={color} />
    </svg>    
  )
}

export default BookmarkSvgIcon
