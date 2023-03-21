import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ICommonProps, IMockCollection } from '../../../types/types'
import { abbreviation } from '../../../utils/utils'
import { StarLineSvgIcon, StarSvgIcon, VerifiedSvgIcon } from '../../icons'
import { RootState } from '../../../redux/store'
import { addWatchlist } from '../../../api/user'
import { setUpdatedUser } from '../../../redux/features/userSlice'
import ToolTip from '../../tooltip'
import { useIntl } from 'react-intl'

interface IProps extends ICommonProps {
  collection: IMockCollection
}

const RankingCollectionCard = (props: IProps) => {
  const { collection } = props
  const intl = useIntl()
  const router = useRouter()
  const dispatch = useDispatch()
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [addedWatchlist, setAddedWatchlist] = useState<boolean>(false)

  useEffect(() => {
    if (_user && _user.watchlists && _user.watchlists.length > 0) {
      const _watchlist: string[] = _user.watchlists as string[] || []
      if (_watchlist.includes(collection?._id!)) {
        setAddedWatchlist(true)
      } else {
        setAddedWatchlist(false)
      }
    }
  }, [_user, collection])

  const handleCollectionClick = (slug: string) => {
    router.push({
      pathname: `/collection/${slug}`
    })
  }

  const handleWatchlist = async () => {
    if (collection?._id && _user) {
      const watchlistResult = await addWatchlist(collection?._id)
      if (!watchlistResult?.data?.error && watchlistResult?.data?.data) {
        const updatedUser = watchlistResult.data.data

        dispatch(setUpdatedUser(updatedUser))
      }
    }
  }

  return (
    <div className='flex flex-row justify-end items-center w-full h-[97px] pr-[27px] sm:bg-[#DDD7E5] mt-[10px] rounded-lg relative cursor-pointer'>
      <div className='absolute left-[-7px] sm:left-[-16px] flex items-center w-full py-[15px] my-[10px]'>
        <div className='sm:bg-purple p-[13px] rounded-l-[10px] max-w-[24px] sm:max-w-[32px] w-full' onClick={() => handleCollectionClick(collection?.slug!)}>
          <div className='font-poppins-600 sm:text-white text-[15px] leading-[98.3%]'>
            {collection?.rank}
          </div>
        </div>
        <picture><img
          src={collection?.image? collection.image : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
          alt='collection image'
          className='w-[55px] -sm:w-[54px] sm:w-[71px] h-[60px] sm:h-[67px] mr-[10px] -sm:ml-[10px] sm:mr-[22px] object-cover rounded'
          onClick={() => handleCollectionClick(collection?.slug!)}
        /></picture>
        <div className='flex-col -sm:w-[60%] w-[26.2%]' onClick={() => handleCollectionClick(collection?.slug!)}>
          <div className='flex flex-row items-center'>
            <h2 className='font-poppins-600 text-black-light text-sm sm:text-base leading-[123.3%] sm:leading-[98.3%] mr-[10px]'>
              {abbreviation(collection?.name, 25)}
            </h2>
            {collection?.isVerified && <VerifiedSvgIcon color='#53317D' width={17} height={16} />}
          </div>
        </div>
        <div className='flex sm:w-[16.4%] items-center' onClick={() => handleCollectionClick(collection?.slug!)}>
          <h2 className='font-poppins-700 text-black text-base leading-[98.3%]'>
            {Number(collection?.volume) === 0? '-' : `${Number(collection?.volume).toFixed(3)} ETH`}
          </h2>
        </div>
        <div className='-sm:hidden flex w-[16.4%] items-center' onClick={() => handleCollectionClick(collection?.slug!)}>
          <h2 className={`font-poppins-700 ${Number(collection.change || 0) === 0? 'text-black' : Number(collection.change || 0) > 0? 'text-[#098F4B]' : 'text-[#DB5C5C]'} text-base leading-[98.3%]`}>
            {`${Number(collection?.change) === 0? '-' : Number(collection?.change) > 0? `+ ${Number(collection?.change).toFixed(2)} %` : `- ${Number(collection?.change).toFixed(2)} %`}`}
          </h2>
        </div>
        <div className='-sm:hidden flex w-[16.8%] items-center' onClick={() => handleCollectionClick(collection?.slug!)}>
          <h2 className={`font-poppins-700 text-black text-base leading-[98.3%]`}>
            {`${Number(collection?.floorPrice) === 0? '-' : `${Number(collection?.floorPrice).toFixed(3)} ETH`}`}
          </h2>
        </div>
        <div className='-sm:hidden flex w-[7%] items-center' onClick={() => handleCollectionClick(collection?.slug!)}>
          <h2 className={`font-poppins-700 text-black text-base leading-[98.3%]`}>
            {`${Number(collection?.sales) === 0? '-' : `${Number(collection?.sales)}`}`}
          </h2>
        </div>
        <div className='-sm:hidden flex items-center' onClick={() => handleWatchlist()}>
          <ToolTip tooltip={addedWatchlist? intl.formatMessage({'id': 'page.rankings.tooltip.add_to_watchlist'}) : intl.formatMessage({'id': 'page.rankings.tooltip.watching'})}>
            {addedWatchlist? <StarSvgIcon color='#424242' /> : <StarLineSvgIcon color='#424242' />}          
          </ToolTip>
        </div>
      </div>
      
    </div>
  )
}

export default RankingCollectionCard
