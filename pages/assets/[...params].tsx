import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useLottie } from 'lottie-react'
import { FormattedMessage, useIntl } from 'react-intl'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { addDays } from 'date-fns'

import { getLikes, likeListing } from '../../api/listing'
import { acceptOffer, getTreasuryPercentage, purchaseNFT } from '../../api/contracts/sale'
import { newSale } from '../../api/sale'
import { listingAddeds, subgraphClient } from '../../api/subgraph'
import { cancelOffer, getOfferById, newOffer, saveAcceptOffer } from '../../api/offer'
import { approveERC721NFTs } from '../../api/contracts/erc721'
import { getItemById } from '../../api/item'

import { useMetamask } from '../../contexts/Metamask.context'
import { RootState } from '../../redux/store'
import useNftDetail from '../../hooks/useNftDetail'
import { IContractConfig, INftAttributeData, INftStatsData, IOffer } from '../../types/types'
import Web3 from '../../helpers/web3'
import { contractAddresses, contracts, currencies as usefullCurrencies } from '../../config'
import constants from '../../utils/constants'
import { abbreviation, abbreviationBasic, abbreviationFormat, convertCryptoToCash } from '../../utils/utils'
import Loading from '../../assets/lotties/loading.json'

import { LevelItem, PropertyItem, StatItem } from '../../components/_create_nft/_attribute_items'
import { ListingHistory, NftDetailItem, PriceChart, OfferHistory } from '../../components/_assets/_detail'
import ToolTip from '../../components/tooltip'
import Counter from '../../components/counter'
import { ListSection } from '../../components/_assets'
import { NoItems } from '../../components/_account'
import { PurchaseModal, OfferModal, AcceptModal } from '../../components/_assets/_modal'
import {
  ArrowDownSvgIcon, ArrowUpSvgIcon, ChartSvgIcon, EthereumSvgIcon, EtherscanSvgIcon, GlobeSvgIcon, HeartLinedSvgIcon,
  HeartSvgIcon, Layout2SvgIcon, LayoutSvgIcon, MediumSvgIcon, MenuSvgIcon, ShareSvgIcon, StarSvgIcon, TelegramSvgIcon,
  ThreeDotsSavgIcon, ExpandSvgIcon, VerifiedSvgIcon, ChartLineSvgIcon, TagSvgIcon, EyeSvgIcon, ShoppingCartSvgIcon, LightningSvgIcon, SendSvgIcon,
} from '../../components/icons'
import CancelOfferModal from '../../components/_assets/_modal/CancelOfferModal'
import { setMintedModal, setShoppingCarts } from '../../redux/features/userSlice'
import MintedModal from '../../components/_assets/_modal/MintedModal'
import { useWeb3React } from '@web3-react/core'

const styles = {
  socialBtn: 'flex justify-center items-center w-[33px] h-[33px] bg-[#E2DCEA] rounded-[3px] mr-1 cursor-pointer hover:shadow-sm hover:scale-[1.05] ease-in duration-150',
  nftDetailValue: 'font-poppins-400 text-xs text-purple-lighter hover:text-purple-light leading-[98.3%] cursor-pointer',
  referBtn: 'flex justify-center items-center w-[27px] h-[26px] bg-purple-lightest rounded-sm hover:shadow-sm hover:scale-[1.01]',
  purchaseBtn: 'flex flex-row justify-center items-center h-11 font-poppins-600 text-[13px] leading-[98.3%] hover:shadow-sm ease-in duration-150',
}

const NFTDetail = () => {
  const router = useRouter()
  const params = useMemo(() => (router.query.params as string[]) || [], [router])
  const dispatch = useDispatch()

  const [lz, setLZ] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false) // purchase NFT
  const [likeLoading, setLikeLoading] = useState<boolean>(false)
  const [offerLoading, setOfferLoading] = useState<boolean>(false)
  const [acceptOfferLoading, setAcceptOfferLoading] = useState<boolean>(false)
  const [cancelOfferLoading, setCancelOfferLoading] = useState<boolean>(false)

  const { nft: nftData, collection, owner: ownerData, creator, isListPage, status, message } = useNftDetail(params)
  const intl = useIntl()
  const { chain, account: metamaskAccout, signMessage } = useMetamask()
  const context = useWeb3React()
  const { account } = context
  const _user: any = useSelector((state: RootState) => state.user.user)
  const externalUser: any = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<any>({})
  const { initPriceChartOptions } = constants()

  const [nft, setNft] = useState<any>({})
  const [owner, setOwner] = useState<any>({})

  const [openProperties, setOpenProperties] = useState<any>({ properties: true, levels: false, stats: false, collectionDescription: false, nftDetail: false, })
  const [openHistory, setOpenHistory] = useState<any>({ price: true, listing: false, offer: false, })
  const [openModal, setOpenModal] = useState<any>({ purchase: false, offer: false, acceptOffer: false, cancelOffer: false, })

  const priceChartLabels = ['Jan 22', 'Jul 22']
  const [priceChartData, setPriceChartData] = useState({
    labels: priceChartLabels,
    datasets: [
      {
        type: 'line' as const,
        borderColor: '#3C1361',
        borderWidth: 2,
        fill: false,
        data: [0.01, 0.008],
        pointStyle: 'circle',
        pointRadius: 1,
      },
      {
        type: 'bar' as const,
        backgroundColor: '#CABFD8',
        data: [0.01, 0.008],
        border: {
          display: false,
        },
        borderRadius: 4,
        maxBarThickness: 26,
      },
    ],
  })
  const [priceChartOptions, setPriceChartOptions] = useState<any>(initPriceChartOptions)

  const [hasUserLiked, setHasUserLiked] = useState<boolean>(false)
  const [likes, setLikes] = useState<number>(0)
  const [isOwner, setIsOwner] = useState<boolean>(false)

  const [items, setItems] = useState<any[]>([])
  const [sales, setSales] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [currentItem, setCurrentItem] = useState<any>({})
  const [bestOffer, setBestOffer] = useState<any>({})
  const [purchaseData, setPurchaseData] = useState<any>({})
  const [purchaseTxHash, setPurchaseTxHash] = useState<any>({ status: '', txHash: '', })

  const [allListings, setAllListings] = useState<any[]>([])
  const [offerData, setOfferData] = useState<any>({
    price: '',
    usdPrice: '',
    expiry: moment(addDays(new Date(), 3)).unix(),
  })
  const [selectedOffer, setSelectedOffer] = useState<any>({})

  const loadingOptions = {
    animationData: Loading,
    loop: true,
    autoplay: true,
  }
  const loadingStyle = {
    width: 60,
    height: 95,
  }
  const { View: LoadingView } = useLottie(loadingOptions, loadingStyle)

  useEffect(() => {
    setUser(_user)
  }, [_user])

  useEffect(() => {
    if (status) {
      setLZ(false)
      if (status === 'failed') {
        toast.error(message)
      }
    }
    setNft(nftData)
    setOwner(ownerData)
  }, [nftData, ownerData, status, message])

  const fetchLikes = useCallback(
    async (listingId: string) => {
      try {
        const { error, data }: any = await getLikes(listingId)
        if (error) console.log(error)
        if (data) {
          const usersLiked = data?.data[0]?.users
          if (usersLiked?.includes(_user?._id)) {
            setHasUserLiked(true)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  , [_user])

  // fetch likes, offers, 
  useEffect(() => {
    const getData = async () => {
      if (Object.keys(nft).length > 0) {
        setLikes(nft?.likes)
        await fetchLikes(nft?._id)
        setIsOwner(owner?.walletAddress === _user?.walletAddress)
      }

      /** items, current listed item */
      let _currentItemData: any = null
      if (nft?.items && nft?.items.length > 0) {
        /** get current listed item */
        const _currentItem = nft.items[nft.items.length - 1]
        if (!_currentItem.isSold) {
          const _getItemData: any = await getItemById(_currentItem._id)
          _currentItemData = _getItemData?.data?.data
          setCurrentItem({
            ..._currentItemData,
            usdPrice: _currentItemData?.price? await convertCryptoToCash(_currentItemData.price) : '',
            addedCart: externalUser?.shoppingCarts?.length > 0 && externalUser?.shoppingCarts?.includes(_currentItemData._id)? true : false,
          })
        }

        /** get all formatted offers */
        const _items = nft.items.map(async (_item: any, index: number) => {
          if (!_item.isSold && _item.isActive) {
            const itemData: any = await getItemById(_item._id)
            const item = itemData.data?.data
            const usdPrice = await convertCryptoToCash(item.price)
    
            // expiration
            let c_expiry: string = ''
            const remaining = moment(new Date(Number(item.expiryDate) * 1000)).diff(new Date())
            if (remaining < 0) {
              c_expiry = 'Expired'
            } else {
              const diffDuration = moment.duration(remaining)
              const months = diffDuration.months()
              const days = diffDuration.days()
              const hours = diffDuration.hours()
              const minutes = diffDuration.minutes()
              const seconds = diffDuration.seconds()
    
              if (months > 0 && days >= 15) {
                c_expiry = `${months + 1} months`
              } else if (months > 0 && days < 15) {
                c_expiry = `${months} months`
              } else if (days > 0 && hours >= 12) {
                c_expiry = `${days + 1} days`
              } else if (days > 0 && hours < 12) {
                c_expiry = `${days} days`
              } else if (hours > 0 && minutes >= 30) {
                c_expiry = `${hours + 1} hours`
              } else if (hours > 0 && minutes < 30) {
                c_expiry = `${hours} hours`
              } else if (minutes > 0 && seconds >= 30) {
                c_expiry = `About ${minutes + 1} minutes`
              } else if (minutes > 0 && seconds < 30) {
                c_expiry = `${minutes} minutes`
              }
            }
    
            // from
            let c_from: string = ''
            c_from = item.seller?.username? item.seller.username : String(item.seller?.walletAddress).replace('0x', '').substring(0, 6).toUpperCase()
    
            // check maker
            let is_maker: boolean = false
            if (String(item.seller?.walletAddress).toUpperCase() === String(user?.walletAddress).toUpperCase())
              is_maker = true
            
            return {
              ...item,
              usdPrice,
              c_expiry,
              c_from,
              is_maker,
            }
          }
        })
        setItems((await Promise.all(_items)).filter((_item: any, index: number) => _item !== undefined))
      }

      /** offers, the best offer */
      if (nft?.offers && nft?.offers.length > 0) {
        /** filtered offers whose isAccepted, isCanceled are false */
        const _filteredOffers = nft?.offers.filter((_offer: IOffer) => _offer.isAccepted === false && _offer.isCanceled === false)
        /** get the best offer */
        const _bestOffer: IOffer = _filteredOffers.length > 0? _filteredOffers.reduce((prev: IOffer, current: IOffer) => (prev.value > current.value) ? prev : current) : {}
        setBestOffer({ ..._bestOffer, usdPrice: await convertCryptoToCash(_bestOffer.value) })

        /** get all formatted offers */
        const _offers = nft?.offers.map(async (_offer: any, index: number) => {
          if (!_offer.isAccepted && !_offer.isCanceled) {
            const offerData: any = await getOfferById(_offer._id)
            const offer = offerData.data?.data
            const usdPrice = await convertCryptoToCash(offer.value)
    
            // floor difference
            let c_difference: string = ''
            if (_currentItemData?.price) {
              const itemFloorPrice = Number(_currentItemData.price)
              if (itemFloorPrice !== 0) {
                const difference = Number(offer.value) - itemFloorPrice
                if (difference > 0) {
                  c_difference = `${Math.round(Number(difference / itemFloorPrice * 100))}% above`
                } else {
                  c_difference = `${Math.round(Math.abs(difference) / itemFloorPrice * 100)}% below`
                }
              }
            }
    
            // expiration
            let c_expiry: string = ''
            const remaining = moment(new Date(Number(offer.expiryDate) * 1000)).diff(new Date())
            if (remaining < 0) {
              c_expiry = 'Expired'
            } else {
              const diffDuration = moment.duration(remaining)
              const months = diffDuration.months()
              const days = diffDuration.days()
              const hours = diffDuration.hours()
              const minutes = diffDuration.minutes()
              const seconds = diffDuration.seconds()
    
              if (months > 0 && days >= 15) {
                c_expiry = `${months + 1} months`
              } else if (months > 0 && days < 15) {
                c_expiry = `${months} months`
              } else if (days > 0 && hours >= 12) {
                c_expiry = `${days + 1} days`
              } else if (days > 0 && hours < 12) {
                c_expiry = `${days} days`
              } else if (hours > 0 && minutes >= 30) {
                c_expiry = `${hours + 1} hours`
              } else if (hours > 0 && minutes < 30) {
                c_expiry = `${hours} hours`
              } else if (minutes > 0 && seconds >= 30) {
                c_expiry = `About ${minutes + 1} minutes`
              } else if (minutes > 0 && seconds < 30) {
                c_expiry = `${minutes} minutes`
              }
            }
    
            // from
            let c_from: string = ''
            c_from = offer.offerBy?.username? offer.offerBy.username : String(offer.offerBy?.walletAddress).replace('0x', '').substring(0, 6).toUpperCase()
    
            // check maker
            let is_maker: boolean = false
            if (String(offer.offerBy?.walletAddress).toUpperCase() === String(user?.walletAddress).toUpperCase())
              is_maker = true
            
            return {
              ...offer,
              price: offer.value,
              usdPrice,
              c_difference,
              c_expiry,
              c_from,
              is_maker,
            }
          }
        })
        setOffers((await Promise.all(_offers)).filter((_offer: any, index: number) => _offer !== undefined))
      }
    }
    if (nft?.sales && nft?.sales.length > 0) {
      setSales(nft.sales)
    }

    getData()
  }, [nft, _user, fetchLikes, owner, user, externalUser])

  // fetch all listings, offers for this NFT Id using Wadza subgraph
  useEffect(() => {
    const fetchAll = async () => {
      if (params.length >= 3) {
        const tokenAddress = params[1]
        const tokenId = params[2]
  
        const allListings = await subgraphClient.query({
          query: listingAddeds,
          variables: {
            tokenAddress,
            tokenId,
          }
        })
        setAllListings(allListings?.data?.listingAddeds)
      }
    }

    fetchAll()
  }, [params])

  const handleLikeClick = async () => {
    try {
      if (!likeLoading) {
        setLikeLoading(true)
        if (hasUserLiked) {
          setLikes(likes - 1)
          setHasUserLiked(false)
        } else {
          setLikes(likes + 1)
          setHasUserLiked(true)
        }

        const res = await likeListing(nft._id)
        if (res.data) {
          fetchLikes(nft._id)

          if (res.data.data.message === 'Liked') {
            setHasUserLiked(true)
            setLikeLoading(false)
          } else {
            setLikes(likes - 1)
            setHasUserLiked(false)
            setLikeLoading(false)
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const purchase = async () => {
    try {
      if (!metamaskAccout) {
        const message = 'Welcome to Wadza! Sign for purchasing NFT'
        await signMessage(message)
      }

      setLoading(true)
      const purchaseLoading = toast.loading('Please wait while for purchasing...')
      const creatorAddresses: string[] = []
      const creatorFees: number[] = []

      if (collection?.creatorFees && collection.creatorFees.length > 0) {
        const fees = collection.creatorFees
        fees.map((fee: any, index: number) => {
          creatorAddresses.push(fee.address)
          creatorFees.push(fee.percentage)
        })
      }

      const _currency = usefullCurrencies.filter((_c: any) => _c.name === currentItem?.currency)

      const purchaseResult: any = await purchaseNFT(
        nft?.tokenAddress,
        nft?.tokenId,
        currentItem?.seller?.walletAddress,
        _currency[0]?.address!,
        creatorAddresses,
        creatorFees,
        user?.walletAddress,
        currentItem?.currency === 'ETH',
        currentItem?.price
      )
      
      if (purchaseResult?.data && !purchaseResult?.data?.err) {
        const txHash = purchaseResult?.data?.transactionHash || ''
        setPurchaseTxHash({ status: 'success', txHash, })
        const saleResult = await newSale(currentItem?.price, currentItem?._id, txHash, currentItem?.currency)
        const listingData = saleResult?.data?.data
        setNft(listingData)

        toast.update(purchaseLoading, { render: 'Purchased successfully', type: 'success', isLoading: false, autoClose: 3000 })
        setLoading(false)
      } else {
        setPurchaseTxHash({ status: 'failed', txHash: '', })
        toast.update(purchaseLoading, { render: purchaseResult?.data?.err?.message || purchaseResult?.err, type: 'info', isLoading: false, autoClose: 3000 })
        setLoading(false)
      }
    } catch (error) {
      console.log('error :: ', error)
    }
  }

  const offer = useCallback( async () => {
    try {
      setOfferLoading(true)
      const offerMakingLoading = toast.loading('Please wait while for making offer...')
      const web3 = Web3.instance
      const erc20 = contracts.filter((contract: IContractConfig, index: number) => contract.name === 'ERC20')
      const erc20Contract = new web3.eth.Contract(erc20[0].abi, process.env.NEXT_PUBLIC_GOERLI_WETH)

      /** approve token for sale contract */
      const allowance = await erc20Contract.methods
        .allowance(user?.walletAddress, process.env.NEXT_PUBLIC_NFT_SALE_ADDRESS)
        .call()

      let approveResult: any = {
        status: true,
      }
      if (Number(allowance) < Number(web3.utils.toWei(offerData?.price))) {
        approveResult = await erc20Contract.methods
          .approve(process.env.NEXT_PUBLIC_NFT_SALE_ADDRESS, web3.utils.toWei(String(Number(offerData?.price) * 10000000000)))
          .send({ from: user?.walletAddress })
          .catch((err: any) => {
            console.log(err)
          })
      }

      if (approveResult?.status) {
        const data = {
          value: Number(offerData?.price),
          expiryDate: Number(offerData?.expiry),
          seller: nft?.owner,
        }

        const offerSavingResult = await newOffer(data, nft?._id)
        const listingData = offerSavingResult?.data?.data

        // update nft data including offers, listings, etc
        setNft(listingData)
        setOwner(listingData?.owner)

        setOpenModal((prev: any) => ({ ...prev, offer: false, }))
        toast.update(offerMakingLoading, { render: 'Made offer successfully', type: 'success', isLoading: false, autoClose: 3000 })
        setOfferLoading(false)
      } else {
        toast.update(offerMakingLoading, { render: 'There was an unexpected error', type: 'info', isLoading: false, autoClose: 3000 })
        setOfferLoading(false)
      }
    } catch (error) {
      console.log('error :: ', error)
    }
  }, [user, nft, offerData])

  const handleAcceptOffer = async (offer: any) => {
    const c = usefullCurrencies.filter((c) => c.name === 'WETH')
    const { data } = await getTreasuryPercentage(c[0]?.address!)
    const serviceFee = Number((Number(data) / 100).toFixed(1))

    setSelectedOffer({ ...offer, serviceFee, })
    setOpenModal((e: any) => ({...e, acceptOffer: true}))
  }

  const accept = async () => {
    try {
      if (!metamaskAccout) {
        const message = 'Welcome to Wadza! Sign for accepting offer'
        await signMessage(message)
      }

      setAcceptOfferLoading(true)
      const acceptLoading = toast.loading('Please wait while for accepting offer...')
      const creatorAddresses: string[] = []
      const creatorFees: number[] = []

      if (collection?.creatorFees && collection.creatorFees.length > 0) {
        const fees = collection.creatorFees
        fees.map((fee: any, index: number) => {
          creatorAddresses.push(fee.address)
          creatorFees.push(fee.percentage)
        })
      }

      /** approve */
      const approveResult: any = await approveERC721NFTs(
        user?.walletAddress,
        contractAddresses.NFTSALE!,
        nft?.tokenAddress,
      )

      if (approveResult?.data && !approveResult?.data?.err) {
        /** accept offer */
        const acceptResult: any = await acceptOffer(
          selectedOffer?.offerBy?.walletAddress,
          selectedOffer?.value,
          nft?.tokenAddress,
          nft?.tokenId,
          moment(new Date()).unix(),
          selectedOffer?.expiryDate,
          user?.walletAddress,
          creatorAddresses,
          creatorFees
        )  
        
        if (acceptResult?.data && !acceptResult?.data?.err) {
          const txHash = acceptResult?.data?.transactionHash || ''
          const data = {
            value: Number(selectedOffer.price),
            txHash,
          }
          const saveResult = await saveAcceptOffer(data, selectedOffer?._id)
          const listingData = saveResult?.data?.data

          // update nft data including offers, listings, etc
          setNft(listingData)
          setOwner(listingData?.owner)

          toast.update(acceptLoading, { render: 'Accepted successfully', type: 'success', isLoading: false, autoClose: 3000 })
          setAcceptOfferLoading(false)
        } else {
          toast.update(acceptLoading, { render: acceptResult?.data?.err?.message || acceptResult?.err?.reason, type: 'info', isLoading: false, autoClose: 3000 })
          setAcceptOfferLoading(false)
        }
      } else {
        toast.update(acceptLoading, { render: approveResult?.data?.err?.message, type: 'info', isLoading: false, autoClose: 3000 })
        setAcceptOfferLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancelOffer = async (offer: any) => {
    setSelectedOffer(offer)
    setOpenModal((e: any) => ({...e, cancelOffer: true}))
  }

  const runCancelOffer = async () => {
    try {
      setCancelOfferLoading(true)
      const cancelOfferToastLoading = toast.loading('Please wait while cancel offer...')
      const canceledResult = await cancelOffer(selectedOffer._id)
      const listingData = canceledResult?.data?.data

      // update nft data including offers, listings, etc
      setNft(listingData)
      setOwner(listingData?.owner)

      toast.update(cancelOfferToastLoading, { render: 'Canceled successfully', type: 'success', isLoading: false, autoClose: 3000 })
      setCancelOfferLoading(false)
      setOpenModal({ ...openModal, cancelOffer: false, })
    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = (itemId: string) => {
    if (itemId) {
      if (externalUser?.shoppingCarts) {
        let shoppingCarts: string[] = externalUser?.shoppingCarts
        if (shoppingCarts.length > 0 && shoppingCarts.includes(itemId)) {
          const newShoppingCarts = shoppingCarts.filter((cart: any, index: number) => cart !== itemId)
          dispatch(setShoppingCarts(newShoppingCarts))
        } else {
          const newShoppingCarts = [
            ...shoppingCarts,
            itemId,
          ]
          dispatch(setShoppingCarts(newShoppingCarts))
        }
      } else {
        let shoppingCarts: string[] = []
        const newShoppingCarts = [
          ...shoppingCarts,
          itemId,
        ]
        dispatch(setShoppingCarts(newShoppingCarts))
      }
      setCurrentItem({
        ...currentItem,
        addedCart: true,
      })
    }
  }

  const removeFromCart = (itemId: string) => {
    if (itemId) {
      if (externalUser?.shoppingCarts) {
        let shoppingCarts: string[] = externalUser?.shoppingCarts
        if (shoppingCarts.length > 0 && shoppingCarts.includes(itemId)) {
          const newShoppingCarts = shoppingCarts.filter((cart: any, index: number) => cart !== itemId)
          setCurrentItem({
            ...currentItem,
            addedCart: false,
          })
          dispatch(setShoppingCarts(newShoppingCarts))
        }
      }
    }
  }

  return (
    <section className='flex justify-center mt-[117px]'>
      {!isListPage ? (
        <div className='relative max-w-[1250px] w-full min-h-[420px] mt-[94px] bg-purple-lightest rounded-[15px] p-[41px_61px_55px_40px]'>
          <div className='flex flex-col md:flex-row'>
            {/* left side */}
            <div className='relative flex flex-col max-w-[461px] w-full mr-0 md:mr-10'>
              {/* nft image */}
              <div className='absolute top-[-135px] flex flex-col max-w-[461px] w-full bg-white rounded-[15px] p-3'>
                <div className='flex flex-row justify-between items-center mb-[10px]'>
                  <div className='flex flex-row items-center h-[27px] bg-[rgba(230,226,236,0.53)] rounded px-3'>
                    <EthereumSvgIcon color='#868686' width={9} height={15} />
                    <h4 className='font-poppins-600 text-xs text-[#767676] leading-[98.3%] ml-[11px]'>
                      {chain?.name}
                    </h4>
                  </div>
                  <div className='flex flex-row items-center h-[27px] bg-[rgba(230,226,236,0.53)] rounded px-2'>
                    <h4 className='font-poppins-600 text-xs text-[#767676] leading-[98.3%] mr-[6px]'>
                      {likes || 0}
                    </h4>
                    <span className='cursor-pointer' onClick={() => handleLikeClick()}>
                      <ToolTip tooltip={hasUserLiked ? intl.formatMessage({ 'id': 'page.nft_detail.tooltip.unfavorite' }) : intl.formatMessage({ 'id': 'page.nft_detail.tooltip.favorite' })}>
                        {hasUserLiked ? <HeartSvgIcon color='#767676' width={15} height={12} /> : <HeartLinedSvgIcon color='#767676' width={15} height={12} />}
                      </ToolTip>
                    </span>
                  </div>
                </div>
                <div className='relative w-full overflow-hidden rounded-[7px] pb-[100%]'>
                  {!lz ? (<picture><img
                    src={nft?.image? String(nft.image).includes('ipfs://')? String(nft.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : nft.image : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                    alt='listing image'
                    className='absolute inset-0 max-w-full min-w-full max-h-full min-h-full object-cover hover:scale-125 duration-300 delay-75 cursor-pointer'
                  /></picture>
                  ) : (
                    <div className='absolute top-[35%] left-[42%]'>
                      {LoadingView}
                    </div>
                  )}
                </div>
              </div>
              {/* description */}
              <section className='w-full mt-[386px]'>
                <div className='flex flex-row justify-start items-center w-full h-[49px] pl-8 border border-solid border-[#D7CDE5] rounded-t-[15px]'>
                  <MenuSvgIcon color='#393939' />
                  <h4 className='font-poppins-700 text-sm text-black leading-[98.3%] ml-3'>
                    <FormattedMessage id='page.nft_detail.collection.description.label' />
                  </h4>
                </div>
                <div className='flex flex-col w-full p-[19px_40px_28px_32px] border-x border-b border-solid border-[#D7CDE5]'>
                  <h4 className='flex flex-row font-poppins-400 text-xs text-black leading-[98.3%]'>
                    <FormattedMessage id='page.nft_detail.collection.description.by' />&nbsp;
                    {collection?.creator?.username? abbreviation(collection.creator.username.toUpperCase(), 6) : abbreviation(collection?.creator?.walletAddress.replace('0x', '').toUpperCase(), 6)}
                  </h4>
                  <h4 className='font-poppins-400 text-xs text-black leading-[154.3%] mt-2'>
                    {nft?.description}
                  </h4>
                </div>
              </section>
              {/* properties */}
              {nft?.attributes && nft?.attributes.length > 0 && <section className='flex flex-col'>
                <div onClick={() => setOpenProperties({ ...openProperties, properties: !openProperties.properties })} className='flex flex-row justify-between items-center px-8 py-4 cursor-pointer border-x border-b border-solid border-[#D7CDE5]'>
                  <div className='flex flex-row items-center'>
                    <Layout2SvgIcon color='#393939' width={17} height={17} />
                    <h3 className='font-poppins-700 text-sm text-black leading-[98.3%] ml-[10px]'>
                      <FormattedMessage id='page.nft.creation.attribute.properties.name' />
                    </h3>
                  </div>
                  <div>
                    {openProperties.properties ? <ArrowUpSvgIcon color='#424242' width={9} height={5} /> : <ArrowDownSvgIcon color='#424242' width={9} height={5} />}
                  </div>
                </div>
                {openProperties.properties && <div className='flex flex-col border-x border-b border-solid border-[#D7CDE5] px-[10px] pt-[10px] pb-[3px]'>
                  {nft?.attributes.length > 0 && nft?.attributes.map((attribute: INftAttributeData, index: number) => (
                    <PropertyItem key={index} property={attribute} />
                  ))}
                </div>}
              </section>}
              {/* levels */}
              {nft?.levels && nft?.levels.length > 0 && <section className='flex flex-col'>
                <div onClick={() => setOpenProperties({ ...openProperties, levels: !openProperties.levels })} className='flex flex-row justify-between items-center px-8 py-4 cursor-pointer border-x border-b border-solid border-[#D7CDE5]'>
                  <div className='flex flex-row items-center'>
                    <StarSvgIcon color='#393939' width={17} height={17} />
                    <h3 className='font-poppins-700 text-sm text-black leading-[98.3%] ml-[10px]'>
                      <FormattedMessage id='page.nft.creation.attribute.levels.name' />
                    </h3>
                  </div>
                  <div>
                    {openProperties.levels ? <ArrowUpSvgIcon color='#424242' width={9} height={5} /> : <ArrowDownSvgIcon color='#424242' width={9} height={5} />}
                  </div>
                </div>
                {openProperties.levels && <div className='flex flex-col border-x border-b border-solid border-[#D7CDE5] px-[10px] pt-[10px] pb-[3px]'>
                  {nft?.levels.length > 0 && nft?.levels.map((level: INftStatsData, index: number) => (
                    <LevelItem key={index} level={level} />
                  ))}
                </div>}
              </section>}
              {/* stats */}
              {nft?.stats && nft?.stats.length > 0 && <section className='flex flex-col'>
                <div onClick={() => setOpenProperties({ ...openProperties, stats: !openProperties.stats })} className='flex flex-row justify-between items-center px-8 py-4 cursor-pointer border-x border-b border-solid border-[#D7CDE5]'>
                  <div className='flex flex-row items-center'>
                    <ChartSvgIcon color='#393939' width={17} height={17} />
                    <h3 className='font-poppins-700 text-sm text-black leading-[98.3%] ml-[10px]'>
                      <FormattedMessage id='page.nft.creation.attribute.stats.name' />
                    </h3>
                  </div>
                  <div>
                    {openProperties.stats ? <ArrowUpSvgIcon color='#424242' width={9} height={5} /> : <ArrowDownSvgIcon color='#424242' width={9} height={5} />}
                  </div>
                </div>
                {openProperties.stats && <div className='flex flex-col border-x border-b border-solid border-[#D7CDE5] px-[10px] pt-[10px] pb-[3px]'>
                  {nft?.stats.length > 0 && nft?.stats.map((stat: INftStatsData, index: number) => (
                    <StatItem key={index} stat={stat} />
                  ))}
                </div>}
              </section>}
              {/* about collection */}
              <section className='flex flex-col'>
                <div onClick={() => setOpenProperties({ ...openProperties, collectionDescription: !openProperties.collectionDescription })} className='flex flex-row justify-between items-center px-8 py-4 cursor-pointer border-x border-b border-solid border-[#D7CDE5]'>
                  <div className='flex flex-row items-center'>
                    <MenuSvgIcon color='#393939' width={15} height={11} />
                    <h3 className='inline font-poppins-700 text-sm text-black leading-[98.3%] ml-[10px]'>
                      <FormattedMessage id='page.home.footer.section.label.about' />&nbsp;{collection?.name}
                    </h3>
                  </div>
                  <div>
                    {openProperties.collectionDescription ? <ArrowUpSvgIcon color='#424242' width={9} height={5} /> : <ArrowDownSvgIcon color='#424242' width={9} height={5} />}
                  </div>
                </div>
                {openProperties.collectionDescription && <div className='flex flex-col border-x border-b border-solid border-[#D7CDE5] px-8 pt-[18px] pb-[26px]'>
                  <h4 className='font-poppins-400 text-xs text-black leading-[154.3%] mb-4'>
                    {collection?.description || intl.formatMessage({ 'id': 'page.nft_detail.collection.description.no_description' })}
                  </h4>
                  <div className='flex flex-row'>
                    {collection?.ownWebsite && <div onClick={() => window.open(collection.ownWebsite, '_blank')} className={styles.socialBtn}>
                      <GlobeSvgIcon color='#8B6EAE' width={13} height={16} />
                    </div>}
                    {collection?.mediumAddress && <div onClick={() => window.open(collection.mediumAddress, '_blank')} className={styles.socialBtn}>
                      <MediumSvgIcon color='#8B6EAE' width={15} height={17} />
                    </div>}
                    {collection?.telegramAddress && <div onClick={() => window.open(collection.telegramAddress, '_blank')} className={styles.socialBtn}>
                      <TelegramSvgIcon color='#8B6EAE' width={15} height={17} />
                    </div>}
                    {collection?.address && <div onClick={() => window.open(`${chain?.blockExplorerUrl}/address/${collection.address}`, '_blank')} className={styles.socialBtn}>
                      <EtherscanSvgIcon color='#8B6EAE' width={15} height={17} />
                    </div>}
                    <div className={styles.socialBtn}>
                      <ThreeDotsSavgIcon color='#8B6EAE' width={15} height={17} />
                    </div>
                  </div>
                </div>}
              </section>
              {/* nft detail */}
              <section className='flex flex-col'>
                <div onClick={() => setOpenProperties({ ...openProperties, nftDetail: !openProperties.nftDetail })} className={`flex flex-row justify-between items-center px-8 py-4 cursor-pointer border-x border-b border-solid ${openProperties.nftDetail ? '' : 'rounded-b-[15px]'} border-[#D7CDE5]`}>
                  <div className='flex flex-row items-center'>
                    <LayoutSvgIcon color='#393939' width={13} height={13} />
                    <h3 className='inline font-poppins-700 text-sm text-black leading-[98.3%] ml-[10px]'>
                      <FormattedMessage id='page.nft_detail.collection.nft_detail.details' />
                    </h3>
                  </div>
                  <div>
                    {openProperties.nftDetail ? <ArrowUpSvgIcon color='#424242' width={9} height={5} /> : <ArrowDownSvgIcon color='#424242' width={9} height={5} />}
                  </div>
                </div>
                {openProperties.nftDetail && <div className='flex flex-col border-x border-b border-solid border-[#D7CDE5] rounded-b-[15px] px-[10px] pt-2 pb-1'>
                  <NftDetailItem label={intl.formatMessage({ 'id': 'page.nft_detail.collection.nft_detail.contract_address' })}>
                    <h4 onClick={() => window.open(`${chain?.blockExplorerUrl}/address/${nft?.tokenAddress}`, '_blank')} className={styles.nftDetailValue}>
                      {abbreviationFormat(nft?.tokenAddress, 6, 4)}
                    </h4>
                  </NftDetailItem>
                  <NftDetailItem label={intl.formatMessage({ 'id': 'page.nft_detail.collection.nft_detail.token_id' })}>
                    <ToolTip tooltip={intl.formatMessage({ 'id': 'page.nft_detail.collection.nft_detail.tooltip.copy' })}>
                      <CopyToClipboard text={nft?.tokenId} onCopy={() => toast.success('Copied!')}>
                        <h4 className={styles.nftDetailValue}>
                          {abbreviation(nft?.tokenId, 16)}
                        </h4>
                      </CopyToClipboard>
                    </ToolTip>
                  </NftDetailItem>
                  <NftDetailItem label={intl.formatMessage({ 'id': 'page.nft_detail.collection.nft_detail.token_standard' })}>
                    <h4 className={styles.nftDetailValue}>
                      {collection?.contractType || ''}
                    </h4>
                  </NftDetailItem>
                  <NftDetailItem label={intl.formatMessage({ 'id': 'page.nft_detail.collection.nft_detail.chain' })}>
                    <h4 className={styles.nftDetailValue}>
                      {chain?.name || ''}
                    </h4>
                  </NftDetailItem>
                  {!collection?.address && <NftDetailItem label={intl.formatMessage({ 'id': 'page.nft_detail.collection.nft_detail.metadata' })}>
                    <ToolTip tooltip={intl.formatMessage({ 'id': 'page.nft_detail.collection.nft_detail.metadata.centralized.tooltip' })}>
                      <h4 className={styles.nftDetailValue}>
                        <FormattedMessage id='page.nft_detail.collection.nft_detail.metadata.centralized' />
                      </h4>
                    </ToolTip>
                  </NftDetailItem>}
                  <NftDetailItem label={intl.formatMessage({ 'id': 'page.collection.creation.creator_fee.label' })}>
                    <h4 className={styles.nftDetailValue}>
                      {collection?.creatorFee || 0}%
                    </h4>
                  </NftDetailItem>
                </div>}
              </section>
            </div>
            {/* right side */}
            <div className='relative flex flex-col max-w-[646px] w-full'>
              {/* refer */}
              <div className='absolute top-[-75px] flex flex-row h-[34px] bg-[#F0ECF5] rounded-t p-1'>
                {/* <button className='px-[19px] py-[6px] bg-purple-lightest rounded-sm mr-1 hover:shadow-sm hover:scale-[1.01]'>
                  <h4 className='font-poppins-600 text-xs text-purple-lighter leading-[98.3%]'>
                    <FormattedMessage id='page.nft_detail.collection.nft_detail.button.refer_to_a_friend' />
                  </h4>
                </button> */}
                <button className={`${styles.referBtn} mr-1`}>
                  <SendSvgIcon color='#BCADCE' width={14} height={13} />
                </button>
                <button className={`${styles.referBtn} mr-1`}>
                  <ShareSvgIcon color='#BCADCE' width={10} height={11} />
                </button>
                <button className={`${styles.referBtn} mr-1`}>
                  <ExpandSvgIcon color='#BCADCE' width={13} height={13} />
                </button>
                <button className={`${styles.referBtn}`}>
                  <ThreeDotsSavgIcon color='#BCADCE' width={3} height={15} />
                </button>
              </div>
              {/* nft global data */}
              <div className={`${isOwner ? 'grid grid-cols-1 md:grid-cols-2' : ''}`}>
                <div>
                  <h1 className='font-poppins-700 text-[32px] text-black leading-[104.3%]'>
                    {abbreviation(nft?.name, 14)}
                  </h1>
                  <div className='flex flex-row font-poppins-400 text-xs leading-[98.3%] mt-[14px]'>
                    <h3 className='text-black'>
                      <FormattedMessage id='page.nft_detail.collection.nft_detail.owned_by' />
                    </h3>&nbsp;
                    <h3 className='text-purple-light mr-3'>
                      <b>
                        {owner?.username ? owner.username === user?.username ? 'You' : owner.username : owner?.walletAddress === user?.walletAddress ? 'You' : abbreviationBasic(owner?.walletAddress, 6)}
                      </b>
                    </h3>&middot;
                    <h3 className='text-purple-light ml-3 mr-[6px]'>
                      {collection?.name ? collection.name : abbreviation(collection?.address, 6)}
                    </h3>
                    {collection.isVerified && <VerifiedSvgIcon color='#53317D' width={10} height={10} />}
                  </div>
                  <div className='flex items-center mt-[26px]'>
                    {/* traitsniper related data */}
                    <div className='flex justify-center min-w-[50px] px-4 py-2 bg-[#D7CDE6] rounded'>
                      <h4 className='flex flex-row font-poppins-400 text-xs text-black leading-[98.3%]'>
                        {`#1`}
                      </h4>
                    </div>
                    {/* views */}
                    {nft?.visitors && nft?.visitors.length > 0 && <div className='flex flex-row items-center ml-[53px]'>
                      <EyeSvgIcon color='#393939' width={11} height={8} />&nbsp;
                      <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                        {nft?.visitors && nft?.visitors.length > 0? `${nft?.visitors.length} ${intl.formatMessage({'id': 'page.nft_detail.collection.nft_detail.views'})}` : ''}
                      </h4>
                    </div>}
                    {/* favorites */}
                    {likes > 0 && <div className='flex flex-row items-center ml-[46px]'>
                      <HeartSvgIcon color='#393939' width={10} height={9} />&nbsp;
                      <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                        {likes || 0}&nbsp;<FormattedMessage id='page.nft_detail.collection.nft_detail.favorites' />
                      </h4>
                    </div>}
                  </div>
                </div>
                {/* if is owner */}
                {isOwner && <div className='flex flex-col justify-start items-end'>
                  <button onClick={() => router.push({ pathname: `/assets/${params.join('/')}/sell` })} className={`${styles.purchaseBtn} rounded-[14px] max-w-[219px] w-full text-white bg-purple  hover:bg-purple-light mb-3`}>
                    <FormattedMessage id='page.nft_detail.button.sell' />
                  </button>
                  <button className={`${styles.purchaseBtn} rounded-[14px] max-w-[219px] w-full text-purple border border-solid border-[#BFABD9] hover:bg-purple-lightest`}>
                    <FormattedMessage id='page.nft_detail.button.edit' />
                  </button>
                </div>}
              </div>
              <>
                {/* sale date */}
                {Object.keys(currentItem).length > 0 && 
                  !currentItem?.isSold && 
                  currentItem?.isActive && 
                  Number(currentItem?.expiryDate) > Math.round(new Date().getTime() / 1000) && 
                <div className='flex flex-col w-full border border-solid border-[#D7CDE5] rounded-t-[15px] mt-9 pt-6 pb-7 px-8'>
                  <div className='flex flex-row'>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                      <FormattedMessage id='page.nft_detail.collection.nft_detail.sales_ends' />&nbsp;
                    </h4>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                      {currentItem?.expiryDate ? String(moment.unix(currentItem?.expiryDate).format('MMMM DD, YYYY [at] HH:mm A [GMT]Z')) : ''}
                    </h4>
                  </div>
                  {/* time counter */}
                  {currentItem?.expiryDate && <Counter estimation={currentItem?.expiryDate} />}
                </div>}
                {/* sale data */}
                {Object.keys(currentItem).length > 0 && 
                  !currentItem?.isSold && 
                  currentItem?.isActive && 
                  Number(currentItem?.expiryDate) > Math.round(new Date().getTime() / 1000) && 
                <div className='px-8 py-6 border-x border-b border-solid border-[#D7CDE5] rounded-b-[15px]'>
                  <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                    <FormattedMessage id='page.nft_detail.collection.nft_detail.current_price' />
                  </h4>
                  <div className='flex flex-row items-baseline mt-[9px]'>
                    <h5 className='font-poppins-700 text-[25px] text-black leading-[98.3%] mr-[6px]'>
                      {`${currentItem?.price ? currentItem.price : ''} ${currentItem?.currency ? currentItem?.currency : ''}`}
                    </h5>
                    <h5 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                      ${currentItem?.usdPrice ? currentItem.usdPrice : ''}
                    </h5>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4'>
                    {/* buy now, add to cart button */}
                    {!isOwner && <div className='flex flex-row w-full h-full'>
                      <div onClick={() => currentItem?.addedCart? removeFromCart(currentItem?._id) : addToCart(currentItem?._id)}
                        className={`${styles.purchaseBtn} w-[calc(100%-52px)] rounded-l-[14px] h-full border-r border-solid border-white text-white bg-purple group-hover/buy:w-0 hover:bg-purple-light cursor-pointer`}
                      >
                        <span className='block group-hover/buy:hidden'>
                          {currentItem?.addedCart? <FormattedMessage id='page.nft_detail.button.remove_from_cart' /> : <FormattedMessage id='page.nft_detail.button.add_to_cart' />}
                        </span>
                      </div>
                      <div onClick={() => {
                        setPurchaseData({
                          item: currentItem,
                          collection,
                          nft,
                        })
                        setOpenModal({ ...openModal, purchase: true, })
                      }} className={`${styles.purchaseBtn} w-[52px] rounded-r-[14px] h-full text-white bg-purple hover:bg-purple-light group/buy hover:w-full cursor-pointer`}>
                        <LightningSvgIcon color='white' width={8} height={18} />
                        <span className='hidden group-hover/buy:block group-hover/buy:ml-2'>
                          <FormattedMessage id='page.nft_detail.list.button.buy_now' />
                        </span>
                      </div>
                    </div>}
                    {/* make offer button */}
                    {!isOwner && <button onClick={async () => {
                      if (!metamaskAccout) {
                        const message = 'Welcome to Wadza! Sign for offer'
                        await signMessage(message)
                      }
                      setOpenModal({ ...openModal, offer: true, })
                    }} className={`${styles.purchaseBtn} rounded-[14px] text-purple border border-solid border-[#BFABD9] hover:bg-purple-lightest`}>
                      <FormattedMessage id='page.nft_detail.collection.nft_detail.button.make_offer' />
                    </button>}
                  </div>
                </div>}
                {(Object.keys(currentItem).length === 0 || 
                  currentItem?.isSold || 
                  !currentItem?.isActive || 
                  Number(currentItem?.expiryDate) < Math.round(new Date().getTime() / 1000)) && 
                <div className='flex flex-col w-full border border-solid border-[#D7CDE5] rounded-[15px] mt-9 pt-6 pb-7 px-8'>
                  <button onClick={async () => {
                    if (!metamaskAccout) {
                      const message = 'Welcome to Wadza! Sign for offer'
                      await signMessage(message)
                    }
                    setOpenModal({ ...openModal, offer: true, })
                  }} className={`${styles.purchaseBtn} w-[50%] rounded-[14px] text-purple border border-solid border-[#BFABD9] hover:bg-purple-lightest`}>
                    <FormattedMessage id='page.nft_detail.collection.nft_detail.button.make_offer' />
                  </button>
                </div>}
              </>
              {/* price history */}
              <section className='flex flex-col mt-[27px]'>
                <div onClick={() => setOpenHistory({ ...openHistory, price: !openHistory.price })} className={`flex flex-row justify-between items-center px-8 py-[18px] cursor-pointer border border-solid rounded-t-[15px] ${openHistory.price ? '' : 'rounded-b-[15px]'} border-[#D7CDE5]`}>
                  <div className='flex flex-row items-center'>
                    <ChartLineSvgIcon color='#393939' width={18} height={13} />
                    <h3 className='font-poppins-700 text-sm text-black leading-[98.3%] ml-[10px]'>
                      <FormattedMessage id='page.nft_detail.history.price_history' />
                    </h3>
                  </div>
                  <div>
                    {openHistory.price ? <ArrowUpSvgIcon color='#424242' width={9} height={5} /> : <ArrowDownSvgIcon color='#424242' width={9} height={5} />}
                  </div>
                </div>
                {openHistory.price && <div className='flex flex-col border-x border-b border-solid border-[#D7CDE5] rounded-b-[15px] px-7 py-[55px]'>
                  {sales.length > 0 ? <PriceChart data={priceChartData} options={priceChartOptions} /> : <NoItems width={35} height={25} imageWidth='w-[62px]' imageHeight='h-[62px]' fontSize='text-xs' margin='mt-2' />}
                </div>}
              </section>
              {/* listings */}
              <section className='flex flex-col mt-[21px]'>
                <div onClick={() => setOpenHistory({ ...openHistory, listing: !openHistory.listing })} className={`flex flex-row justify-between items-center px-8 py-[18px] cursor-pointer border border-solid rounded-t-[15px] ${openHistory.listing ? '' : 'rounded-b-[15px]'} border-[#D7CDE5]`}>
                  <div className='flex flex-row items-center'>
                    <TagSvgIcon color='#393939' width={18} height={18} />
                    <h3 className='font-poppins-700 text-sm text-black leading-[98.3%] ml-[10px]'>
                      <FormattedMessage id='page.nft_detail.history.listings' />
                    </h3>
                  </div>
                  <div>
                    {openHistory.listing ? <ArrowUpSvgIcon color='#424242' width={9} height={5} /> : <ArrowDownSvgIcon color='#424242' width={9} height={5} />}
                  </div>
                </div>
                {openHistory.listing && <div className={`flex flex-col border-x border-b border-solid border-[#D7CDE5] rounded-b-[15px] ${items.length > 0? '' : 'px-7 py-[55px] overflow-x-auto'}`}>
                  {items.length > 0 ? <ListingHistory items={items} addToCart={addToCart} /> : <NoItems width={35} height={25} imageWidth='w-[62px]' imageHeight='h-[62px]' fontSize='text-xs' margin='mt-2' />}
                </div>}
              </section>
              {/* offers */}
              <section className='flex flex-col mt-[21px]'>
                <div onClick={() => setOpenHistory({ ...openHistory, offer: !openHistory.offer })} className={`flex flex-row justify-between items-center px-8 py-[18px] cursor-pointer border border-solid rounded-t-[15px] ${openHistory.offer ? '' : 'rounded-b-[15px]'} border-[#D7CDE5]`}>
                  <div className='flex flex-row items-center'>
                    <MenuSvgIcon color='#393939' width={15} height={11} />
                    <h3 className='font-poppins-700 text-sm text-black leading-[98.3%] ml-[10px]'>
                      <FormattedMessage id='page.settings.sidebar.offers' />
                    </h3>
                  </div>
                  <div>
                    {openHistory.offer ? <ArrowUpSvgIcon color='#424242' width={9} height={5} /> : <ArrowDownSvgIcon color='#424242' width={9} height={5} />}
                  </div>
                </div>
                {openHistory.offer && <div className={`flex flex-col border-x border-b border-solid border-[#D7CDE5] rounded-b-[15px] ${offers.length > 0? '' : 'px-7 py-[55px] overflow-x-auto'}`}>
                  {offers.length > 0 ? <OfferHistory offers={offers} isOwner={isOwner} handleAcceptOffer={handleAcceptOffer} handleCancelOffer={handleCancelOffer} /> : <NoItems width={35} height={25} imageWidth='w-[62px]' imageHeight='h-[62px]' fontSize='text-xs' margin='mt-2' />}
                </div>}
              </section>
            </div>
          </div>
        </div>
      ) : (
        <ListSection img={nft?.image} name={nft?.name} collectionName={collection?.name} />
      )}
      <PurchaseModal
        isOpen={openModal.purchase}
        title={intl.formatMessage({'id': 'page.nft_detail.modal.purchase.title'})}
        close={() => setOpenModal({ ...openModal, purchase: false, })}
        data={purchaseData}
        loading={loading}
        accept={() => purchase()}
        txHash={purchaseTxHash}
      />
      <OfferModal
        isOpen={openModal.offer}
        title={intl.formatMessage({'id': 'page.nft_detail.modal.offer.title'})}
        close={() => setOpenModal({ ...openModal, offer: false, })}
        data={{
          item: currentItem,
          collection,
          nft,
        }}
        loading={offerLoading}
        accept={() => offer()}
        offerData={offerData}
        setOfferData={setOfferData}
      />
      <AcceptModal
        isOpen={openModal.acceptOffer}
        title={intl.formatMessage({'id': 'page.nft_detail.modal.accept_offer.title'})}
        close={() => setOpenModal({ ...openModal, acceptOffer: false, })}
        data={{
          item: currentItem,
          collection,
          nft,
        }}
        loading={acceptOfferLoading}
        accept={() => accept()}
        offerData={selectedOffer}
      />
      <CancelOfferModal
        isOpen={openModal.cancelOffer}
        title={intl.formatMessage({'id': 'page.nft_detail.modal.cancel_offer.title'})}
        close={() => setOpenModal({ ...openModal, cancelOffer: false, })}
        loading={cancelOfferLoading}
        accept={() => runCancelOffer()}
      />
      <MintedModal
        isOpen={externalUser?.mintedModal}
        title={`${intl.formatMessage({'id': 'page.minted_modal.title'})} ${nft?.name}`}
        close={() => dispatch(setMintedModal(false))}
        data={{
          image: nft?.image,
          name: nft?.name,
          tokenAddress: nft?.tokenAddress,
          tokenId: nft?.tokenId,
        }}
      />
    </section>
  )
}

export default NFTDetail
