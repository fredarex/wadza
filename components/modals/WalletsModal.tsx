import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { IModal, IWalletOption } from '../../types/types'
import WalletOptionBtn from '../buttons/WalletOptionBtn'
import { CloseSvgIcon } from '../icons'
import MetamaskIcon from '../../assets/wallets/metamask.webp'
import WalletConnectIcon from '../../assets/wallets/walletconnect.webp'
import CoinbaseIcon from '../../assets/wallets/coinbase.webp'
import TrustWalletIcon from '../../assets/wallets/trustwallet.webp'
import OkseWalletIcon from '../../assets/wallets/oksewallet.webp'
import BinanceWalletIcon from '../../assets/wallets/binancewallet.webp'
import { useMetamask } from '../../contexts/Metamask.context'
import { signin } from '../../api/auth'
import {
  loginSuccess,
} from '../../redux/features/userSlice'
import { RootState } from '../../redux/store'
import { bscWallet, coinbaseWallet, trustwallet, walletconnect } from '../../utils/connectors'
import { useWeb3React } from '@web3-react/core'
import { isMobile } from 'react-device-detect'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  accept?: () => void
}

const WalletsModal = (props: IProps) => {
  const { isOpen, title, close, accept } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const context = useWeb3React()
  const { activate, account } = context
  const { connect } = useMetamask()
  const referredCode: string = useSelector((state: RootState) => state.user.referredCode)
  const dispatch = useDispatch()
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [])

  useEffect(() => {
    const signinWithOtherWallets = async () => {
      const body = {
        walletAddress: account || '',
        referredCode: referredCode || '',
      }
      const res = await signin(body)
      if (!res?.data?.error && res?.data?.data) {
        dispatch(loginSuccess(res))
      } else {
        toast.error(res?.data?.error || 'Unexpected error occurred')
      }
      
      close()
    }

    if (account) {
      signinWithOtherWallets()
    }
  }, [account, close, dispatch, referredCode])

  const connectMetamask = async () => {
    try {
      const address: any = await connect()
      if (!address) {
        return
      }
      
      const body = {
        walletAddress: address,
        referredCode: referredCode || '',
      }
      const res = await signin(body)
      if (!res?.data?.error && res?.data?.data) {
        dispatch(loginSuccess(res))
      } else {
        toast.error(res?.data?.error || 'Unexpected error occurred')
      }
      
      close()
    } catch (error) {
      console.log(error)
    }
  }

  const connectBscWallet = async () => {
    try {
      await bscWallet.activate()

      const account = await bscWallet.getAccount()
      
      const body = {
        walletAddress: account || '',
        referredCode: referredCode || '',
      }
      const res = await signin(body)
      if (!res?.data?.error && res?.data?.data) {
        dispatch(loginSuccess(res))
      } else {
        toast.error(res?.data?.error || 'Unexpected error occurred')
      }
      
      close()
    } catch (error) {
      console.log(error)
    }
  }

  const WALLETS: IWalletOption[] = [
    {
      title: 'MetaMask',
      icon: MetamaskIcon,
      onClick: connectMetamask,
    },
    {
      title: 'WalletConnect',
      icon: WalletConnectIcon,
      onClick: () => activate(walletconnect),
    },
    {
      title: 'Coinbase Wallet',
      icon: CoinbaseIcon,
      onClick: () => activate(coinbaseWallet),
    },
    {
      title: 'Trust Wallet',
      icon: TrustWalletIcon,
      onClick: () => _isMobile?  activate(trustwallet) : {},
    },
    {
      title: 'Okse Wallet',
      icon: OkseWalletIcon,
      onClick: () => window.open('https://app.okse.io/#/card', '_blank'),
    },
    {
      title: 'Binance Wallet',
      icon: BinanceWalletIcon,
      onClick: connectBscWallet,
    }
  ]

  useEffect(() => {
    const handler = (event: any) => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        close()
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [close])

  return (
    <>
      {isOpen ? (
        <>
          <div
            className='flex fixed justify-center items-center inset-0 z-50'
          >
            <div
              ref={modalRef}
              className='max-w-[578px] w-full'
            >
              {/*content*/}
              <div className='flex flex-col w-full bg-white rounded-[15px]'>
                {/*header*/}
                <div className='flex items-start justify-between pt-[23px] pb-5 px-[26px] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                  <span className='w-[23px]'>&nbsp;</span>
                  <span className='font-poppins-600 text-lg text-purple leading-6'>
                    {title}
                  </span>
                  <button
                    onClick={close}
                  >
                    <CloseSvgIcon color='#3C1361' />
                  </button>
                </div>
                {/*body*/}
                <div className='pt-5 px-[39px] pb-[26px]'>
                  <div className='flex flex-row justify-center items-center text-center mb-[17px]'>
                    <span className='max-w-[423px] w-full font-poppins-400 text-[15px] text-purple leading-6'>
                      If you don&apos;t have a wallet yet, you can select a provider and create one now
                    </span>
                  </div>
                  {WALLETS.length > 0 && WALLETS.map((wallet: IWalletOption, index: number) => (
                    <WalletOptionBtn key={index} title={wallet.title} className='mb-[14px]' onClick={wallet.onClick}>
                      <Image
                        src={wallet.icon}
                        alt='wallet icon'
                        className='w-[26px] h-[26px]'
                      />
                    </WalletOptionBtn>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  );
}

export default WalletsModal
