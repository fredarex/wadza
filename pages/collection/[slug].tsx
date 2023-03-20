import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'
import { isMobile } from 'react-device-detect'

import { getCollectionBySlug } from '../../api/collection'
import { ICreatorFee } from '../../types/types'
import { ArrowSlideDownSvgIcon, FacebookSvgIcon, HeartLinedSvgIcon, RedditSvgIcon, ShareSvgIcon, TelegramSvgIcon, ThreeHorizontalSvgIcon, TwitterSvgIcon } from '../../components/icons'

import UploadIcon from '../../assets/svg/upload.svg'
import moment from 'moment'
import { FilterNavbar, FilterResults, FilterSidebar } from '../../components/_collection/detail'
import CollectionProvider from '../../contexts/Collection.context'
import { getListingsByFilterWidthCollection } from '../../api/listing'

const styles = {
  button: 'flex flex-row justify-center items-center h-[28px] bg-white hover:shadow-sm hover:scale-[1.02] active:scale-[1] ease-in duration-150 rounded-lg',
}

const CollectionDetail = () => {
  const router = useRouter()
  const slug = useMemo(() => (router.query.slug as string) || '', [router])
  const intl = useIntl()
  const [collection, setCollection] = useState<any>({})
  const [listings, setListings] = useState<any[]>([])
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [])

  useEffect(() => {
    const query = router.query
    let filter: any = {
      price: {
        currency: '',
        min: '',
        max: '',
      },
      quantity: '',
      statuses: [],
    }

    if (Object.keys(query).includes('search[quantity]')) {
      filter = {
        ...filter,
        quantity: query['search[quantity]'] as string,
      }
    }
    if (Object.keys(query).includes('search[price][currency]')) {
      filter = {
        ...filter,
        price: {
          ...filter.price,
          currency: query['search[price][currency]'] as string,
        }
      }
    }
    if (Object.keys(query).includes('search[price][max]')) {
      filter = {
        ...filter,
        price: {
          ...filter.price,
          max: query['search[price][max]'] as string,
        }
      }
    }
    if (Object.keys(query).includes('search[price][min]')) {
      filter = {
        ...filter,
        price: {
          ...filter.price,
          min: query['search[price][min]'] as string,
        }
      }
    }
    if (Object.keys(query).length > 0) {
      const statuses: string[] = []
      const _statuses = Object.keys(query).filter((key: string) => key.includes('search[status]'))
      if (_statuses.length > 0) {
        for (const status of _statuses) {
          statuses.push(query[status] as string)
        }
      }
      filter = {
        ...filter,
        statuses,
      }
    }
    
    const getListings = async () => {
      if (collection?._id) {
        const _listingsByFilter = await getListingsByFilterWidthCollection(collection?._id, filter)
        const _listings = _listingsByFilter?.data?.data
        setListings(_listings)
      }
    }


    getListings()
  }, [router, collection])

  useEffect(() => {
    const getData = async () => {
      const getCollectionResult = await getCollectionBySlug(slug)
      const _collectionData = getCollectionResult?.data?.data

      let creatorFee: number = 0
      if (_collectionData?.creatorFees?.length > 0) {
        _collectionData?.creatorFees.map((fee: ICreatorFee, index: number) => {
          creatorFee += fee.percentage
        })
      }

      setCollection({
        ..._collectionData,
        creatorFee,
      })

      setListings(_collectionData?.listings)
    }

    if (slug)
      getData()
  }, [slug])

  const handleAddWatchlist = () => {

  }

  const handleRemoveWatchlist = () => {

  }

  return (
    <section>
      {/* banner */}
      <div className={`relative flex flex-row justify-center w-full h-[452px] bg-[#DCD7E3] ${_isMobile ? 'mt-[51px]' : 'mt-[77px]'}`}>
        {collection?.bannerImage && <picture><img
          src={collection.bannerImage}
          alt='banner image'
          className='absolute top-0 left-0 w-full h-full object-cover'
        /></picture>}
        {/* banner image */}
        <div className='flex flex-col items-center max-w-[925px] w-full h-[414px] border border-dashed border-[#B8A2D2] rounded-[32px] mt-[38px]'>
          <Image
            src={UploadIcon}
            alt='upload icon'
            className='mt-[56px]'
          />
          <h2 className='max-w-[255px] w-full text-center font-poppins-400 text-sm text-[#B8A2D2] leading-[21px] mt-[18px]'>
            <FormattedMessage id='page.profile.banner.description' />
          </h2>
          <button className='flex flex-row justify-center items-center max-w-[228px] w-full h-[37px] bg-[#B8A2D2] hover:bg-purple-lighter rounded-md mt-[25px]'>
            <h3 className='font-poppins-600 text-base text-[#DCD7E3] leading-[98.3%]'>
              <FormattedMessage id='page.profile.banner.button.upload_cover_image' />
            </h3>
          </button>
        </div>
        {/* collection data */}

        <div className='absolute bottom-[-110px] flex flex-col items-center w-full h-[189px]'>
          <div className='relative flex max-w-[1250px] w-full h-[134px] bg-purple-lightest rounded-[15px_15px_0px_0px]'>
            {/* logo image */}
            <div className='absolute left-[15px] top-[-85px] flex flex-row justify-center items-center max-w-[203px] w-full h-[203px] bg-white rounded-[15px]'>
              {collection?.logoImage ? (<picture><img
                src={collection.logoImage}
                alt='profileImage image'
                className='max-w-[183px] w-full h-[183px] object-cover rounded-[7px]'
              /></picture>) : (
                <div className='flex flex-row justify-center items-center max-w-[183px] w-full h-[183px] bg-purple-lightest rounded-[7px]'>
                  <Image
                    src={UploadIcon}
                    alt='upload icon'
                    width={72}
                    height={64}
                  />
                </div>
              )}
            </div>
            {/* main data */}
            <div className='flex flex-row justify-between max-w-[995px] w-full ml-[253px]'>
              <div className='pt-[21px]'>
                <h1 className='font-poppins-700 text-[32px] text-black leading-[104.3%]'>
                  {collection?.name || 'Unnamed'}
                </h1>
                <div className='flex flex-row items-center mt-[14px] font-poppins-400 text-xs leading-[98.3%]'>
                  <FormattedMessage id='page.nft_detail.collection.description.by' />
                  <h5 className='ml-[5px]'>
                    {collection?.creator?.username}
                  </h5>
                </div>
                <div className='flex flex-row items-center mt-[14px]'>
                  {/* items count */}
                  <div className='flex flex-row items-center'>
                    <h5 className='font-poppins-600 text-black text-xs leading-[98.3%] mr-1'>
                      <FormattedMessage id='page.collection_detail.label.items' />:
                    </h5>
                    <h5 className='font-poppins-400 text-black text-xs leading-[98.3%] mr-2'>
                      {Number(collection?.itemsCount).toLocaleString('en-US')}
                    </h5>
                    <h5 className='font-poppins-400 text-black text-xs leading-[98.3%] mr-2'>
                      &middot;
                    </h5>
                  </div>
                  {/* created at */}
                  <div className='flex flex-row items-center'>
                    <h5 className='font-poppins-600 text-black text-xs leading-[98.3%] mr-1'>
                      <FormattedMessage id='page.profile.tabs.created' />:
                    </h5>
                    <h5 className='font-poppins-400 text-black text-xs leading-[98.3%] mr-2'>
                      {moment(collection?.createdAt).format('MMM YYYY')}
                    </h5>
                    <h5 className='font-poppins-400 text-black text-xs leading-[98.3%] mr-2'>
                      &middot;
                    </h5>
                  </div>
                  {/* creator fee */}
                  <div className='flex flex-row items-center'>
                    <h5 className='font-poppins-600 text-black text-xs leading-[98.3%] mr-1'>
                      <FormattedMessage id='page.collection.creation.creator_fee.label' />:
                    </h5>
                    <h5 className='font-poppins-400 text-black text-xs leading-[98.3%] mr-2'>
                      {collection?.creatorFee ? `${collection.creatorFee}%` : `0%`}
                    </h5>
                    <h5 className='font-poppins-400 text-black text-xs leading-[98.3%] mr-2'>
                      &middot;
                    </h5>
                  </div>
                  {/* chain */}
                  <div className='flex flex-row items-center'>
                    <h5 className='font-poppins-600 text-black text-xs leading-[98.3%] mr-1'>
                      <FormattedMessage id='page.nft_detail.collection.nft_detail.chain' />:
                    </h5>
                    <h5 className='font-poppins-400 text-black text-xs leading-[98.3%] capitalize mr-2'>
                      {collection?.chain}
                    </h5>
                  </div>
                </div>
              </div>
              {/* social buttons */}
              <div className='flex flex-row justify-end pt-[12px]'>
                <button className={`${styles.button} w-[28px] mr-[10px]`}>
                  <TelegramSvgIcon color='#7E7E7E' width={15} height={13} />
                </button>
                <button className={`${styles.button} w-[28px] mr-[10px]`}>
                  <FacebookSvgIcon color='#7E7E7E' width={8} height={14} />
                </button>
                <button className={`${styles.button} w-[28px] mr-[10px]`}>
                  <TwitterSvgIcon color='#7E7E7E' width={15} height={13} />
                </button>
                <button className={`${styles.button} w-[28px] mr-[10px]`}>
                  <RedditSvgIcon color='#7E7E7E' width={18} height={16} />
                </button>
              </div>
            </div>
          </div>
          <div className='relative flex max-w-[1250px] w-full h-[55px] bg-[#DDD7E5] rounded-[0px_0px_15px_15px] pl-[15px]'>
            {/* additional reaction buttons */}
            <div className='flex flex-row items-center mr-[19px]'>
              <button className='flex flex-row justify-center items-center w-[203px] h-[27px] bg-white rounded-lg hover:shadow-sm hover:scale-[1.02] active:scale-[1] mr-[13px]'>
                <h3 className='font-poppins-400 text-xs text-black-light leading-[98.3%]'>
                  <FormattedMessage id='page.collection_detail.button.read_more' />
                </h3>
              </button>
              <button className='flex flex-row justify-center items-center w-[27px] h-[27px] bg-white rounded-lg hover:shadow-sm hover:scale-[1.02] active:scale-[1] mr-[13px]'>
                <ShareSvgIcon color='#424242' width={13} height={14} />
              </button>
              <button className='flex flex-row justify-center items-center w-[27px] h-[27px] bg-white rounded-lg hover:shadow-sm hover:scale-[1.02] active:scale-[1] mr-[13px]'>
                <HeartLinedSvgIcon color='#424242' width={13} height={11} />
              </button>
              <button className='flex flex-row justify-center items-center w-[27px] h-[27px] bg-white rounded-lg hover:shadow-sm hover:scale-[1.02] active:scale-[1]'>
                <ThreeHorizontalSvgIcon color='#424242' />
              </button>
            </div>
            {/* collection stats data */}
            <div className='relative flex flex-row w-[calc(100%-342px)]'>
              <div className='absolute top-[-10px] w-full h-[74px]'>
                <div className='relative flex flex-row w-full h-full'>
                  {/* total volumn */}
                  <div className='flex flex-col justify-center w-[124px] h-[74px] bg-[#F6F2FA] rounded shadow-[0px_4px_15px_rgba(60,19,97,0.09)] pl-[17px] mr-[9px]'>
                    <h3 className='font-poppins-700 text-[17px] text-black leading-[98.3%]'>
                      {collection?.totalVolumn ? `${Number(collection.totalVolumn).toFixed(1)} ETH` : `-----`}
                    </h3>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-1'>
                      <FormattedMessage id='page.collection_detail.label.total_volume' />
                    </h4>
                  </div>
                  {/* floor price */}
                  <div className='flex flex-col justify-center w-[127px] h-[74px] bg-[#F6F2FA] rounded shadow-[0px_4px_15px_rgba(60,19,97,0.09)] pl-[17px] mr-[9px]'>
                    <h3 className='font-poppins-700 text-[17px] text-black leading-[98.3%]'>
                      {collection?.floorPrice ? `${Number(collection.floorPrice).toFixed(2)} ETH` : `-----`}
                    </h3>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-1'>
                      <FormattedMessage id='page.nft_detail.modal.offer.label.floor_price' />
                    </h4>
                  </div>
                  {/* floor 24Hr */}
                  <div className='flex flex-col justify-center w-[116px] h-[74px] bg-[#F6F2FA] rounded shadow-[0px_4px_15px_rgba(60,19,97,0.09)] pl-[17px] mr-[9px]'>
                    <div className='flex flex-row items-center'>
                      <ArrowSlideDownSvgIcon color='#DB5C5C' />
                      <h3 className='font-poppins-700 text-[17px] text-[#DB5C5C] leading-[98.3%] ml-1'>
                        {collection?.floor ? `${Number(collection.floor).toFixed(2)}%` : `0%`}
                      </h3>
                    </div>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-1'>
                      <FormattedMessage id='page.home.product.card.label.floor' />&nbsp;24Hr
                    </h4>
                  </div>
                  {/* best offer */}
                  <div className='flex flex-col justify-center w-[128px] h-[74px] bg-[#F6F2FA] rounded shadow-[0px_4px_15px_rgba(60,19,97,0.09)] pl-[17px] mr-[9px]'>
                    <h3 className='font-poppins-700 text-[17px] text-black leading-[98.3%]'>
                      {collection?.bestOffer ? `${Number(collection.bestOffer).toFixed(2)} WETH` : `-----`}
                    </h3>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-1'>
                      <FormattedMessage id='page.collection_detail.label.best_offer' />
                    </h4>
                  </div>
                  {/* listed */}
                  <div className='flex flex-col justify-center w-[105px] h-[74px] bg-[#F6F2FA] rounded shadow-[0px_4px_15px_rgba(60,19,97,0.09)] pl-[17px] mr-[9px]'>
                    <h3 className='font-poppins-700 text-[17px] text-black leading-[98.3%]'>
                      {collection?.listed ? `${collection.listed}%` : `-----`}
                    </h3>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-1'>
                      <FormattedMessage id='page.collection_detail.label.listed' />
                    </h4>
                  </div>
                  {/* owners */}
                  <div className='flex flex-col justify-center w-[98px] h-[74px] bg-[#F6F2FA] rounded shadow-[0px_4px_15px_rgba(60,19,97,0.09)] pl-[17px] mr-[9px]'>
                    <h3 className='font-poppins-700 text-[17px] text-black leading-[98.3%]'>
                      {collection?.owners ? `${Number(collection.owners).toLocaleString('en-US')}` : `-----`}
                    </h3>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-1'>
                      <FormattedMessage id='page.collection_detail.label.owners' />
                    </h4>
                  </div>
                  {/* owners */}
                  <div className='flex flex-col justify-center w-[128px] h-[74px] bg-[#F6F2FA] rounded shadow-[0px_4px_15px_rgba(60,19,97,0.09)] pl-[17px] mr-[9px]'>
                    <h3 className='font-poppins-700 text-[17px] text-black leading-[98.3%]'>
                      {collection?.uniqueOwners ? `${collection.uniqueOwners}%` : `-----`}
                    </h3>
                    <h4 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-1'>
                      <FormattedMessage id='page.collection_detail.label.unique_owners' />
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
      <CollectionProvider>
        <div className='flex flex-col items-center w-full mt-[138px]'>
          <FilterNavbar />
          <div className='flex flex-row max-w-[1250px] w-full mt-[9px]'>
            <FilterSidebar slug={slug} />
            <FilterResults listings={listings} collection={collection} />
          </div>
        </div>
      </CollectionProvider>
    </section>
  )
}

export default CollectionDetail
