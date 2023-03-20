import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ICommonProps, ITab, ProfileSettingsTabsType } from '../../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { setConnectWalletsModal } from '../../../redux/features/userSlice'

interface IProps extends ICommonProps {
  tabs: ITab[]
  tab: ProfileSettingsTabsType
}

const Sidebar = (props: IProps) => {
  const { tabs, tab } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    setUser(_user)
  }, [_user])

  const onClick = (tab: string) => {
    if (['featured_items'].includes(tab)) {
      if (!user?.walletAddress) {
        dispatch(setConnectWalletsModal(true))
      } else {
        router.push(
          {
            pathname: '/account/settings',
            query: {
              'tab': tab,
            },
          },
          undefined,
          {
            scroll: false
          }
        )
      }
    } else {
      router.push(
        {
          pathname: '/account/settings',
          query: {
            'tab': tab,
          },
        },
        undefined,
        {
          scroll: false
        }
      )
    }
  }

  return (
    <section className='w-[239px] pr-[14px] border-r border-solid border-[#D6CCE4]'>
      <ul className='w-full'>
        {tabs.length > 0 && tabs.map((_tab: ITab, index: number) => (
          <li key={index}>
            <button
              onClick={() => onClick(_tab.slug)}
              className={`flex flex-row justify-start items-center w-[225px] h-[49px] ${tab === _tab.slug? 'bg-[#DCD7E4]' : ''} hover:shadow-md hover:border-t hover:border-t-slate-100 rounded-[3px] pl-5 ease-in duration-150`}
            >
              <_tab.icon color='#8B6EAE' width={_tab.iconWidth} height={_tab.iconHeight} />
              <h3 className={`${tab === _tab.slug? 'font-poppins-600' : 'font-poppins-400'} text-sm text-purple-lighter leading-[98/3%] ml-[14px]`}>
                {_tab.name}
              </h3>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Sidebar
