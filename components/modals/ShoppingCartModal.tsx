import Lottie from 'lottie-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setPurchasingResultModal, setShoppingCartModal, setShoppingCarts } from '../../redux/features/userSlice'
import { RootState } from '../../redux/store'
import { getItemsByIds } from '../../api/item'
import { multiPurchaseNFT } from '../../api/contracts/sale'
import { convertCryptoToCash } from '../../utils/utils'
import { useMetamask } from '../../contexts/Metamask.context'
import { ArrowDownSvgIcon, CloseSvgIcon } from '../icons'
import NftCartItem from '../_assets/_modal/NftCartItem'
import Loading from '../../assets/lotties/loading.json'
import { currencies as usefullCurrencies } from '../../config'
import { newMultipleSale } from '../../api/sale'
import PurchasingResultModal from './PurchasingResultModal'

const ShoppingCartModal = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const user: any = useSelector((state: RootState) => state.user)
  const { account, signMessage } = useMetamask()
  const modalRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<any[]>([])
  const [totalPrice, setTotalPrice] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [purchaseTxHash, setPurchaseTxHash] = useState<any>({ status: '', txHash: '', })

  const close = useCallback(() => {
    dispatch(setShoppingCartModal(false))
  }, [dispatch])

  const getItems = async (data: any) => {
    const results = await getItemsByIds(data)
    if (!results?.data?.error) {
      const _items = results?.data?.data

      let _totalPrice: number = 0
      if (_items?.length > 0) {
        for (const _item of _items) {
          _totalPrice += Number(_item.price)
        }
        const _totalPriceUSD = await convertCryptoToCash(_totalPrice)
        setTotalPrice({
          price: _totalPrice,
          usdPrice: _totalPriceUSD,
        })
      }
      setItems(_items)
    }
  }

  useEffect(() => {
    if (user?.shoppingCarts && user?.shoppingCarts.length > 0) {
      const shoppingCarts = user.shoppingCarts

      getItems({ids: shoppingCarts})
    } else {
      setItems([])
    }
  }, [user])

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

  const purchase = async () => {
    try {
      if (!account) {
        const message = 'Welcome to Wadza! Sign for purchasing NFT'
        await signMessage(message)
      }
      
      setLoading(true)
      const purchaseLoading = toast.loading('Please wait while for purchasing...')

      let purchaseData: any[] = []
      let saveData: any[] = []
      for (const item of items) {
        let creatorAddresses: string[] = []
        let creatorFeePercentages: number[] =[]
        
        const creatorFees: any[] = item.collectionId?.creatorFees || []
        if (creatorFees.length > 0) {
          for (const fee of creatorFees) {
            creatorAddresses = [
              ...creatorAddresses,
              fee.address,
            ]
            creatorFeePercentages = [
              ...creatorFeePercentages,
              fee.percentage,
            ]
          }
        }

        const _currency = usefullCurrencies.filter((_c: any) => _c.name === item?.currency)
  
        const data = {
          tokenAddress: item.tokenAddress,
          tokenId: item.tokenId,
          seller: item.seller?.walletAddress,
          price: item.price,
          currency: _currency[0]?.address!,
          creatorAddresses,
          creatorFeePercentages
        }
  
        purchaseData = [
          ...purchaseData,
          data,
        ]

        saveData = [
          ...saveData,
          {
            value: item?.price,
            currency: item?.currency,
            itemId: item?._id,
          }
        ]
      }
  
      const purchaseResult = await multiPurchaseNFT(
        purchaseData, 
        user?.user?.walletAddress,
        true,
        totalPrice?.price
      )
      
      if (purchaseResult?.data && !purchaseResult?.data?.err) {
        const txHash = purchaseResult?.data?.transactionHash || ''
        const saveResult = await newMultipleSale({data: saveData}, txHash)
        if (!saveResult?.data?.error) {
          setPurchaseTxHash({ status: 'success', txHash, })  
          dispatch(setShoppingCartModal(false))
          dispatch(setShoppingCarts([]))
          toast.update(purchaseLoading, { render: 'Purchased successfully', type: 'success', isLoading: false, autoClose: 3000 })
          setLoading(false)

          if (txHash) {
            dispatch(setPurchasingResultModal(true))
          }
        }
      } else {
        setPurchaseTxHash({ status: 'failed', txHash: '', })
        toast.update(purchaseLoading, { render: purchaseResult?.data?.err?.message || purchaseResult?.err, type: 'info', isLoading: false, autoClose: 3000 })
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const clearAll = () => {
    dispatch(setShoppingCarts([]))
  }

  return (
    <>
      {user?.shoppingCartModal && <>
        <div
          className={`${user?.shoppingCartModal ? 'translate-x-0' : 'translate-x-[437px]'} flex fixed justify-end items-start mt-[47px] mr-[52px] inset-0 z-50 ease-in-out duration-150`}
        >
          <div
            ref={modalRef}
            className='max-w-[390px] w-full min-h-[495px]'
          >
            {/*content*/}
            <div className='flex flex-col w-full h-full bg-white rounded-[15px]'>
              {/*header*/}
              <div className='flex items-start justify-between pt-[23px] pb-5 px-[26px] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                <span className='w-[23px]'>&nbsp;</span>
                <span className='font-poppins-600 text-lg text-purple leading-6'>
                  <FormattedMessage id='page.shopping_cart.modal.title' />
                </span>
                <button
                  onClick={close}
                >
                  <CloseSvgIcon color='#3C1361' />
                </button>
              </div>
              {/*body*/}
              <div className='pt-[22px] pb-8 px-[25px]'>
                {items.length > 0? <div className='flex flex-col'>
                  {/* count */}
                  <div className='flex flex-row justify-between items-center'>
                    <h4 className='font-poppins-400 text-[15px] text-purple leading-6'>
                      {`${items.length} ${intl.formatMessage({ 'id': 'page.collection_detail.label.items' }).toLowerCase()}`}
                    </h4>
                    <h4 onClick={() => clearAll()} className='font-poppins-400 text-[15px] text-purple leading-6 underline cursor-pointer'>
                      <FormattedMessage id='page.nft_detail.history.clear_all' />
                    </h4>
                  </div>
                  {/* items */}
                  <div className='mt-[13px] overflow-y-auto max-h-[200px]'>
                    {items.map((item: any, index: number) => (
                      <NftCartItem
                        key={index}
                        collection={item?.collectionId}
                        item={item}
                        royalities={true}
                      />
                    ))}
                  </div>
                  {/* total price */}
                  <div className='flex flex-row justify-between'>
                    <h3 className='font-poppins-600 text-[15px] text-purple leading-6'>
                      <FormattedMessage id='page.shopping_cart.modal.label.total_price' />
                    </h3>
                    <div className='flex flex-col justify-start items-end'>
                      <h3 className='font-poppins-600 text-[15px] text-purple leading-6'>
                        {`${Number(totalPrice?.price).toFixed(3)} ETH`}
                      </h3>
                      <h4 className='font-poppins-600 text-xs text-[#9C9C9C] leading-6'>
                        {`${totalPrice?.usdPrice} USD`}
                      </h4>
                    </div>
                  </div>
                  {/* send to a different wallet */}
                  <div className='flex flex-row justify-between items-center mt-6'>
                    <h3 className='font-poppins-400 text-[15px] text-purple leading-6'>
                      <FormattedMessage id='page.shopping_cart.modal.label.sent_to_a_different_wallet' />
                    </h3>
                    <ArrowDownSvgIcon color='#3C1361' width={13} height={8} />
                  </div>
                  {/* purchase button */}
                  {<button onClick={() => purchase()} disabled={loading} className={`flex flex-row justify-center items-center w-full h-[38px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-[19px] mt-5 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-[15px] text-white leading-[22px]'>
                      <FormattedMessage id='page.shopping_cart.modal.button.complete_purchase' />
                    </h4>}
                  </button>}
                </div> : <div className='flex flex-row justify-center'>
                  <h3 className='font-poppins-400 text-base text-[#9C9C9C] leading-6'>
                    <FormattedMessage id='page.shopping_cart.modal.label.add_items_to_get_started' />
                  </h3>
                </div>}
              </div>
            </div>
          </div>
        </div>
        <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
      </>}
      <PurchasingResultModal txHash={purchaseTxHash} />
    </>
  )
}

export default ShoppingCartModal
