import Lottie from 'lottie-react'
import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllCollectionsByListings } from '../../../../api/collection'
import { updateOfferSettings } from '../../../../api/user'
import Loading from '../../../../assets/lotties/loading.json'
import { setUpdatedUser } from '../../../../redux/features/userSlice'
import { getCryptoPrice } from '../../../../utils/utils'

const OffersTab = () => {
  const dispatch = useDispatch()
  const [collections, setCollections] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [saveLoading, setSaveLoading] = useState<boolean>(false)
  const [ethPrice, setEthPrice] = useState<number>(0)

  useEffect(() => {
    const getData = async () => {
      const _eth = await getCryptoPrice('ETH/USD')
      setEthPrice(_eth)
      setLoading(true)
      const result = await getAllCollectionsByListings()
      if (!result?.data?.error && result?.data?.data) {

        let updatedCollections: any[] = []
        const _collections: any[] = result?.data?.data || []

        if (_collections.length > 0) {
          for (const collection of _collections) {
            let usdPrice: string = ''
            if (Number(collection?.minimumOfferThreshold || 0) > 0) {
              usdPrice = (Number(collection?.minimumOfferThreshold) * Number(_eth)).toFixed(2)
            }
            
            updatedCollections = [
              ...updatedCollections,
              {
                ...collection,
                usdPrice,
                error: '',
              }
            ]
          }
        } 
        setCollections(updatedCollections)
        setLoading(false)
      } else {
        console.log('error :: ', result?.data?.error)
        setLoading(false)
      }
    }

    getData()
  }, [])

  const handleChangeThreshold = async (e: React.ChangeEvent<HTMLInputElement>, collection: any) => {
    const value: string = e.target.value
    let err: string = ''
    let usdPrice: string = ''

    if (isNaN(Number(value))) {
      err = 'Please enter a valid amount'
    } else {
      err = ''
      usdPrice = (Number(value) * ethPrice).toFixed(2)
    }

    const _updated = collections.map((_collection: any) => {
      if (_collection?._id === collection?._id) {
        return {
          ..._collection,
          minimumOfferThreshold: value,
          usdPrice,
          error: err,
        }
      } else {
        return _collection
      }
    })

    setCollections(_updated)
  }

  const validation = () => {
    if (collections.length > 0) {
      for (const collection of collections) {
        if (collection?.error) {
          return false
        }
      }
      return true
    }

    return false
  }

  const saveThresholds = async () => {
    if (validation()) {
      setSaveLoading(true)
      const offerSettings = collections.map((collection: any) => {
        return {
          collectionId: collection?._id,
          minimumOfferThreshold: Number(collection?.minimumOfferThreshold),
        }
      })

      const updateResult = await updateOfferSettings({offerSettings})
      if (!updateResult?.data?.error && updateResult?.data?.data) {
        setSaveLoading(false)
        toast.success('Update the minimum offer values successfully')
        dispatch(setUpdatedUser(updateResult.data.data))
      } else {
        toast.error(updateResult?.data?.error || 'Unexpected error occurred!')
        setSaveLoading(false)
      }
    }
  }

  return (
    <section className='w-full pt-[42px] px-[89px]'>
      {/* title */}
      <h2 className='font-poppins-600 text-[32px] text-purple-light leading-[98.3%]'>
        <FormattedMessage id='page.account.settings.tab.offers.title' />
      </h2>
      <div className='max-w-[390px] w-full mt-[14px]'>
        <div className='font-poppins-400 text-sm text-black leading-[21px]'>
          <FormattedMessage id='page.account.settings.tab.offers.desc' />
        </div>
      </div>
      {/* view my offers button */}
      <button className='flex flex-row justify-center items-center w-[213px] h-[49px] bg-[#D6CCE4] rounded-md mt-8'>
        <h4 className='font-poppins-600 text-base text-purple-lighter leading-[98.3%]'>
          <FormattedMessage id='page.account.settings.tab.offers.button.view_my_offers' />
        </h4>
      </button>
      {/* collections */}
      <div className='mt-10'>
        {loading ? <div className='flex flex-row justify-center items-center bg-[#D6CCE4] w-full h-[320px] rounded-md'><Lottie animationData={Loading} style={{ width: 45, height: 60, }} /></div>
          : collections.length > 0 &&
          <div className='w-full'>
            <div className='w-full max-h-[340px] overflow-y-auto'>
              {collections.map((collection: any, index: number) => (
                <div key={index} className='flex flex-row justify-between items-center w-full h-[73px] bg-[#D6CCE4] rounded-md px-3 mb-[14px]'>
                  <div className='flex flex-row'>
                    <picture>
                      <img
                        src={collection?.logoImage ? String(collection?.logoImage).includes('ipfs://') ? String(collection?.logoImage).replace('ipfs://', 'https://ipfs.io/ipfs/') : collection?.logoImage : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                        alt='collection image'
                        className='w-[48px] h-[48px] object-cover rounded-md mr-3'
                      />
                    </picture>
                    <div>
                      <h3 className='font-poppins-600 text-base text-purple-lighter leading-6'>
                        {collection?.name || ''}
                      </h3>
                      <div className='font-poppins-400 text-sm text-purple-lighter leading-[21px]'>
                        <h3 className='inline mr-1'>
                          <FormattedMessage id='page.nft_detail.modal.offer.label.floor_price' />:
                        </h3>
                        <h3 className='inline mr-2'>
                          {`${collection?.floorPrice} ETH` || ''}
                        </h3>
                        <h3 className='inline mr-2'>
                          |
                        </h3>
                        <h3 className='inline'>
                          {`${collection?.listings} Items` || ''}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center'>
                    <h3 className='font-poppins-600 text-sm text-purple-lighter leading-[198%]'>
                      <FormattedMessage id='page.account.settings.tab.offers.label.minimum_offer' />:
                    </h3>
                    <div className='flex flex-row items-center w-[195px] h-[27px] bg-[#E8E0F3] rounded-[3px] px-3'>
                      <input
                        type={`text`}
                        className='flex items-center font-poppins-400 text-sm text-purple-lighter w-10 h-full bg-[#E8E0F3] leading-[198%] outline-none'
                        value={collection?.minimumOfferThreshold || 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeThreshold(e, collection)}
                      />
                      <h4 className='font-poppins-400 text-sm text-purple-lighter ml-1 mr-2'>
                        {`ETH`}
                      </h4>
                      <h4 className='font-poppins-400 text-sm text-[#BDA9D4]'>
                        {`~${collection?.usdPrice || 0} USD`}
                      </h4>
                    </div>
                    {collection?.error && <h4 className='font-poppins-400 text-[11px] text-red leading-6'>{collection?.error || ''}</h4>}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => saveThresholds()} disabled={saveLoading} className={`flex flex-row justify-center items-center w-[213px] h-[49px] ${saveLoading ? 'bg-purple-light' : 'bg-purple'} rounded-md mt-[46px] hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
              {saveLoading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                <FormattedMessage id='page.nft.creation.add_property_modal.save' />
              </h4>}
            </button>
          </div>
        }
      </div>
    </section>
  )
}

export default OffersTab
