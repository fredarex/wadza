import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'
import Lottie from 'lottie-react'
import { IModal } from '../../../../types/types'
import { ArrowDownSvgIcon, CloseSvgIcon } from '../../../icons'
import { TabItem } from '../../../_explore_collections'
import SearchIcon from '../../../../assets/svg/search.svg'
import NoItems from '../../NoItems'
import ListingCard from '../cards/ListingCard'
import Loading from '../../../../assets/lotties/loading.json'
import { toast } from 'react-toastify'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  collectedListings: any[]
  loading: boolean
  collectedLoading: boolean
  create: (data: any) => void
  createLoading: boolean
}

const CreateSectionModal = (props: IProps) => {
  const { isOpen, title, close, collectedListings, loading, collectedLoading, create, createLoading } = props
  const intl = useIntl()
  const modalRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<string>('collected')
  const [selectedListings, setSelectedListings] = useState<any[]>([])
  const [section, setSection] = useState<string>('init')
  const [itemDetail, setItemDetail] = useState<any>({
    title: '',
    description: '',
  })
  const [error, setError] = useState<string>('')

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

  const selectTab = (_tab: string) => {
    setTab(_tab)
  }

  const changeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  const onChangeItemDetail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'title') {
      if (!value) {
        setError('Title is required')
      } else {
        setError('')
      }
      setItemDetail({
        ...itemDetail,
        title: value,
      })
    } else if (name === 'description') {
      setItemDetail({
        ...itemDetail,
        description: value,
      })
    }
  }

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value) {
      setError('Title is required')
    } else {
      setError('')
    }
  }

  const validate = () => {
    if (!itemDetail?.title) {
      setError('Title is required')
      return false
    } else if (selectedListings?.length === 0) {
      toast.info('Please select one of the listings')
      return false
    } else {
      return true
    }
  }

  const createFeaturedItem = () => {
    if (validate()) {
      let data = {
        ...itemDetail,
      }

      if (selectedListings.length > 0) {
        let listingIds: string[] = []
        for (const listing of selectedListings) {
          listingIds = [
            ...listingIds,
            listing?._id,
          ]
        }

        data = {
          ...data,
          listings: listingIds,
        }
      }

      create(data)
    }
  }

  return (
    <>
      {isOpen ? (
        <>
          <div
            className='flex fixed justify-center items-center inset-0 z-50'
          >
            <div
              ref={modalRef}
              className='max-w-[768px] w-full'
            >
              {/*content*/}
              <div className='flex flex-col w-full bg-white rounded-[15px]'>
                {/*header*/}
                <div className='flex items-start justify-between pt-[23px] pb-5 px-[26px] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                  <span className='w-[23px]'>&nbsp;</span>
                  <span className='font-poppins-600 text-lg text-purple leading-6'>
                    {section === 'init'? title : intl.formatMessage({'id': 'page.account.settings.tab.featured_items.modal.create_section.title.edit'})}
                  </span>
                  <button
                    onClick={close}
                  >
                    <CloseSvgIcon color='#3C1361' />
                  </button>
                </div>
                {/*body*/}
                {section === 'init' && <div className='flex flex-col w-full'>
                  {/* <div className='flex flex-row items-center w-full h-[52px] bg-[#F0ECF5] pl-10'>
                    <TabItem className='text-purple-light mr-[50px]' onClick={() => selectTab('collected')} selected={tab === 'collected'} category={{ label: intl.formatMessage({ 'id': 'page.profile.tabs.collected' }), value: 'collected' }} />
                    <TabItem className='text-purple-light' onClick={() => selectTab('created')} selected={tab === 'created'} category={{ label: intl.formatMessage({ 'id': 'page.profile.tabs.created' }), value: 'created' }} />          
                  </div> */}
                  <div className='flex flex-col p-[22px]'>
                    <div className='flex flex-row space-x-4'>
                      <div className='flex flex-row items-center max-w-[555px] w-full h-9 bg-[#F5F5F5] px-[10px] rounded'>
                        <button className='flex w-auto justify-end items-center mr-2'>
                          <Image
                            src={SearchIcon}
                            alt='search icon'
                            className='w-[18px] h-[18px]'
                          />
                        </button>
                        <input
                          type='text'
                          className='w-full bg-[#F5F5F5] font-poppins-400 text-sm text-black placeholder:text-[#BCBCBC] focus:outline-none rounded'
                          placeholder={intl.formatMessage({'id': 'page.profile.search.search_by_name'})}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSearchName(e)}
                        />
                      </div>
                      <div className='flex flex-row justify-between items-center max-w-[154px] w-full h-9 bg-[#F5F5F5] px-[11px] rounded cursor-pointer'>
                        <h4 className='font-poppins-400 text-sm text-[#BCBCBC] leading-[98.3%]'>
                          <FormattedMessage id='page.assets.filter.navbar.sortby' />
                        </h4>
                        <ArrowDownSvgIcon color='#BCBCBC' width={10} height={6} />
                      </div>
                    </div>
                    {/* collected listings */}
                    {collectedLoading ? <div className='flex flex-row justify-center items-center w-full h-[320px]'>
                      <Lottie animationData={Loading} style={{ width: 35, height: 50, }} />
                    </div> : collectedListings.length > 0 ? <div className='w-full'>
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[350px] overflow-y-auto mt-3 rounded'>
                        {collectedListings.map((listing: any, index: number) => (
                          <ListingCard
                            key={index}
                            listing={listing}
                            className='bg-[#F5F5F5] rounded'
                            selectedListings={selectedListings}
                            setSelectedListings={setSelectedListings}
                          />
                        ))}
                      </div>
                      {/* selected listings' small images */}
                      <div className='flex flex-row justify-between items-center mt-[23px]'>
                        <div className='flex flex-row w-[calc(100%-126px)] overflow-x-auto space-x-2'>
                          {selectedListings?.length > 0 && selectedListings.map((_listing: any, index: number) => (
                            <picture key={index}>
                              {_listing?.image ? <img
                                src={String(_listing?.image).includes('ipfs://') ? String(_listing?.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : _listing?.image}
                                alt='listing image'
                                className='max-w-[59px] min-w-[59px] h-[58px] object-cover rounded'
                              /> : <img
                                src={process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                                alt='wadza nft default image'
                                className='max-w-[59px] min-w-[59px] h-[58px] object-cover rounded'
                              />}
                            </picture>
                          ))}
                        </div>
                        <div>
                          <button onClick={() => setSection('done')} disabled={selectedListings?.length === 0} className={`flex flex-row justify-center items-center w-[106px] h-[58px] ${selectedListings?.length === 0? 'bg-purple-light' : 'bg-purple'} rounded-md hover:bg-purple-light hover:shadow-sm duration-150`}>
                            <h3 className='font-poppins-600 text-[19px] text-white leading-[98.3%]'>
                              <FormattedMessage id='page.account.settings.tab.featured_items.modal.create_section.button.next' />
                            </h3>
                          </button>
                        </div>
                      </div>
                    </div> : <NoItems className='w-full h-[320px] mt-3' />}
                  </div>
                </div>}
                {section === 'done' && <div className='px-[34px] py-[26px]'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div className='flex flex-col'>
                      <label className='font-poppins-400 text-base text-purple leading-6 mb-1'>
                        <FormattedMessage id='page.account.settings.tab.featured_items.modal.create_section.title.label' />
                      </label>
                      <input
                        type={`text`}
                        name='title'
                        value={itemDetail?.title || ''}
                        className='w-full h-11 pl-4 bg-[#F5F5F5] rounded-md text-black placeholder:text-[#BCBCBC] outline-none'
                        placeholder={intl.formatMessage({'id': 'page.account.settings.tab.featured_items.modal.create_section.title.placeholder'})}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeItemDetail(e)}
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => onBlur(e)}
                      />
                      {error && <h5 className='font-poppins-400 text-red text-[11px] mt-1'>{error}</h5>}
                    </div>
                    <div className='flex flex-col'>
                      <label className='font-poppins-400 text-base text-purple leading-6 mb-1'>
                        <FormattedMessage id='page.account.settings.tab.featured_items.modal.create_section.description.label' />
                      </label>
                      <textarea
                        name='description'
                        value={itemDetail?.description || ''}
                        className='w-full h-11 pl-4 pt-2 bg-[#F5F5F5] rounded-md text-black placeholder:text-[#BCBCBC] outline-none'
                        placeholder={intl.formatMessage({'id': 'page.account.settings.tab.featured_items.modal.create_section.description.placeholder'})}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeItemDetail(e)}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-[25px]'>
                    {selectedListings?.length > 0 && selectedListings.map((_listing: any, index: number) => (
                      <picture key={index}>
                        {_listing?.image ? <img
                          src={String(_listing?.image).includes('ipfs://') ? String(_listing?.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : _listing?.image}
                          alt='listing image'
                          className='max-w-full min-w-full h-[104px] object-cover rounded'
                        /> : <img
                          src={process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                          alt='wadza nft default image'
                          className='max-w-full min-w-full h-[104px] object-cover rounded'
                        />}
                      </picture>
                    ))}
                  </div>
                  <button onClick={() => createFeaturedItem()} disabled={createLoading} className={`flex flex-row justify-center items-center w-full h-[58px] ${createLoading ? 'bg-purple-light' : 'bg-purple'} rounded-[14px] mt-[55px] hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {createLoading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                      <FormattedMessage id='page.account.settings.tab.featured_items.modal.create_section.button.done' />
                    </h4>}
                  </button>
                </div>}
              </div>
            </div>
          </div>
          <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  )
}

export default CreateSectionModal
