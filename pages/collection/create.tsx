import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'
import { Menu, Switch, Transition } from '@headlessui/react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { RootState } from '../../redux/store'
import { useMetamask } from '../../contexts/Metamask.context'
import { saveCollection } from '../../api/collection'
import { MainDescription, MainInput, MainLabel } from '../../components/form'
import { CloseSvgIcon, GlobeSvgIcon, MediumSvgIcon, TelegramSvgIcon } from '../../components/icons'
import Autocomplete from '../../components/autocomplete/AutocompleteAddTokens'
import { ThemeOption, CreatorFee } from '../../components/_collection'
import constants from '../../utils/constants'
import { ICreatorFee, ICollectionData, ICollectionErrorMsg, ICollectionTheme, IPaymentToken, IMockCategory } from '../../types/types'
import { CategoryData } from '../../mock/CategoryData'

import ImagePlaceholderIcon from '../../assets/svg/image_placeholder.svg'
import ETHIcon from '../../assets/svg/tokens/eth.svg'
import WETHIcon from '../../assets/svg/tokens/weth.svg'

const styles = {
  input: 'bg-[#F5F5F5] font-poppins-400 text-sm py-[13px] px-[19px] leading-[21px] rounded-md placeholder:text-[#BCBCBC]',
  linksInput: 'w-full bg-[#F5F5F5] font-poppins-400 text-sm text-black leading-[21px] placeholder:text-[#BCBCBC] ml-[14px] py-[11px] focus:outline-none',
  textarea: 'max-w-[579px] w-full min-h-[169px] bg-[#F5F5F5] mt-8 rounded-md font-poppins-400 text-sm text-black-lighter mt-[23px] leading-[21px] placeholder:text-[#BCBCBC] px-[19px] py-[13px] outline-none',
  logoImage: 'relative group/logo-image flex flex-row justify-center items-center max-w-[149px] w-full h-[149px] mt-[29px] rounded-full border border-dashed border-[#8B6EAE] hover:bg-purple-lighter/10 cursor-pointer',
  featuredImage: 'relative group/featured-image flex flex-row justify-center items-center max-w-[233px] w-full h-[156px] mt-[25px] rounded-[14px] border border-dashed border-[#8B6EAE] hover:bg-purple-lighter/10 cursor-pointer',
  bannerImage: 'relative group/banner-image flex flex-row justify-center items-center max-w-[433px] w-full h-[156px] mt-[26px] rounded-[14px] border border-dashed border-[#8B6EAE] hover:bg-purple-lighter/10 cursor-pointer',
  switch: 'relative inline-flex items-center h-[23.68px] w-[50px] mt-[13px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
  explicitSwitchHandle: 'pointer-events-none inline-block h-[18.42px] w-[18.42px] transform rounded-full bg-purple-lighter shadow-lg ring-0 transition duration-200 ease-in-out',
  raritySwitchHandle: 'pointer-events-none inline-block h-[18.42px] w-[18.42px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
  button: 'flex flex-row justify-center items-center max-w-[243px] w-full h-[58px] bg-purple font-poppins-600 text-base text-white leading-[98.3%] rounded-md mt-[72px] hover:bg-purple-light ease-in duration-100',
}

const CollectionCreate = () => {
  const intl = useIntl()
  const { chain } = useMetamask()
  const [user, setUser] = useState<any>({})
  const _user: any = useSelector((state: RootState) => state.user.user)
  const { PAYMENT_TOKENS, COLLECTION_THEMES } = constants()
  const [options, setOptions] = useState<IPaymentToken[]>(PAYMENT_TOKENS)
  const [categories, setCategories] = useState<IMockCategory[]>(CategoryData)
  const [loading, setLoading] = useState<boolean>(false)
  const [rarityDisabled, setRarityDisabled] = useState<boolean>(true)
  const [collectionData, setCollectionData] = useState<ICollectionData>({
    logoImage: null,
    featuredImage: null,
    bannerImage: null,
    ownWebsite: '',
    mediumAddress: '',
    telegramAddress: '',
    creatorFees: [],
    explicit: false,
    rarity: false,
    name: '',
    url: '',
    description: '',
    descriptionArabic: '',
    category: [],
    paymentTokens: [
      {
        symbol: 'ETH',
        chain: chain?.name,
        icon: ETHIcon,
        removable: false,
      },
      {
        symbol: 'WETH',
        chain: chain?.name,
        icon: WETHIcon,
        removable: false,
      },
    ],
    displayTheme: 'contained',
  })
  const [collectionErrorMsg, setCollectionErrorMsg] = useState<ICollectionErrorMsg>({
    logoImage: '',
    name: '',
  })

  useEffect(() => {
    setUser(_user)
  }, [_user])

  // logo image
  const onLogoImageDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setCollectionData({ ...collectionData, logoImage: acceptedFiles[0] })
    }
  }, [collectionData])
  const { getRootProps: getLogoImageRootProps, open: logoImageOpen, getInputProps: getLogoImageInputProps } = useDropzone({
    onDrop: onLogoImageDrop,
    noClick: true,
    noKeyboard: true,
  })

  // featured image
  const onFeaturedImageDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setCollectionData({ ...collectionData, featuredImage: acceptedFiles[0] })
    }
  }, [collectionData])
  const { getRootProps: getFeaturedImageRootProps, open: featuredImageOpen, getInputProps: getFeaturedImageInputProps } = useDropzone({
    onDrop: onFeaturedImageDrop,
    noClick: true,
    noKeyboard: true,
  })

  // banner image
  const onBannerImageDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setCollectionData({ ...collectionData, bannerImage: acceptedFiles[0] })
    }
  }, [collectionData])
  const { getRootProps: getBannerImageRootProps, open: bannerImageOpen, getInputProps: getBannerImageInputProps } = useDropzone({
    onDrop: onBannerImageDrop,
    noClick: true,
    noKeyboard: true,
  })

  const removePaymentToken = (token: IPaymentToken,index: number) => {
    // remove from collection's payment tokens
    const _paymentTokens = collectionData.paymentTokens.filter((paymentToken: IPaymentToken, i: number) => i !== index)
    setCollectionData({ ...collectionData, paymentTokens: _paymentTokens, })

    // add to options list again
    setOptions(current => [token, ...options])
  }

  const dataValidation = useCallback(() => {
    let obj = { ...collectionErrorMsg }
    if (collectionData.logoImage === null) {
      obj.logoImage = 'Logo image is required.'
    } else {
      obj.logoImage = ''
    }
    if (collectionData.name === '') {
      obj.name = 'Name is required.'
    } else {
      obj.name = ''
    }

    setCollectionErrorMsg({
      ...collectionData,
      logoImage: obj.logoImage,
      name: obj.name,
    })

    if (collectionData.logoImage === null || collectionData.name === '') {
      return false
    }

    return true
  }, [collectionData, collectionErrorMsg])

  const resolveData = useCallback((data: any) => {
    if (data) {
      if (data.data.err) {
        toast.error('Something went wrong!')
      }
      if (!data.data.err) {
        setCollectionData({
          logoImage: null,
          featuredImage: null,
          bannerImage: null,
          ownWebsite: '',
          mediumAddress: '',
          telegramAddress: '',
          creatorFees: [],
          explicit: false,
          rarity: false,
          name: '',
          url: '',
          description: '',
          descriptionArabic: '',
          category: [],
          paymentTokens: [
            {
              symbol: 'ETH',
              chain: chain?.name,
              icon: ETHIcon,
              removable: false,
            },
            {
              symbol: 'WETH',
              chain: chain?.name,
              icon: WETHIcon,
              removable: false,
            },
          ],
          displayTheme: 'contained',
        })
      }
    }
  }, [chain])

  const onClickCreate = useCallback(
    async () => {
      try {
        if (!user) {
          toast.warning('Please login first!')
          return
        }
        if (dataValidation()) {
          const _paymentTokens = collectionData.paymentTokens.map((paymentToken: IPaymentToken, index: number) => {
            return {
              symbol: paymentToken.symbol,
              chain: paymentToken.chain,
            }
          })

          const _categories = collectionData.category.map((category: IMockCategory, index: number) => {
            return category.value
          })

          const collectionCreation = toast.loading('Please wait while the collection is being created...')
          setLoading(true)

          const formData: any = new FormData()
          formData.append('logoImage', collectionData.logoImage)
          formData.append('featuredImage', collectionData.featuredImage)
          formData.append('bannerImage', collectionData.bannerImage)
          formData.append('ownWebsite', collectionData.ownWebsite)
          formData.append('mediumAddress', collectionData.mediumAddress)
          formData.append('telegramAddress', collectionData.telegramAddress)
          formData.append('creatorFees', JSON.stringify(collectionData.creatorFees))
          formData.append('explicit', collectionData.explicit)
          formData.append('rarity', collectionData.rarity)
          formData.append('name', collectionData.name)
          formData.append('url', collectionData.url)
          formData.append('description', collectionData.description)
          formData.append('descriptionArabic', collectionData.descriptionArabic)
          formData.append('category', JSON.stringify(_categories))
          formData.append('paymentTokens', JSON.stringify(_paymentTokens))
          formData.append('displayTheme', collectionData.displayTheme)

          saveCollection(formData)
            .then((data) => {
              console.log('saveResult data :: ', data)
              toast.update(collectionCreation, { render: 'Collection was created successfully', type: 'success', isLoading: false, autoClose: 3000 })
              setLoading(false)
              resolveData(data)
            })
            .catch((error) => {
              toast.update(collectionCreation, { render: 'Collection was not created', type: 'error', isLoading: false, autoClose: 3000 })
              setLoading(false)
              console.error(error)
            })
        }

        return
      } catch (error) {
        return console.log(error)
      }
    }, [dataValidation, collectionData, resolveData, user]
  )

  const addCreatorFee = () => {
    setCollectionData({
      ...collectionData,
      creatorFees: [
        ...collectionData.creatorFees,
        {
          address: '',
          percentage: 0,
        }
      ]
    })
  }

  const changeCreatorFee = (value: string, index: number, div: string) => {
    const _fees = collectionData.creatorFees?.map((fee: ICreatorFee, i: number) => {
      if (i === index) {
        if (div === 'percentage') {
          if (isNaN(Number(value)) || Number(value) > 10) {
            return fee
          }
        }
        return {
          ...fee,
          [div]: value,
        }
      } else {
        return fee
      }
    })

    setCollectionData({ ...collectionData, creatorFees: _fees, })
  }

  const removeCreatorFee = (index: number) => {
    const _fees = collectionData.creatorFees?.filter((fee: ICreatorFee, i: number) => i !== index)
    setCollectionData({ ...collectionData, creatorFees: _fees, })
  }

  const addCategory = (c: IMockCategory, index: number) => {
    setCollectionData({ ...collectionData, category: [ ...collectionData.category, c ]})

    const _categories = categories.filter((category: IMockCategory, i: number) => i !== index)
    setCategories(_categories)
  }

  const removeCategory = (category: IMockCategory, index: number) => {
    const _category = collectionData.category.filter((c: IMockCategory, i: number) => i !== index)
    setCollectionData({ ...collectionData, category: _category})

    setCategories([ category, ...categories, ])
  }

  return (
    <div className='flex flex-row justify-center mt-[136px]'>
      <div className='flex flex-col max-w-[1250px] w-full'>
        <div className='flex flex-row justify-center items-center max-w-[434px] w-full bg-[#DFDBE4] px-13 py-8 rounded-t-[15px]'>
          <h1 className='font-poppins-700 text-3xl text-black-lighter'>
            <FormattedMessage id='page.collections.button.create' />
          </h1>
        </div>
        <div className='w-full bg-purple-lightest px-[52px] pt-[38px] pb-[70px] rounded-[0px_15px_15px_15px]'>
          <span className='font-poppins-400 text-sm text-black-lighter leading-[98.3%]'>
            <span className='text-[#DB5C5C]'>*</span>&nbsp;<FormattedMessage id='page.nft.creation.required_fields' />
          </span>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-9'>
            <div className='flex flex-col'>
              {/* logo image */}
              <section>
                <MainLabel label={intl.formatMessage({ 'id': 'page.collection.creation.logo_image.label' })} required={true} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.collection.creation.logo_image.desc' })} className='max-w-[384px] w-full mt-3' />
                <div className={styles.logoImage} {...getLogoImageRootProps()} onClick={logoImageOpen}>
                  <input {...getLogoImageInputProps()} disabled={loading} />
                  {collectionData.logoImage && <div className='absolute w-full h-full box-border'>
                    <picture><img src={URL.createObjectURL(collectionData.logoImage)} alt='collection logo image' className='min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] rounded-full object-cover' /></picture>
                  </div>}
                  <div className='absolute hidden group-hover/logo-image:block p-1 w-full h-full '>
                    <div className='w-full h-full rounded-full bg-black/40'>
                    </div>
                  </div>
                  <Image
                    src={ImagePlaceholderIcon}
                    alt='logo image placeholder'
                    className='min-w-[30px] max-w-[53px] w-full h-auto group-hover/logo-image:z-[1] group-hover/image:opacity-90'
                  />
                </div>
                {collectionErrorMsg.logoImage && (<span className='font-poppins-400 text-[9px] text-red-600 mt-1 leading-4'>
                  {collectionErrorMsg.logoImage}
                </span>)}
              </section>
              {/* featured image */}
              <section className='mt-[62px]'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.collection.creation.featured_image.label' })} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.collection.creation.featured_image.desc' })} className='max-w-[384px] w-full mt-3' />
                <div className={styles.featuredImage} {...getFeaturedImageRootProps()} onClick={featuredImageOpen}>
                  <input {...getFeaturedImageInputProps()} disabled={loading} />
                  {collectionData.featuredImage && <div className='absolute w-full h-full box-border'>
                    <picture><img src={URL.createObjectURL(collectionData.featuredImage)} alt='collection featured image' className='min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] rounded-[14px] object-cover' /></picture>
                    <div className='absolute top-3 right-3 z-20' onClick={(e) => {
                      e.stopPropagation()
                      setCollectionData({ ...collectionData, featuredImage: null, })
                      return
                    }}>
                      <CloseSvgIcon color='white' width={16} height={16} />
                    </div>
                  </div>}
                  <div className='absolute hidden group-hover/featured-image:block p-1 w-full h-full '>
                    <div className='w-full h-full rounded-[14px] bg-black/40'>
                    </div>
                  </div>
                  <Image
                    src={ImagePlaceholderIcon}
                    alt='featured image placeholder'
                    className='min-w-[50px] max-w-[72px] w-full h-auto group-hover/featured-image:z-[1] group-hover/image:opacity-90'
                  />
                </div>
              </section>
              {/* banner image */}
              <section className='mt-[68px]'>
                <MainLabel label={intl.formatMessage({ 'id': 'page.collection.creation.banner_image.label' })} />
                <MainDescription description={intl.formatMessage({ 'id': 'page.collection.creation.banner_image.desc' })} className='max-w-[384px] w-full mt-3' />
                <div className={styles.bannerImage} {...getBannerImageRootProps()} onClick={bannerImageOpen}>
                  <input {...getBannerImageInputProps()} disabled={loading} />
                  {collectionData.bannerImage && <div className='absolute w-full h-full box-border'>
                    <picture><img src={URL.createObjectURL(collectionData.bannerImage)} alt='collection banner image' className='min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] rounded-[14px] object-cover' /></picture>
                    <div className='absolute top-3 right-3 z-20' onClick={(e) => {
                      e.stopPropagation()
                      setCollectionData({ ...collectionData, bannerImage: null, })
                      return
                    }}>
                      <CloseSvgIcon color='white' width={16} height={16} />
                    </div>
                  </div>}
                  <div className='absolute hidden group-hover/banner-image:block p-1 w-full h-full '>
                    <div className='w-full h-full rounded-[14px] bg-black/40'>
                    </div>
                  </div>
                  <Image
                    src={ImagePlaceholderIcon}
                    alt='banner image placeholder'
                    className='min-w-[50px] max-w-[72px] w-full h-auto group-hover/banner-image:z-[1] group-hover/image:opacity-90'
                  />
                </div>
              </section>
              {/* links */}
              <section className='mt-[73px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.collection.creation.links.label'})} />
                <div className='flex flex-col mt-6'>
                  <div className='flex flex-row items-center max-w-[433px] w-full h-11 bg-[#F5F5F5] rounded-md pl-4'>
                    <GlobeSvgIcon color='#BCBCBC' />
                    <input
                      type={'text'}
                      className={styles.linksInput}
                      placeholder={intl.formatMessage({'id': 'page.collection.creation.links.placeholder.1'})}
                      value={collectionData.ownWebsite}
                      onChange={(e) => setCollectionData({ ...collectionData, ownWebsite: e.target.value, })}
                    />
                  </div>
                </div>
                <div className='flex flex-col mt-[11px]'>
                  <div className='flex flex-row items-center max-w-[433px] w-full h-11 bg-[#F5F5F5] rounded-md pl-4'>
                    <MediumSvgIcon color='#BCBCBC' />
                    <input
                      type={'text'}
                      className={styles.linksInput}
                      placeholder={intl.formatMessage({'id': 'page.collection.creation.links.placeholder.2'})}
                      value={collectionData.mediumAddress}
                      onChange={(e) => setCollectionData({ ...collectionData, mediumAddress: e.target.value, })}
                    />
                  </div>
                </div>
                <div className='flex flex-col mt-[11px]'>
                  <div className='flex flex-row items-center max-w-[433px] w-full h-11 bg-[#F5F5F5] rounded-md pl-4'>
                    <TelegramSvgIcon color='#BCBCBC' />
                    <input
                      type={'text'}
                      className={styles.linksInput}
                      placeholder={intl.formatMessage({'id': 'page.collection.creation.links.placeholder.3'})}
                      value={collectionData.telegramAddress}
                      onChange={(e) => setCollectionData({ ...collectionData, telegramAddress: e.target.value, })}
                    />
                  </div>
                </div>
              </section>
              {/* creator fee */}
              <section className='mt-[58px]'>
                <div className='flex flex-row items-center'>
                  <MainLabel label={intl.formatMessage({'id': 'page.collection.creation.creator_fee.label'})} />
                  <button className='flex flex-row justify-center items-center max-w-[110px] w-full h-[26px] rounded-md bg-[#D6CCE4] hover:bg-[#CFC0E4] ml-[14px]'>
                    <h1 className='font-poppins-600 text-xs text-purple-lighter leading-[18px]'>
                      <FormattedMessage id='page.collection.creation.button.learn_more' />
                    </h1>
                  </button>
                </div>
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.creator_fee.desc'})} className='mt-[13px] max-w-[433px] w-full' />
                {collectionData.creatorFees.length > 0 && <div className='mt-[22px]'>
                  {collectionData.creatorFees.map((fee: ICreatorFee, index: number) => (
                    <CreatorFee key={index} fee={fee} onChange={changeCreatorFee} remove={removeCreatorFee} index={index} />
                  ))}
                </div>}
                <button onClick={() => addCreatorFee()} className='flex flex-row justify-center items-center max-w-[182px] w-full h-11 rounded-md bg-[#D6CCE4] hover:bg-[#CFC0E4] mt-5'>
                  <h1 className='font-poppins-600 text-sm text-purple-lighter leading-[21px]'>
                    <FormattedMessage id='page.collection.creation.button.add_address' />
                  </h1>
                </button>
              </section>
              {/* explicit & sensitive content */}
              <section className='mt-[66px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.collection.creation.explicit.label'})} />
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.explicit.desc'})} className='mt-[13px] max-w-[433px] w-full' />
                <Switch
                  checked={collectionData.explicit}
                  onChange={() => setCollectionData({ ...collectionData, explicit: !collectionData.explicit, })}
                  className={`${collectionData.explicit ? 'bg-[#C9B2E6]' : 'bg-[#D8CCE7]'} ${styles.switch}`}
                >
                  <span className="sr-only">Explicit & sensitive content setting</span>
                  <span
                    aria-hidden="true"
                    className={`${collectionData.explicit ? 'translate-x-[26.5px]' : 'translate-x-[1.5px]'} ${styles.explicitSwitchHandle}`}
                  />
                </Switch>
              </section>
              {/* show rarity ranking */}
              <section className='mt-[66px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.collection.creation.rarity_ranking.label'})} />
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.rarity_ranking.desc'})} className='mt-[13px] max-w-[349px] w-full' />
                <Switch
                  checked={collectionData.rarity}
                  onChange={() => setCollectionData({ ...collectionData, rarity: !collectionData.rarity, })}
                  className={`${ rarityDisabled? 'bg-[#D8CCE7]/30' : collectionData.rarity ? 'bg-[#C9B2E6]' : 'bg-[#D8CCE7]'} ${styles.switch}`}
                  disabled={rarityDisabled}
                >
                  <span className="sr-only">Show rarity ranking setting</span>
                  <span
                    aria-hidden="true"
                    className={`${collectionData.rarity ? 'translate-x-[26.5px]' : 'translate-x-[1.5px]'} ${rarityDisabled? 'bg-purple-lighter/30 cursor-none' : 'bg-purple-lighter'} ${styles.raritySwitchHandle}`}
                  />
                </Switch>
              </section>
            </div>
            <div className='flex flex-col'>
              {/* name */}
              <section>
                <MainLabel label={intl.formatMessage({'id': 'page.nft.creation.name.label'})} required={true} />
                <MainInput
                  type='text'
                  value={collectionData.name}
                  onChange={(e) => setCollectionData({ ...collectionData, name: e.target.value })}
                  placeholder={intl.formatMessage({ 'id': 'page.collection.creation.name.placeholder' })}
                  className='max-w-[579px] w-full mt-[17px]'
                  inputClassName={styles.input}
                  errorMsg={collectionErrorMsg.name}
                />
              </section>
              {/* url */}
              <section className='mt-[49px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.collection.creation.url.label'})} />
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.url.desc'})} className='mt-[13px] max-w-[524px] w-full' />
                <div className='flex flex-row mt-[17px]'>
                  <div className='flex flex-row justify-center items-center max-w-[267px] w-full h-11 bg-[#E0D7EA] rounded-md mr-3'>
                    <h2 className='font-poppins-400 text-sm text-purple-lighter leading-[21px]'>https://wadza.com/collection/</h2>
                  </div>
                  <MainInput
                    type='text'
                    value={collectionData.url}
                    onChange={(e) => setCollectionData({ ...collectionData, url: e.target.value })}
                    placeholder='celectiries-of-mena'
                    className='max-w-[579px] w-full'
                    inputClassName={styles.input}
                  />
                </div>
              </section>
              {/* description(English) */}
              <section className='mt-[77px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.nft.creation.description_english.label'})} />
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.description.desc'})} className='mt-[13px] max-w-[524px] w-full' />
                <textarea
                  onChange={(e) => setCollectionData({ ...collectionData, description: e.target.value })}
                  className={styles.textarea}
                  placeholder={intl.formatMessage({ 'id': 'page.collection.creation.description_english.placeholder' })}
                  value={collectionData.description}
                />
              </section>
              {/* description(Arabic) */}
              <section className='mt-[77px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.nft.creation.description_arabic.label'})} />
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.description.desc'})} className='mt-[13px] max-w-[524px] w-full' />
                <textarea
                  onChange={(e) => setCollectionData({ ...collectionData, descriptionArabic: e.target.value })}
                  className={styles.textarea}
                  placeholder={intl.formatMessage({ 'id': 'page.collection.creation.description_arabic.placeholder' })}
                  value={collectionData.descriptionArabic}
                />
              </section>
              {/* category */}
              <section className='mt-[65px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.home.browse.by.category.section.title.2'})} />
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.category.desc'})} className='mt-[13px] max-w-[524px] w-full' />
                {collectionData.category.length > 0 && <div className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                  {collectionData.category.map((category: IMockCategory, index: number) => (
                    <div key={index} className='flex flex-row justify-between items-center h-11 border border-solid border-[#B79ECD] rounded-md pl-3 pr-2'>
                      <h2 className='font-poppins-400 text-xs text-purple-lighter leading-[21px]'>
                        {category.label}
                      </h2>
                      <span onClick={() => removeCategory(category, index)} className='cursor-pointer'>
                        <CloseSvgIcon color='#BCBCBC' width={10} height={10} />
                      </span>
                    </div>
                  ))}
                </div>}
                <Menu as={'div'} className='relative inline-block max-w-[182px] w-full'>
                  <Menu.Button className='flex flex-row justify-center items-center w-full h-11 rounded-md bg-[#D6CCE4] hover:bg-[#CFC0E4] mt-5'>
                    <h1 className='font-poppins-600 text-sm text-purple-lighter leading-[21px]'>
                      <FormattedMessage id='page.collection.creation.button.add_category' />
                    </h1>
                  </Menu.Button>
                  <Transition
                    as={React.Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute z-10 left-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className="p-3">
                        {categories.length > 0 && categories.map((category: IMockCategory, index: number) => (
                          <Menu.Item key={index}>
                            <button
                              onClick={() =>addCategory(category, index)}
                              className='flex w-full items-center font-poppins-400 text-xs text-black-lighter leading-[98.3%] rounded-md px-2 py-2 hover:bg-purple hover:text-white'
                            >
                              {category.label}
                            </button>
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </section>
              {/* payment tokens */}
              <section className='mt-[72px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.collection.creation.tokens.label'})} />
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.tokens.desc'})} className='mt-[13px] max-w-[495px] w-full' />
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-[15px] mt-[18px]'>
                  {collectionData.paymentTokens.length > 0 && collectionData.paymentTokens.map((token, index: number) => (
                    <div key={index} className='flex flex-row justify-between items-center h-[66px] border border-solid border-[#B79ECD] rounded-md pl-6 pr-3'>
                      <div key={index} className='flex flex-row items-center'>
                        <Image
                          src={token.icon}
                          alt='token icon'
                          className='h-[27px] mr-6'
                        />
                        <div className='flex flex-col text-sm text-purple-lighter leading-[21px]'>
                          <h2 className='font-poppins-600'>
                            {token.symbol}
                          </h2>
                          <h3 className='font-poppins-400'>
                            {token.chain}
                          </h3>
                        </div>
                      </div>
                      {token.removable && <span onClick={() => removePaymentToken(token, index)} className='cursor-pointer'>
                        <CloseSvgIcon color='#BCBCBC' width={13} height={13} />
                      </span>}
                    </div>
                  ))}
                </div>
                <Autocomplete
                  options={options}
                  setOptions={setOptions}
                  data={collectionData}
                  placeholder={intl.formatMessage({'id': 'page.collection.creation.tokens.placeholder'})}
                  onChange={setCollectionData}
                  className='mt-[30px]'
                />
              </section>
              {/* display theme */}
              <section className='mt-[76px]'>
                <MainLabel label={intl.formatMessage({'id': 'page.collection.creation.theme.label'})} />
                <MainDescription description={intl.formatMessage({'id': 'page.collection.creation.theme.desc'})} className='mt-[13px] max-w-[495px] w-full' />
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-[15px] mt-[30px]'>
                  {COLLECTION_THEMES.length > 0 && COLLECTION_THEMES.map((theme: ICollectionTheme, index: number) => (
                    <ThemeOption key={index} theme={theme} checked={collectionData.displayTheme === theme.slug} collectionData={collectionData} setCollectionData={setCollectionData} />
                  ))}
                </div>
              </section>
            </div>
          </div>
          {/* create button */}
          <button className={styles.button} onClick={() => onClickCreate()} disabled={loading}>
            <FormattedMessage id='page.home.navbar.menu.create' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollectionCreate
