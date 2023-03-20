import React from 'react'
import { ISvgIconProps } from '../../types/types'

const ListSvgIcon = (props: ISvgIconProps) => {
  const { color = '#52307C', width = 20, height = 20 } = props
  
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.27505 0.889428C9.3417 0.761151 10.4082 1.12985 11.1678 1.88952L18.6962 9.41785C19.6725 10.3942 19.6725 11.9771 18.6962 12.9534L12.6151 19.0345C11.6387 20.0108 10.0558 20.0108 9.07952 19.0345L1.55118 11.5062C0.791518 10.7465 0.422818 9.68003 0.551096 8.61339L1.23963 2.88813C1.32219 2.20164 1.8633 1.66052 2.54979 1.57796L8.27505 0.889428ZM3.95128 7.11776C4.73233 7.89881 5.99866 7.89881 6.77971 7.11776C7.56076 6.33671 7.56076 5.07038 6.77971 4.28934C5.99866 3.50829 4.73233 3.50829 3.95128 4.28934C3.17023 5.07038 3.17023 6.33671 3.95128 7.11776Z" fill={color} />
    </svg>
  )
}

export default ListSvgIcon
