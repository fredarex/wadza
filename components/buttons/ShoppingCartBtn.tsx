import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShoppingCartModal } from '../../redux/features/userSlice'
import { RootState } from '../../redux/store'
import { ICommonProps } from '../../types/types'
import { ShoppingCartSvgIcon } from '../icons'
import ShoppingCartModal from '../modals/ShoppingCartModal'

interface IProps extends ICommonProps {

}

const ShoppingCartBtn = (props: IProps) => {
  const {className} = props
  const dispatch = useDispatch()
  const _user = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<any>({})

  const open = () => {
    dispatch(setShoppingCartModal(true))
  }

  useEffect(() => {
    setUser(_user)
  }, [_user])
  
  return (
    <section
      className={`relative w-[37px] ${className}`}
    >
      <button onClick={() => open()} className={`flex justify-center items-center w-full rounded-[19px] bg-gray-light h-8`}>
        <ShoppingCartSvgIcon color='#424242' width={17} height={16} />
      </button>
      {/* notification */}
      {user?.shoppingCarts && user.shoppingCarts.length > 0 && <div className='absolute top-[-5px] right-[-5px] flex flex-row justify-center items-center w-[18px] h-[18px] bg-[#FFC700] rounded-[100%]'>
        <h5 className='font-poppins-600 text-[10px] text-purple leading-6'>
          {user.shoppingCarts.length}
        </h5>
      </div>}
      <ShoppingCartModal />
    </section>
  )
}

export default ShoppingCartBtn
