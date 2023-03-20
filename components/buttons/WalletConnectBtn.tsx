import React, { useEffect, useState } from 'react'
import { UserSvgIcon } from '../icons'
import { ICommonProps } from '../../types/types'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { abbreviation } from '../../utils/utils'

interface IProps extends ICommonProps {
  onClick: () => void
}

const WalletConnectBtn = (props: IProps) => {
  const [hover, setHover] = useState<boolean>(false)
  const { className, onClick } = props
  const [user, setUser] = useState<any>({})
  const _user: any = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    setUser(_user)
  }, [_user])

  const onMouseEnter = () => {
    setHover(true)
  }

  const onMouseLeave = () => {
    setHover(false)
  }
  
  return (
    <section className={`max-w-[111px] w-full ${className}`}>
      {user? (
        <span className='flex justify-center items-center w-full h-8 bg-gray-light rounded-[19px] font-poppins-600 text-purple text-xs'>
          {abbreviation(user?.walletAddress || user?.username, 10)}
        </span>
      ) : (
        <button
          className='flex justify-center items-center w-full h-8 bg-gray-light rounded-[19px] hover:bg-purple-lighter ease-in duration-100 active:bg-purple-light'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          <UserSvgIcon color={ hover ? '#FFFFFF' : '#424242' } />
          <div className={`font-poppins-600 ${ hover ? 'text-white' : 'text-black-light' } text-xs ml-3`}>
            <FormattedMessage id='page.home.navbar.login' />
          </div>
        </button>
      )}
    </section>
  )
}

export default WalletConnectBtn
