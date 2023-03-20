import React from 'react'
import { ISvgIconProps } from '../../../types/types'

const TwitterSvgIcon = (props: ISvgIconProps) => {
  const { color = '#424242', width = 20, height = 17 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.8098 2.22724C19.8677 2.14647 19.7821 2.04218 19.6894 2.07811C19.0307 2.33344 18.3423 2.50571 17.64 2.5906C18.4219 2.12348 19.0253 1.4124 19.3599 0.570533C19.394 0.484774 19.3003 0.408187 19.2195 0.452801C18.4928 0.854139 17.7091 1.14313 16.8949 1.30957C16.8608 1.31654 16.8257 1.30494 16.8018 1.27969C16.1908 0.635016 15.3866 0.205781 14.5098 0.0574517C13.6147 -0.0939932 12.6946 0.0559587 11.8938 0.48379C11.0931 0.911621 10.457 1.59313 10.0853 2.42144C9.73186 3.209 9.6365 4.08691 9.81081 4.93003C9.82433 4.99545 9.77312 5.05721 9.70645 5.05307C8.1224 4.95469 6.57469 4.53336 5.15868 3.81446C3.74627 3.09739 2.49554 2.09983 1.48267 0.883296C1.43772 0.829305 1.35252 0.836293 1.31977 0.898445C1.0046 1.49651 0.839579 2.16311 0.840028 2.8406C0.838748 3.51498 1.00425 4.17922 1.32178 4.77416C1.63932 5.36911 2.09905 5.87631 2.66003 6.2506C2.0651 6.23441 1.48178 6.08734 0.951276 5.82067C0.882909 5.78631 0.800902 5.83524 0.804458 5.91167C0.845826 6.80091 1.17228 7.69364 1.73734 8.37857C2.33866 9.10744 3.17328 9.60624 4.10003 9.7906C3.74328 9.89917 3.3729 9.95641 3.00003 9.9606C2.79709 9.95823 2.59454 9.94325 2.39356 9.91578C2.31904 9.90559 2.2582 9.97637 2.28428 10.0469C2.5607 10.7944 3.04903 11.4467 3.6911 11.9228C4.37755 12.4318 5.2056 12.7142 6.06003 12.7306C4.61723 13.8659 2.83591 14.4855 1.00003 14.4906C0.811384 14.4912 0.622825 14.4851 0.434709 14.4723C0.328701 14.4651 0.279946 14.6063 0.371322 14.6605C2.16009 15.7221 4.20462 16.2831 6.29003 16.2806C7.82972 16.2966 9.35716 16.0056 10.7831 15.4247C12.2091 14.8437 13.5051 13.9845 14.5952 12.8971C15.6854 11.8097 16.548 10.516 17.1326 9.09151C17.7172 7.66702 18.0121 6.14033 18 4.6006V4.12077C18 4.0892 18.015 4.05951 18.0402 4.04048C18.7184 3.52834 19.3149 2.91691 19.8098 2.22724Z" fill={color} />
    </svg>
  )
}

export default TwitterSvgIcon