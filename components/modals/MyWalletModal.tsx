import React, { useEffect, useRef, useState } from 'react'
import Web3 from '../../helpers/web3'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { getAllERC20Tokens } from '../../api/user'
import { useMetamask } from '../../contexts/Metamask.context'
import { setAddFundsModal, setLoginModal, setMyWalletModal } from '../../redux/features/userSlice'
import { IModal } from '../../types/types'
import { abbreviationFormat, convertCryptoToCash } from '../../utils/utils'
import { ArrowDownSvgIcon, CloseSvgIcon } from '../icons'
import { NoItems } from '../_account'
import { RootState } from '../../redux/store'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
}

const MyWalletModal = (props: IProps) => {
  const { isOpen, title, close } = props
  const { account, connect, chain } = useMetamask()
  const dispatch = useDispatch()
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [user, setUser] = useState<any>({})
  const modalRef = useRef<HTMLDivElement>(null)
  const [tokens, setTokens] = useState<any[]>([])
  const [totalBalance, setTotalBalance] = useState<number>(0)

  useEffect(() => {
    setUser(_user)
    if (_user) {
      if (account && chain) {
        let fetched: boolean = false
        const getData = async () => {
          let _real: any[] = []
          let _totalBalance: number = 0
          if (!fetched) {
            const web3 = Web3.instance
            const etherBalance = await web3.eth.getBalance(account)          
            const ethUsdPrice = await convertCryptoToCash(web3.utils.fromWei(etherBalance, 'ether'), 'ETH/USD')
    
            _totalBalance += Number(ethUsdPrice)
            
            _real = [
              {
                chain: chain?.hex || '',
                decimals: 18,
                name: 'Ethereum',
                symbol: 'ETH',
                balance: web3.utils.fromWei(etherBalance, 'ether'),
                usdPrice: ethUsdPrice,
              }
            ]
  
            fetched = true
          }
  
          const getResult = await getAllERC20Tokens({chain: chain.slug})
  
          if (!getResult?.data?.error && getResult?.data?.data) {
            const _tokens = getResult.data.data as any[]
            
            if (_tokens.length > 0) {
              for (const _token of _tokens) {
                const symbol: string = _token?.token?.symbol || ''
                let _symbol: string = ''
                switch(symbol) {
                  case 'WETH':
                    _symbol = 'ETH'
                    break
                  case 'USDC':
                    _symbol = 'USDT'
                    break
                  default:
                    _symbol = symbol
                }
  
                const balance: number = Number(_token?.value) || 0
                const usdPrice = await convertCryptoToCash(balance, `${_symbol}/USD`)
                _totalBalance += Number(usdPrice) || 0
  
                _real = [
                  ..._real,
                  {
                    ..._token?.token,
                    balance: balance.toFixed(4),
                    usdPrice,
                  }
                ]
              }
            }
          }
          setTokens(_real)
          setTotalBalance(_totalBalance)
        }
  
        getData()
      }
      // else {
      //   connect()
      // }
    }
  }, [account, chain, _user])

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

  const openAddFundsModal = () => {
    dispatch(setMyWalletModal(false))
    dispatch(setAddFundsModal(true))
  }

  return (
    <>
      {isOpen ? (
        <>
          <div
            className={`${isOpen ? 'translate-x-0' : 'translate-x-[437px]'} flex fixed justify-end items-start mt-[47px] mr-[52px] inset-0 z-50 ease-in-out duration-150`}
          >
            <div
              ref={modalRef}
              className='max-w-[448px] w-full'
            >
              {/*content*/}
              <div className='flex flex-col w-full bg-white rounded-[15px]'>
                {/*header*/}
                <div className='flex items-start justify-between pt-[23px] pb-5 px-[26px] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                  <span className='flex flex-row items-center'>
                    <h4 className='font-poppins-600 text-lg text-purple leading-6 mr-2'>{title}</h4>
                    <ArrowDownSvgIcon color='#3C1361' width={13} height={7} />
                    <div className='flex flex-row justify-center items-center w-[112px] h-[29px] bg-[#F0ECF5] rounded ml-[18px]'>
                      <h4 className='font-poppins-400 text-sm text-[#9C9C9C] leading-6'>
                        {abbreviationFormat(user?.walletAddress || '', 6, 4)}
                      </h4>
                    </div>
                  </span>
                  <button
                    onClick={close}
                  >
                    <CloseSvgIcon color='#3C1361' />
                  </button>
                </div>
                {/*body*/}
                <div className='flex flex-col p-6'>
                  <div className='flex flex-col w-full'>
                    <div className='flex flex-col justify-center items-center w-full h-[125px] border-t border-x border-[#F0ECF5] rounded-[19px_19px_0_0]'>
                      <h4 className='font-poppins-400 text-[17px] text-[#D1CBD9] leading-6'>
                        <FormattedMessage id='page.modal.my_wallet.label.total_balance' />
                      </h4>
                      <div className='flex flex-row mt-2'>
                        <h3 className='font-poppins-600 text-2xl text-purple leading-6 mr-[14px]'>
                          {`$${Number(totalBalance.toFixed(2)).toLocaleString('en-US')} USD`}
                        </h3>
                      </div>
                    </div>
                    <button onClick={() => openAddFundsModal()} className='flex flex-row justify-center items-center w-full h-[62px] bg-purple hover:bg-purple-light rounded-[0_0_19px_19px]'>
                      <h4 className='font-poppins-600 text-[18px] text-white leading-[27px]'>
                        <FormattedMessage id='page.modal.add_funds.title' />
                      </h4>
                    </button>
                  </div>
                  {tokens.length > 0 ? <div className='mt-6 h-[270px] overflow-y-auto'>
                    {
                      tokens.map((token: any, index: number) => (
                        <div className='flex flex-row justify-between items-center w-full h-[71px] border border-solid border-[#F0ECF5] rounded-[19px] px-6 mb-2' key={index}>
                          <div className='flex flex-col justify-center'>
                            <h2 className='font-poppins-600 text-[17px] text-purple leading-6'>
                              {token?.name || ''}
                            </h2>
                            <h3 className='font-poppins-400 text-sm text-[#A997BF] leading-6'>
                              {token?.symbol || ''}
                            </h3>
                          </div>
                          <div className='flex flex-col justify-center items-end'>
                            <h2 className='font-poppins-600 text-[17px] text-purple leading-6'>
                              {`${Number(token?.balance || 0).toLocaleString('en-US')} ${token?.symbol}` || ''}
                            </h2>
                            <h3 className='font-poppins-400 text-sm text-[#A997BF] leading-6'>
                              {`${Number(token?.usdPrice || 0).toLocaleString('en-US')} USD` || ''}
                            </h3>
                          </div>
                        </div>
                      ))
                    }
                  </div>  : <div className='flex flex-row justify-center items-center w-full h-[275px] border border-dashed border-[#DED5EA] rounded-[19px] mt-6'>
                    <NoItems
                      width={57}
                      height={50}
                      imageWidth={`w-[109px]`}
                      imageHeight={`h-[109px]`}
                      fontSize={`text-[17px]`}
                      margin={`mt-[13px]`}
                    />
                  </div>}                  
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  )
}

export default MyWalletModal
