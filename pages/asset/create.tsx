import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDropzone } from 'react-dropzone'

import { RootState } from '../../redux/store'
import { uploadFileToPinata, saveListing } from '../../api/listing'
import { issueToken } from '../../api/contracts/nftBuilder'
import constants from '../../utils/constants'
import { INftAttributeData, INftData, INftErrorMsg, INftStatsData } from '../../types/types'

import Autocomplete from '../../components/autocomplete/Autocomplete'
import { MainInput, MainLabel, MainDescription } from '../../components/form'
import { AddAttribute, ContentStatus } from '../../components/_create_nft'

import ImagePlaceholderIcon from '../../assets/svg/image_placeholder.svg'
import { CloseSvgIcon } from '../../components/icons'
import AddPropertyModal from '../../components/modals/AddPropertyModal'
import AddLevelModal from '../../components/modals/AddLevelModal'
import { getOwnedAllCollections } from '../../api/collection'
import { setOwnedCollections } from '../../redux/features/collectionSlice'
import { contractAddresses } from '../../config'
import Lottie from 'lottie-react'
import Loading from '../../assets/lotties/loading.json'
import { useMetamask } from '../../contexts/Metamask.context'
import { setMintedModal } from '../../redux/features/userSlice'

const styles = {
  input: 'bg-[#F5F5F5] font-poppins-400 text-sm py-[13px] px-[19px] leading-[21px] rounded-md placeholder:text-[#BCBCBC]',
  textarea: 'max-w-[579px] w-full min-h-[169px] bg-[#F5F5F5] mt-8 rounded-md font-poppins-400 text-sm text-black-lighter leading-[21px] placeholder:text-[#BCBCBC] px-[19px] py-[13px] outline-none',
  image: 'relative group/image flex flex-row justify-center items-center max-w-[455px] w-full h-[236px] mt-[29px] rounded-[14px] border border-dashed border-[#8B6EAE] hover:bg-purple-lighter/10 cursor-pointer',
  button: 'flex flex-row justify-center items-center max-w-[243px] w-full h-[58px] rounded-md mt-[72px] hover:bg-purple-light ease-in duration-100',
}

const Create = () => {
  const intl = useIntl()
  const router = useRouter()
  const dispatch = useDispatch()
  const { chain } = useMetamask()
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<any>({})
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [collections, setCollections] = useState<Array<any>>([])
  const _collections: any = useSelector((state: RootState) => state.collection.collections)
  const { account, signMessage } = useMetamask()
  const getCollectionsRan = useRef(false)
  const { ATTRIBUTS, CONTENT_STATUSES } = constants()
  const [modal, setModal] = useState({
    properties: false,
    levels: false,
    stats: false,
  })
  const [properties, setProperties] = useState<INftAttributeData[]>([{
    trait_type: '',
    value: '',
  }])
  const [levels, setLevels] = useState<INftStatsData[]>([{
    trait_type: '',
    value: {
      amount: 3,
      total: 7
    },
  }])
  const [stats, setStats] = useState<INftStatsData[]>([{
    trait_type: '',
    value: {
      amount: 3,
      total: 7
    },
  }])
  const [showUnlockableContent, setShowUnlockableContent] = useState<boolean>(false)


  const [nftData, setNftData] = useState<INftData>({
    image: null,
    fileType: '',
    name: '',
    collectionId: '',
    externalLink: '',
    unlockableContent: '',
    explicit: false,
    description: '',
    descriptionArabic: '',
    supply: '1',
    properties: [],
    stats: [],
    levels: [],
  })

  const [nftErrorMsg, setNftErrorMsg] = useState<INftErrorMsg>({
    image: '',
    name: '',
    supply: '',
  })

  useEffect(() => {
    setUser(_user)
  }, [_user])

  useEffect(() => {
    if (getCollectionsRan.current === false) {
      const getCollections = async () => {
        const response = await getOwnedAllCollections()

        if (response?.data?.data) {
          dispatch(setOwnedCollections(response.data.data))
          setCollections(response.data.data)
        }
      }

      getCollections()

      return () => {
        getCollectionsRan.current = true
      }
    }
  }, [dispatch])

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      const type = acceptedFiles[0].type
      if (Number(acceptedFiles[0].size) > 100000000) {
        setNftErrorMsg({
          ...nftErrorMsg,
          image: 'Upload size should not be greater than 100MB!'
        })
      } else {
        setNftErrorMsg({ ...nftErrorMsg, image: '' })
      }

      if (type.includes('video')) {
        setNftData({ ...nftData, fileType: 'video', image: acceptedFiles[0] })
      } else {
        setNftData({ ...nftData, fileType: 'image', image: acceptedFiles[0] })
      }
    }
  }, [nftData, nftErrorMsg])

  const { getRootProps, open, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  })

  const onClickCreate = useCallback(
    async () => {
      const dataValidation = () => {
        let obj = { ...nftErrorMsg }
        if (nftData.image === null) {
          obj.image = 'NFT image is required.'
        } else {
          obj.image = ''
        }
        if (nftData.name === '') {
          obj.name = 'NFT name is required.'
        } else {
          obj.name = ''
        }
        if (nftData.supply === '') {
          obj.supply = 'Supply is required.'
        } else {
          obj.supply = ''
        }
    
        setNftErrorMsg({
          ...nftErrorMsg,
          image: obj.image,
          name: obj.name,
          supply: obj.supply,
        })
    
        if (nftData.image === null || nftData.name === '' || nftData.supply === '') {
          return false
        }
    
        return true
      }

      try {
        if (!user) {
          toast.warning('Please login first!')
          return
        }

        if (!account) {
          const message = 'Welcome to Wadza! Sign for NFT minting'
          await signMessage(message)
        }
        
        if (dataValidation()) {
          const nftCreation = toast.loading('Please wait while we mint your NFT...')
          setLoading(true)
          const formData: any = new FormData()
          formData.append('image', nftData.image)
          formData.append('name', nftData.name)
          formData.append('description', nftData.description)
          formData.append('descriptionArabic', nftData.descriptionArabic)
          formData.append('price', '0')
          formData.append('category', 'art')
          formData.append('numberOfCopies', nftData.supply)
          formData.append('isFixedPrice', true)
          formData.append('isTimedAuction', false)
          formData.append('availableUnits', nftData.supply)
          formData.append('currency', 'ETH')
          formData.append('collectionId', nftData.collectionId)
          formData.append('attributes', JSON.stringify(nftData.properties))
          formData.append('levels', JSON.stringify(nftData.levels))
          formData.append('stats', JSON.stringify(nftData.stats))
          formData.append('unlockableContent', nftData.unlockableContent)
          formData.append('explicit', nftData.explicit)
          formData.append('externalLink', nftData.externalLink)
          formData.append('tokenAddress', contractAddresses.NFTBUILDER)

          const uploadResult: any = await uploadFileToPinata(formData)
          
          const issueTokenResult: any = await issueToken(
            user?.walletAddress,
            uploadResult?.data?.data?.ipfsHashUrl,
          )

          if (issueTokenResult?.data && !issueTokenResult?.data?.err) {
            const txHash = issueTokenResult?.data?.transactionHash || ''
            const newTokenId = parseInt(String(issueTokenResult?.data?.events?.Transfer?.returnValues?.tokenId))

            formData.append('ipfsHash', uploadResult?.data?.data?.ipfsHash)
            formData.append('fileType', uploadResult?.data?.data?.fileType)
            formData.append('tokenId', String(newTokenId))
            formData.append('ipfsHashUrl', uploadResult?.data?.data?.ipfsHashUrl)
            formData.append('txHash', txHash)
            saveListing(formData)
              .then((data) => {
                if (!data?.data?.error && data?.data?.data) {
                  toast.update(nftCreation, { render: 'NFT was minted successfully', type: 'success', isLoading: false, autoClose: 3000 })
                  setLoading(false)
                  resolveData(data)

                  dispatch(setMintedModal(true))

                  router.push({
                    pathname: `/assets/${chain?.slug}/${contractAddresses.NFTBUILDER}/${newTokenId}`
                  })
                }
              })
              .catch((error) => {
                setLoading(false)
                toast.update(nftCreation, { render: error, type: 'error', isLoading: false, autoClose: 3000 })
                console.error(error)
              })
          } else {
            toast.update(nftCreation, { render: issueTokenResult?.data?.err?.message || issueTokenResult?.err, type: 'info', isLoading: false, autoClose: 3000 })
            setLoading(false)
          }
          setLoading(false)
        }

        return
      } catch (error) {
        return console.log(error)
      }
    }, [nftErrorMsg, nftData, user, account, signMessage, chain, dispatch, router]
  )

  const resolveData = (data: any) => {
    if (data) {
      if (data.data.err) {
        toast.error('Something went wrong!')
      }
      if (!data.data.err) {
        setNftData({
          image: null,
          fileType: '',
          name: '',
          collectionId: '',
          externalLink: '',
          unlockableContent: '',
          explicit: false,
          description: '',
          descriptionArabic: '',
          supply: '1',
          properties: [],
          stats: [],
          levels: [],
        })
      }
    }
  }
  
  const addMoreProperty = () => {
    setProperties([
      ...properties,
      {
        trait_type: '',
        value: '',
      }
    ])
  }

  const changeProperty = (value: string, index: number, div: string) => {
    const _properties = properties?.map((property: INftAttributeData, i: number) => {
      if (i === index) {
        return {
          ...property,
          [div]: value,
        }
      } else {
        return property
      }
    })

    setProperties(_properties)
  }

  const removeProperty = (index: number) => {
    const _properties = properties?.filter((property: INftAttributeData, i: number) => i !== index)
    if (_properties?.length === 0) {
      setProperties([
        {
          trait_type: '',
          value: '',
        },
      ])
    } else {
      setProperties(_properties)
    }
  }

  const saveProperties = () => {
    const _properties = properties?.filter((property: INftAttributeData, index: number) => property.trait_type !== '' && property.value !== '')
    if (_properties?.length === 0) {
      setProperties([
        {
          trait_type: '',
          value: '',
        },
      ])
    } else {
      setProperties(_properties)
      setNftData({ ...nftData, properties: _properties, })
    }
    setModal({ ...modal, properties: false, })
  }
  
  const addMoreLevel = () => {
    setLevels([
      ...levels,
      {
        trait_type: '',
        value: {
          amount: 3,
          total: 7,
        },
      }
    ])
  }

  const changeLevel = (value: any, index: number, div: string, sub: string) => {
    const _levels = levels?.map((level: INftStatsData, i: number) => {
      if (i === index && div === 'trait_type') {
        return {
          ...level,
          [div]: value,
        }
      } else if (i === index && div === 'value') {
        if (sub === 'amount' && value > level.value?.total!) {
          return level
        }
        return {
          ...level,
          value: {
            ...level.value,
            [sub]: value,
          }
        }
      } else {
        return level
      }
    })

    setLevels(_levels)
  }

  const removeLevel = (index: number) => {
    const _levels = levels?.filter((level: INftStatsData, i: number) => i !== index)
    if (_levels?.length === 0) {
      setLevels([
        {
          trait_type: '',
          value: {
            amount: 3,
            total: 7,
          },
        },
      ])
    } else {
      setLevels(_levels)
    }
  }

  const saveLevels = () => {
    const _levels = levels?.filter((level: INftStatsData, index: number) => level.trait_type !== '')
    if (_levels?.length === 0) {
      setLevels([
        {
          trait_type: '',
          value: {
            amount: 3,
            total: 7,
          },
        },
      ])
    } else {
      setLevels(_levels)
      setNftData({ ...nftData, levels: _levels, })
    }
    setModal({ ...modal, levels: false, })
  }
  
  const addMoreStat = () => {
    setStats([
      ...stats,
      {
        trait_type: '',
        value: {
          amount: 3,
          total: 7,
        },
      }
    ])
  }

  const changeStat = (value: any, index: number, div: string, sub: string) => {
    const _stats = stats?.map((stat: INftStatsData, i: number) => {
      if (i === index && div === 'trait_type') {
        return {
          ...stat,
          [div]: value,
        }
      } else if (i === index && div === 'value') {
        if (sub === 'amount' && value > stat.value?.total!) {
          return stat
        }
        return {
          ...stat,
          value: {
            ...stat.value,
            [sub]: value,
          }
        }
      } else {
        return stat
      }
    })

    setStats(_stats)
  }

  const removeStat = (index: number) => {
    const _stats = stats?.filter((stat: INftStatsData, i: number) => i !== index)
    if (_stats?.length === 0) {
      setLevels([
        {
          trait_type: '',
          value: {
            amount: 3,
            total: 7,
          },
        },
      ])
    } else {
      setStats(_stats)
    }
  }

  const saveStats = () => {
    const _stats = stats?.filter((stat: INftStatsData, index: number) => stat.trait_type !== '')
    if (_stats?.length === 0) {
      setStats([
        {
          trait_type: '',
          value: {
            amount: 3,
            total: 7,
          },
        },
      ])
    } else {
      setStats(_stats)
      setNftData({ ...nftData, stats: _stats, })
    }
    setModal({ ...modal, stats: false, })
  }

  return (
    <div className='flex flex-row justify-center mt-[136px]'>
      <div className='flex flex-col max-w-[1250px] w-full'>
        <div className='flex flex-row justify-center items-center max-w-[357px] w-full bg-[#DFDBE4] px-13 py-8 rounded-t-[15px]'>
          <span className='font-poppins-700 text-3xl text-black-lighter'>
            <FormattedMessage id='page.nft.creation.title' />
          </span>
        </div>
        <div className='w-full bg-purple-lightest px-[52px] pt-[38px] pb-[90px] rounded-[0px_15px_15px_15px]'>
          <span className='font-poppins-400 text-sm text-black-lighter leading-[98.3%]'>
            <span className='text-[#DB5C5C]'>*</span>&nbsp;<FormattedMessage id='page.nft.creation.required_fields' />
          </span>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-9'>
            <div className='flex flex-col'>
              {/* image upload */}
              <div>
                <MainLabel label={intl.formatMessage({ 'id': 'page.nft.creation.image.label' })} required={true} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.nft.creation.image.desc' })} className='max-w-[455px] w-full mt-3' />
                <div className={styles.image} {...getRootProps()} onClick={open}>
                  <input {...getInputProps()} disabled={loading} />
                  {nftData.image && <div className='absolute w-full h-full box-border'>
                    {nftData.fileType === 'video' ?
                      (
                        <video autoPlay loop muted className='max-w-[455px] w-full h-[234px] rounded-[14px]'>
                          <source src={URL.createObjectURL(nftData.image)} />
                        </video>
                      ) :
                      (
                        <picture><img src={URL.createObjectURL(nftData.image)} alt='nft image' className='min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] rounded-[14px] object-cover' /></picture>
                      )
                    }
                    <div className='absolute top-3 right-3 z-20' onClick={(e) => {
                      e.stopPropagation()
                      setNftData({ ...nftData, image: null, })
                      setNftErrorMsg({ ...nftErrorMsg, image: '', })
                      return
                    }}>
                      <CloseSvgIcon color='white' />
                    </div>
                  </div>}
                  <div className='absolute hidden group-hover/image:block p-1 w-full h-full '>
                    <div className='w-full h-full rounded-[14px] bg-black/40'>
                    </div>
                  </div>
                  <Image
                    src={ImagePlaceholderIcon}
                    alt='image placeholder'
                    className='min-w-[70px] max-w-[96px] w-full h-auto group-hover/image:z-[1] group-hover/image:opacity-90'
                  />
                </div>
                {nftErrorMsg.image && (<span className='font-poppins-400 text-[9px] text-red-600 mt-1 leading-4'>
                  {nftErrorMsg.image}
                </span>)}
              </div>
              {/* select collection */}
              <div className='mt-12'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.nft.creation.collection.label' })} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.nft.creation.collection.desc' })} className='mt-3' info={true} />
                <Autocomplete
                  options={collections}
                  data={nftData}
                  onChange={setNftData}
                  className='max-w-[455px] w-full h-[44px] mt-[19px]'
                  placeholder={intl.formatMessage({ 'id': 'page.nft.creation.collection.placeholder' })}
                />
              </div>
              {/* attributes */}
              <div className='max-w-[455px] w-full mt-8'>
                <AddAttribute attribute={ATTRIBUTS[0]} onClick={() => setModal({ ...modal, properties: true, })} properties={nftData.properties} />
                <AddAttribute attribute={ATTRIBUTS[1]} onClick={() => setModal({ ...modal, levels: true, })} levels={nftData.levels} />
                <AddAttribute attribute={ATTRIBUTS[2]} onClick={() => setModal({ ...modal, stats: true, })} stats={nftData.stats} />
                <ContentStatus attribute={CONTENT_STATUSES[0]} enabled={showUnlockableContent} onChange={() => setShowUnlockableContent(!showUnlockableContent)} />
                {showUnlockableContent && (
                  <>
                    <textarea
                      onChange={(e) => setNftData({ ...nftData, unlockableContent: e.target.value })}
                      className='max-w-[579px] w-full min-h-[169px] bg-[#F5F5F5] rounded-md font-poppins-400 text-sm text-black-lighter leading-[21px] placeholder:text-[#BCBCBC] px-[19px] py-[13px] outline-none'
                      placeholder={intl.formatMessage({ 'id': 'page.nft.creation.unlockable_content.placeholder' })}
                      value={nftData.unlockableContent}
                    />
                    <MainDescription description={intl.formatMessage({ 'id': 'page.nft.creation.unlockable_content.desc' })} className='my-3 max-w-[455px] w-full' />
                  </>
                )}
                <ContentStatus attribute={CONTENT_STATUSES[1]} enabled={nftData.explicit!} onChange={() => setNftData({ ...nftData, explicit: !nftData.explicit })} />
              </div>
              {/* freeze metadata */}
              <div className='mt-[52px]'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.nft.creation.freeze.label' })} info={true} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.nft.creation.freeze.desc' })} className='mt-3 max-w-[455px] w-full' />
                <div className='flex flex-row justify-center items-center max-w-[455px] w-full h-11 bg-[#D8CCE7] rounded-md mt-[19px]'>
                  <span className='font-poppins-400 text-sm text-[#AC98C0] leading-[21px]'>
                    <FormattedMessage id='page.nft.creation.freeze.note' />
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              {/* name */}
              <div className='flex flex-col'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.nft.creation.name.label' })} required={true} />
                <MainInput
                  type='text'
                  value={nftData.name}
                  onChange={(e) => setNftData({ ...nftData, name: e.target.value })}
                  placeholder={intl.formatMessage({ 'id': 'page.nft.creation.name.placeholder' })}
                  className='max-w-[579px] w-full mt-[17px]'
                  inputClassName={styles.input}
                  errorMsg={nftErrorMsg.name}
                />
              </div>
              {/* external link */}
              <div className='flex flex-col mt-[49px]'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.nft.creation.external_link.label' })} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.nft.creation.external_link.desc' })} className='mt-3 max-w-[463px] w-full' />
                <MainInput
                  type='text'
                  value={nftData.externalLink}
                  onChange={(e) => setNftData({ ...nftData, externalLink: e.target.value })}
                  placeholder='https://yoursite.io/item/123'
                  className='max-w-[579px] w-full mt-[17px]'
                  inputClassName={styles.input}
                />
              </div>
              {/* description (English) */}
              <div className='flex flex-col mt-[60px]'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.nft.creation.description_english.label' })} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.nft.creation.description_english.desc' })} className='mt-3 max-w-[463px] w-full' />
                <textarea
                  onChange={(e) => setNftData({ ...nftData, description: e.target.value })}
                  className={styles.textarea}
                  placeholder={intl.formatMessage({ 'id': 'page.nft.creation.description_placeholder' })}
                  value={nftData.description}
                />
              </div>
              {/* description (Arabic) */}
              <div className='flex flex-col mt-[52px]'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.nft.creation.description_arabic.label' })} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.nft.creation.description_arabic.desc' })} className='mt-3 max-w-[463px] w-full' />
                <textarea
                  onChange={(e) => setNftData({ ...nftData, descriptionArabic: e.target.value })}
                  className={styles.textarea}
                  placeholder={intl.formatMessage({ 'id': 'page.nft.creation.description_placeholder' })}
                  value={nftData.descriptionArabic}
                />
              </div>
              {/* supply */}
              <div className='flex flex-col mt-[52px]'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.nft.creation.supply.name' })} required={true} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.nft.creation.supply.desc' })} className='mt-3 max-w-[495px] w-full' info={true} />
                <MainInput
                  type='text'
                  value={nftData.supply}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value)))
                      return
                    setNftData({ ...nftData, supply: e.target.value })
                  }}
                  placeholder='Supply amount'
                  className='max-w-[579px] w-full mt-[17px]'
                  inputClassName={styles.input}
                  errorMsg={nftErrorMsg.supply}
                />
              </div>
            </div>
          </div>
          {/* create button */}
          <button onClick={() => onClickCreate()} disabled={loading} className={`${styles.button} ${loading ? 'bg-purple-light' : 'bg-purple'}`}>
            {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
              <FormattedMessage id='page.home.navbar.menu.create' />
            </h4>}
          </button>
        </div>
      </div>
      <AddPropertyModal
        isOpen={modal.properties}
        properties={properties!}
        title={intl.formatMessage({'id': 'page.nft.creation.add_property_modal.title'})}
        description={intl.formatMessage({'id': 'page.nft.creation.add_property_modal.desc'})}
        close={() => setModal({ ...modal, properties: false, })}
        addMore={addMoreProperty}
        onChange={changeProperty}
        remove={removeProperty}
        save={saveProperties}
      />
      <AddLevelModal
        isOpen={modal.levels}
        data={levels!}
        title={intl.formatMessage({'id': 'page.nft.creation.add_level_modal.title'})}
        description={intl.formatMessage({'id': 'page.nft.creation.add_level_modal.desc'})}
        close={() => setModal({ ...modal, levels: false, })}
        addMore={addMoreLevel}
        onChange={changeLevel}
        remove={removeLevel}
        save={saveLevels}
      />
      <AddLevelModal
        isOpen={modal.stats}
        data={stats!}
        title={intl.formatMessage({'id': 'page.nft.creation.add_stat_modal.title'})}
        description={intl.formatMessage({'id': 'page.nft.creation.add_stat_modal.desc'})}
        close={() => setModal({ ...modal, stats: false, })}
        addMore={addMoreStat}
        onChange={changeStat}
        remove={removeStat}
        save={saveStats}
      />
    </div>
  )
}

export default Create
