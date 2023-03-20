import React, { useState, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createFeaturedItem, getAllFeaturedItems, removeFeaturedItem, updateFeaturedItem } from '../../../../api/featured'
import { getCollectedListings } from '../../../../api/listing'
import { useMetamask } from '../../../../contexts/Metamask.context'
import { setUpdatedUser } from '../../../../redux/features/userSlice'
import { RootState } from '../../../../redux/store'
import FeaturedItemCard from '../cards/FeaturedItemCard'
import CreateSectionModal from '../modals/CreateSectionModal'
import DeleteSectionModal from '../modals/DeleteSectionModal'
import EditSectionModal from '../modals/EditSectionModal'

const FeaturedItemsTab = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { chain } = useMetamask()
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [user, setUser] = useState<any>({})

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const [featuredItems, setFeaturedItems] = useState<any[]>([])
  const [collectedListings, setCollectedListings] = useState<any[]>([])
  const [createdListings, setCreatedListings] = useState<any[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [collectedLoading, setCollectedLoading] = useState<boolean>(false)
  const [createLoading, setCreateLoading] = useState<boolean>(false)
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)
  const [removeLoading, setRemoveLoading] = useState<boolean>(false)

  const [selectedItem, setSelectedItem] = useState<any>({})

  const getFeaturedItems = async () => {
    setLoading(true)
    const getFeaturedItemsResult = await getAllFeaturedItems()
    if (!getFeaturedItemsResult?.data?.error && getFeaturedItemsResult?.data?.data) {
      setFeaturedItems(getFeaturedItemsResult?.data?.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    setUser(_user)
    const getData = async () => {
      // get featured items
      getFeaturedItems()

      // get collected listings
      setCollectedLoading(true)
      const getCollectedListingsResult = await getCollectedListings(_user?.username || '', chain?.slug || '')
      if (!getCollectedListingsResult?.data?.error && getCollectedListingsResult?.data?.data) {
        setCollectedListings(getCollectedListingsResult?.data?.data)
        setCollectedLoading(false)
      } else {
        setCollectedLoading(false)
      }

      // get created listings
    }

    getData()
  }, [_user, chain])

  const create = async (data: any) => {
    setCreateLoading(true)
    const createResult = await createFeaturedItem(data)
    if (!createResult?.data?.error && createResult?.data?.data) {
      toast.success('Created a new featured item successfully')
      const data = createResult.data.data
      setFeaturedItems(data?.featuredItems || [])
      dispatch(setUpdatedUser(data?.user))
      setCreateLoading(false)
      setOpenCreateModal(false)
    } else {
      toast.error(createResult?.data?.error || 'Unexpected error occurred')
      setCreateLoading(false)
    }
  }

  const edit = (item: any) => {
    setSelectedItem(item)
    setOpenEditModal(true)
  }

  const update = async (data: any, featuredItemId: string) => {
    setUpdateLoading(true)
    const updateResult = await updateFeaturedItem(data, featuredItemId)
    if (!updateResult?.data?.error && updateResult?.data?.data) {
      toast.success('Updated the featured item successfully')
      setFeaturedItems(updateResult.data.data)
      setUpdateLoading(false)
      setOpenEditModal(false)
    } else {
      toast.error(updateResult?.data?.error || 'Unexpected error occurred')
      setUpdateLoading(false)
    }
  }

  const handleRemove = (item: any) => {
    setSelectedItem(item)
    setOpenDeleteModal(true)
  }

  const remove = async (featuredItemId: string) => {
    setRemoveLoading(true)
    const deleteResult = await removeFeaturedItem(featuredItemId)
    if (!deleteResult?.data?.error && deleteResult?.data?.data) {
      toast.success('Deleted the featured item successfully')
      const data = deleteResult.data.data
      setFeaturedItems(data?.featuredItems || [])
      dispatch(setUpdatedUser(data?.user))
      setRemoveLoading(false)
      setOpenDeleteModal(false)
    } else {
      toast.error(deleteResult?.data?.error || 'Unexpected error occurred')
      setRemoveLoading(false)
    }
  }

  return (
    <section className='w-full pt-[42px] px-[89px]'>
      {/* title */}
      <h2 className='font-poppins-600 text-[32px] text-purple-light leading-[98.3%]'>
        <FormattedMessage id='page.account.settings.tab.featured_items.title' />
      </h2>
      <div className='sm:max-w-[390px] w-full mt-[14px]'>
        <h4 className='font-poppins-400 text-sm text-black leading-[21px]'>
          <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.account.settings.tab.featured_items.desc' }) }} />
        </h4>
      </div>
      {/* buttons */}
      <div className='flex flex-row mt-[26px]'>
        <button onClick={() => setOpenCreateModal(true)} className='flex flex-row justify-center items-center w-[213px] h-[49px] bg-purple rounded-md hover:bg-purple-light hover:shadow-sm mr-3'>
          <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
            <FormattedMessage id='page.account.settings.tab.featured_items.button.create_section' />
          </h4>
        </button>
        <button className='flex flex-row justify-center items-center w-[213px] h-[49px] bg-[#D6CCE4] rounded-md hover:bg-[#CDBFE2] hover:shadow-sm'>
          <h4 className='font-poppins-600 text-base text-purple-lighter leading-[98.3%]'>
            <FormattedMessage id='page.account.settings.tab.featured_items.button.view_on_profile' />
          </h4>
        </button>
      </div>
      <div className='w-full mt-9'>
        {featuredItems.length > 0 && featuredItems.map((item: any, index: number) => (
          <FeaturedItemCard
            key={index}
            item={item}
            edit={edit}
            remove={handleRemove}
          />
        ))}
      </div>
      <CreateSectionModal
        isOpen={openCreateModal}
        title={intl.formatMessage({ 'id': 'page.account.settings.tab.featured_items.modal.create_section.title' })}
        close={() => setOpenCreateModal(false)}
        collectedListings={collectedListings}
        loading={loading}
        collectedLoading={collectedLoading}
        create={create}
        createLoading={createLoading}
      />
      <EditSectionModal
        isOpen={openEditModal}
        title={intl.formatMessage({ 'id': 'page.account.settings.tab.featured_items.modal.create_section.title' })}
        close={() => setOpenEditModal(false)}
        collectedListings={collectedListings}
        collectedLoading={collectedLoading}
        update={update}
        updateLoading={updateLoading}
        selectedItem={selectedItem}
      />
      <DeleteSectionModal
        isOpen={openDeleteModal}
        title={intl.formatMessage({'id': 'page.account.settings.tab.featured_items.modal.delete_section.title'})}
        close={() => setOpenDeleteModal(false)}
        removeLoading={removeLoading}
        remove={remove}
        selectedItem={selectedItem}
      />
    </section>
  )
}

export default FeaturedItemsTab
