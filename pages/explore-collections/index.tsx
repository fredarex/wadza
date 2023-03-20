import React, { useEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { getAllCollections, getAllCollectionsByCategory } from '../../api/collection'
import { CollectionCard, TabItem } from '../../components/_explore_collections'
import { CategoryData } from '../../mock/CategoryData'
import { ICollectionData, IMockCategory } from '../../types/types'
import TabItemCarousel from '../../components/_explore_collections/TabItemCarousel'



const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}


const ExploreCollections = () => {
  const router = useRouter()
  const intl = useIntl()
  const [tab, setTab] = useState<string>('trending')
  const [collections, setCollections] = useState<any[]>([])
  const _tab = useMemo(() => router.query.tab as string || '', [router])
  const [_show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const getCollections = async () => {
      const getCollectionsResult = await getAllCollections()
      const _collections = getCollectionsResult?.data?.data
      setCollections(_collections)
    }

    getCollections()
  }, []);

  useEffect(() => {
   
    const handleWindowResize = () => {
      const { innerWidth } = getWindowSize()
      if (innerWidth >= 1024)
        setShow(true);
      else
        setShow(false)
    }
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize)
    
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
    
  }, []);

  useEffect(() => {
    if (_tab) {
      setTab(_tab)
    } else {
      setTab('trending')
    }
  }, [_tab])

  const selectTab = async (_tab: string) => {
    const collectionsByCategory = await getAllCollectionsByCategory(_tab)
    const _collections = collectionsByCategory?.data?.data
    setCollections(_collections)
    if (_tab === 'trending') {
      router.push({ pathname: '/explore-collections' })
    } else {
      router.push({
        pathname: '/explore-collections',
        query: {
          tab: _tab,
        },
      })
    }
  }

  const handleCollectionClick = (slug: string) => {
    router.push({
      pathname: `/collection/${slug}`
    })
  }

  return (
    <div className='flex flex-row justify-center mt-[80px] lg:mt-[136px]'>
      <div className='flex flex-col max-w-[1250px] w-full'>
        {/* title */}
        <div className='flex flex-row lg:justify-center items-center lg:max-w-[434px] w-full lg:bg-[#DFDBE4] px-4 lg:px-13 py-8 rounded-t-[15px]'>
          <h1 className='font-poppins-700 text-[24px] lg:text-3xl text-black-lighter'>
            <FormattedMessage id='page.explore_collections.title' />
          </h1>
        </div>
        {/* tabs */}
        {
          _show ? 
          <div className='lg:flex hidden flex-row justify-around items-center w-full h-11 bg-purple-lightest px-4 rounded-[0_15px_4px_4px]'>
            <TabItem className='text-black' onClick={() => selectTab('trending')} selected={tab === 'trending'} category={{label: intl.formatMessage({'id': 'page.home.featured.tabs.section.label.trending'}), value: 'trending'}} />
            <TabItem className='text-black' onClick={() => selectTab('top')} selected={tab === 'top'} category={{label: intl.formatMessage({'id': 'page.explore_collections.tabs.top'}), value: 'top'}} />
            {CategoryData.length > 0 && CategoryData.map((category: IMockCategory, index: number) => (
              <TabItem key={index} className='text-black' onClick={selectTab} selected={tab === category.value} category={category} />
            ))}
          </div>
          : 
          <TabItemCarousel />
        }
        
        {/* body */}
        <div className='flex flex-col  w-full bg-purple-lightest p-[0_24px_51px_24px] rounded-[4px_4px_15px_15px] mt-[9px]'>
          {/* collections */}
          <div className='grid explore-collection-card  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
            {collections.length > 0 && collections.map((_collection: ICollectionData, index: number) => (
              <CollectionCard key={index} onClick={handleCollectionClick} collection={_collection} />
            ))}
          </div>
          {/* load more button */}
          <div className='flex flex-row justify-center mt-[65px]'>
            <button className={`flex flex-row justify-center items-center max-w-[297px] w-full h-8 bg-[rgba(255,255,255,0.7)] rounded-[24px] hover:bg-white hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
              <h5 className='font-poppins-600 text-xs text-purple leading-[18px]'>
                <FormattedMessage id='page.explore_collections.button.load_more' />
              </h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreCollections
