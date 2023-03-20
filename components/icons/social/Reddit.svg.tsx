import React from 'react'
import { ISvgIconProps } from '../../../types/types'

const RedditSvgIcon = (props: ISvgIconProps) => {
  const { color, width = 24, height = 22 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.9604 0.75C19.0865 0.75 18.3244 1.22861 17.9219 1.93801L14.3216 1.19949C13.972 1.12777 13.6203 1.31236 13.4807 1.64083C13.0699 2.60742 12.4534 4.07237 11.9392 5.32585C11.7127 5.87797 11.5049 6.39196 11.3428 6.80535C9.42521 6.89837 7.65082 7.39583 6.18623 8.1904C5.62848 7.43248 4.73015 6.94 3.71569 6.94C2.0225 6.94 0.649902 8.3126 0.649902 10.0058C0.649902 11.2165 1.35116 12.2621 2.36915 12.7606C2.28224 13.1452 2.23669 13.5415 2.23669 13.9474C2.23669 15.9879 3.38832 17.7893 5.15799 19.0612C6.92845 20.3337 9.34902 21.1052 11.9999 21.1052C14.6507 21.1052 17.0713 20.3337 18.8417 19.0612C20.6114 17.7893 21.763 15.9879 21.763 13.9474C21.763 13.5416 21.7175 13.1452 21.6306 12.7606C22.6483 12.2623 23.3499 11.2167 23.3499 10.0058C23.3499 8.3126 21.9773 6.94 20.2841 6.94C19.2696 6.94 18.3713 7.4325 17.8135 8.19043C16.4238 7.43648 14.7552 6.95003 12.9499 6.82278C13.0643 6.53798 13.1918 6.22454 13.327 5.89516C13.7459 4.87394 14.2339 3.7095 14.6218 2.79229L17.6399 3.41138C17.7956 4.55385 18.7752 5.43421 19.9604 5.43421C21.2539 5.43421 22.3025 4.38561 22.3025 3.0921C22.3025 1.7986 21.2539 0.75 19.9604 0.75ZM19.1183 3.0921C19.1183 2.62702 19.4953 2.25 19.9604 2.25C20.4255 2.25 20.8025 2.62702 20.8025 3.0921C20.8025 3.55719 20.4255 3.93421 19.9604 3.93421C19.4953 3.93421 19.1183 3.55719 19.1183 3.0921ZM21.1004 11.3424C20.6317 10.4592 19.9348 9.66905 19.0768 9.00841C19.3644 8.66089 19.7989 8.44 20.2841 8.44C21.1489 8.44 21.8499 9.14103 21.8499 10.0058C21.8499 10.5708 21.5503 11.067 21.1004 11.3424ZM4.92294 9.00837C4.63539 8.66087 4.20085 8.44 3.71569 8.44C2.85093 8.44 2.1499 9.14103 2.1499 10.0058C2.1499 10.5709 2.4497 11.0671 2.8993 11.3424C3.36809 10.4592 4.06498 9.669 4.92294 9.00837ZM15.5373 13.9473C16.3366 13.9473 16.9846 13.2993 16.9846 12.5C16.9846 11.7006 16.3366 11.0526 15.5373 11.0526C14.7379 11.0526 14.0899 11.7006 14.0899 12.5C14.0899 13.2993 14.7379 13.9473 15.5373 13.9473ZM9.90462 12.5C9.90462 13.2993 9.25662 13.9473 8.45726 13.9473C7.6579 13.9473 7.00989 13.2993 7.00989 12.5C7.00989 11.7006 7.6579 11.0526 8.45726 11.0526C9.25662 11.0526 9.90462 11.7006 9.90462 12.5ZM8.85001 15.6288C8.49967 15.4078 8.03652 15.5127 7.81553 15.863C7.59453 16.2134 7.69939 16.6765 8.04972 16.8975L8.39465 17.1151C10.5949 18.503 13.3969 18.503 15.5972 17.1151L15.9421 16.8975C16.2924 16.6765 16.3973 16.2134 16.1763 15.863C15.9553 15.5127 15.4922 15.4078 15.1418 15.6288L14.7969 15.8464C13.0856 16.9259 10.9062 16.9259 9.19493 15.8464L8.85001 15.6288Z" fill={color} />
    </svg>
  )
}

export default RedditSvgIcon
