import React, { useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ArrowDownSvgIcon } from '../icons'
import { CurrencyType, ICommonProps } from '../../types/types'
import { setUpdatedCurrency } from '../../redux/features/userSlice'

const CURRENCYS: CurrencyType[] = [
  'USD',
  'ETH',
]

const CurrencyExchangeBtn = (props: ICommonProps) => {
  const { className } = props
  const dispatch = useDispatch()
  const _user = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    setUser(_user)
  }, [_user])

  const exchangeCurrency = (currency: string) => {
    dispatch(setUpdatedCurrency(currency))
  }

  return (
    <section className={` ${className}`}>          
      <Menu as={'div'} className='relative inline-block'>
        <Menu.Button className='flex flex-row justify-center items-center w-[70px] h-[31px] bg-gray-light rounded-[21px] py-[7px] px-[13px]'>
          <span className='font-poppins-600 text-xs text-black-light leading-[18px] mr-[6px]'>
            ${user?.currency}
          </span>
          <ArrowDownSvgIcon color='#424242' width={10} height={6} />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className='absolute mt-2 left-0 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className="p-3">
              {CURRENCYS.length > 0 && CURRENCYS.map((currency: CurrencyType, index: number) => (
                <Menu.Item key={index}>
                  <button
                    className='flex w-full items-center font-poppins-600 text-xs text-black-light leading-[18px] rounded-md px-2 py-2 hover:bg-purple hover:text-white'
                    onClick={() => exchangeCurrency(currency)}
                  >
                    ${currency}
                  </button>
                </Menu.Item> 
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </section>
  )
}

export default CurrencyExchangeBtn
