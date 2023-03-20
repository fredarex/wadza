import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { setShoppingCarts } from '../../../redux/features/userSlice'
import { RootState } from '../../../redux/store'
import { ICommonProps, ICreatorFee } from '../../../types/types'
import { TrashAltSvgIcon, VerifiedSvgIcon } from '../../icons'

interface IProps extends ICommonProps {
  collection: any
  item: any
  royalities?: boolean
}

const NftCartItem = (props: IProps) => {
  const { collection, item, royalities = true, className } = props
  const intl = useIntl()
  const dispatch = useDispatch()
  const externalUser: any = useSelector((state: RootState) => state.user)
  const [creatorFee, setCreatorFee] = useState<number>(0)

  useEffect(() => {
    let _creatorFee: number = 0
    if (collection?.creatorFees?.length > 0) {
      collection?.creatorFees.map((fee: ICreatorFee, index: number) => {
        _creatorFee += fee.percentage
      })
      setCreatorFee(_creatorFee)
    }
  }, [collection])

  const removeItem = (itemId: string) => {
    if (externalUser?.shoppingCarts) {
      let shoppingCarts: string[] = externalUser?.shoppingCarts
      if (shoppingCarts.length > 0 && shoppingCarts.includes(itemId)) {
        const newShoppingCarts = shoppingCarts.filter((cart: any, index: number) => cart !== itemId)
        dispatch(setShoppingCarts(newShoppingCarts))
      }
    }
  }

  return (
    <section className={`purchase-modal-nft-item flex flex-row justify-between w-full h-[70px] rounded-md ${className} mb-[30px]`}>
      {/* image, info */}
      <div className='flex flex-row justify-start items-center'>
        <picture><img
          src={item?.image?
            String(item.image).includes('ipfs://')?
              String(item.image).replace('ipfs://', 'https://ipfs.io/ipfs/') 
              : item.image 
            : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
          alt='nft image'
          className='w-[70px] h-[70px] rounded-md'
        /></picture>
        <div className='flex flex-col ml-[18px]'>
          <h3 className='font-poppins-600 text-lg text-purple leading-6'>
            {item?.name}
          </h3>
          <div className='flex flex-row items-center'>
            <h3 className='font-poppins-400 text-sm text-purple leading-6 mr-2'>
              {collection?.name}
            </h3>
            {collection?.isVerified && <VerifiedSvgIcon color='#53317D' width={9} height={9} />}
          </div>
          {royalities && <div className='flex flex-row items-center'>
            <h3 className='font-poppins-600 text-xs text-purple leading-6'>
              {`${Number(item?.price).toFixed(3)} ${item?.currency} |   ${intl.formatMessage({'id': 'page.collection.creation.creator_fee.label'})}: ${creatorFee}%`}
            </h3>
          </div>}
        </div>
      </div>
      {/* Trash icon */}
      <button onClick={() => removeItem(item?._id)} className='flex items-center cursor-pointer'>
        <TrashAltSvgIcon color='#3C1361' width={15} height={20} />
      </button>
    </section>
  )
}

export default NftCartItem
