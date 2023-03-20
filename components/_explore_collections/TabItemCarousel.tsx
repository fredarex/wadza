import { useRouter } from 'next/router'
import React,{useState,useEffect,useMemo} from 'react'
import { isMobile } from 'react-device-detect'
import { useIntl } from 'react-intl'
import { getAllCollectionsByCategory } from '../../api/collection'
import { CategoryData } from '../../mock/CategoryData'
import { IMockCategory } from '../../types/types'
import TabItem from './TabItem'


function TabItemCarousel() {
    const router = useRouter();
    const intl = useIntl()
    const [tab, setTab] = useState<string>('trending')
    const [collections, setCollections] = useState<any[]>([])
    const _tab = useMemo(() => router.query.tab as string || '', [router])

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
    return (
    <div className='min-w-[100vw] relative flex lg:hidden items-center'>
        <div id="slider" className='min-w-[100vw] scrollbar-hide  overflow-x-scroll whitespace-nowrap scroll-smooth flex'>
            <TabItem className=' py-2 mx-4 text-black inline-block' onClick={() => selectTab('trending')} selected={tab === 'trending'} category={{label: intl.formatMessage({'id': 'page.home.featured.tabs.section.label.trending'}), value: 'trending'}} />
            <TabItem className=' py-2 mx-4 text-black inline-block' onClick={() => selectTab('top')} selected={tab === 'top'} category={{label: intl.formatMessage({'id': 'page.explore_collections.tabs.top'}), value: 'top'}} />
            {CategoryData.length > 0 && CategoryData.map((category: IMockCategory, index: number) => (
              <TabItem key={index} className=' mx-4 py-2 text-black inline-block' onClick={selectTab} selected={tab === category.value} category={category} />
            ))}
        </div>
    </div>
  )
}

export default TabItemCarousel