import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import CollectionBanner from '../../assets/svg/collection_banner.svg'
import InfoIcon from '../../assets/svg/info.svg'
import { ThreeDotsSavgIcon } from '../../components/icons'
import { getOwnedAllCollections } from '../../api/collection'
import { CollectionCard } from '../../components/_explore_collections'

const styles = {
  createBtn: 'flex flex-row justify-center items-center w-[243px] h-[58px] bg-purple font-poppins-600 text-base text-white leading-[98.3%] rounded-md hover:bg-purple-light ease-in duration-100 mr-[17.5px]',
}

const Collections = () => {
  const router = useRouter()
  const [collections, setCollections] = useState<any[]>([])

  useEffect(() => {
    const getCollections = async () => {
      const getCollectionsResult = await getOwnedAllCollections()
      if (!getCollectionsResult?.data?.error) {
        const _collections = getCollectionsResult?.data?.data
        setCollections(_collections)
      }
    }

    getCollections()
  }, [])

  const handleCollectionClick = (slug: string) => {
    router.push({
      pathname: `/collection/${slug}`
    })
  }


  return (
    <div className='flex flex-row justify-center mt-[136px]'>
      <div className='flex flex-col max-w-[1250px] w-full'>
        <div className='flex flex-row justify-center items-center max-w-[357px] w-full bg-[#DFDBE4] px-13 py-8 rounded-t-[15px]'>
          <span className='font-poppins-700 text-3xl text-black-lighter'>
            <FormattedMessage id='page.home.footer.section.label.my_collections' />
          </span>
        </div>
        {collections.length > 0? <div className='w-full bg-purple-lightest px-[52px] pt-[52px] pb-[66px] rounded-[0px_15px_15px_15px]'>
          <div className='flex-row items-center max-w-[392px] w-full inline font-poppins-400 text-sm text-black-lighter leading-[21px] mt-3'>
            <FormattedMessage id='page.collections.desc' />
            <Image
              src={InfoIcon}
              alt='info'
              className='ml-2 cursor-pointer inline'
            />
          </div>
          <div className='flex flex-row mt-8'>
            <button className={styles.createBtn} onClick={() => router.push({ pathname: '/collection/create' })}>
              <FormattedMessage id='page.collections.button.create' />
            </button>
            <button className='flex flex-row justify-center items-center w-[58px] h-[58px] bg-[#D6CCE4] border hover:border-purple-lighter rounded-md ease-in duration-100'>
              <ThreeDotsSavgIcon color='#8B6EAE' width={4.5} height={22} />
            </button>
          </div>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {collections.map((collection: any, index: number) => (
              <CollectionCard
                key={index}
                collection={collection}
                onClick={handleCollectionClick}
                showOptionsBtn={true}
              />
            ))}
          </div>
        </div> : <div className='w-full bg-purple-lightest px-[52px] pt-[52px] pb-[66px] rounded-[0px_15px_15px_15px]'>
          <div className='flex flex-col items-center w-full h-[473px] border border-dashed border-purple-lighter rounded-[14px]'>
            <div className='flex justify-center items-center w-[162px] h-[162px] bg-[rgba(127,76,181,0.15)] rounded-full mt-[50px]'>
              <Image
                src={CollectionBanner}
                alt='collection banner image'
                className=''
              />
            </div>
            <h1 className='font-poppins-600 text-[22px] text-black-lighter leading-[98.3%] mt-[29px]'>
              <FormattedMessage id='page.collections.title' />
            </h1>
            <h3 className='max-w-[392px] w-full inline text-center font-poppins-400 text-sm text-black-lighter leading-[21px] mt-3'>
              <FormattedMessage id='page.collections.desc' />
              <Image
                src={InfoIcon}
                alt='info'
                className='ml-2 cursor-pointer inline'
              />
            </h3>
            <div className='flex flex-row justify-center mt-8'>
              <button className={styles.createBtn} onClick={() => router.push({ pathname: '/collection/create' })}>
                <FormattedMessage id='page.collections.button.create' />
              </button>
              <button className='flex flex-row justify-center items-center w-[58px] h-[58px] bg-[#D6CCE4] border hover:border-purple-lighter rounded-md ease-in duration-100'>
                <ThreeDotsSavgIcon color='#8B6EAE' width={4.5} height={22} />
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Collections
