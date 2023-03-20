import React, { useCallback } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { ICommonProps } from '../../../../types/types'
import { MainDescription, MainInput, MainLabel } from '../../../form'
import { CloseSvgIcon, CopySvgIcon, GlobeSvgIcon, InstagramSvgIcon, TiktokSvgIcon, TwitterSvgIcon } from '../../../icons'
import ImagePlaceholderIcon from '../../../../assets/svg/image_placeholder.svg'

interface IProps extends ICommonProps {
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  save: () => void
  connectTwitter: () => void
  removeTwitter: () => void
}

const styles = {
  input: 'bg-[#F5F5F5] font-poppins-400 text-sm py-[13px] px-[19px] leading-[21px] rounded-md placeholder:text-[#BCBCBC]',
  linksInput: 'w-full bg-[#F5F5F5] font-poppins-400 text-sm text-black leading-[21px] placeholder:text-[#BCBCBC] ml-[14px] py-[11px] focus:outline-none',
  textarea: 'max-w-[433px] w-full min-h-[135px] bg-[#F5F5F5] mt-[17px] rounded-md font-poppins-400 text-sm text-black-lighter leading-[21px] placeholder:text-[#BCBCBC] px-[19px] py-[13px] outline-none',
  profileImage: 'relative group/profile-image flex flex-row justify-center items-center max-w-[149px] w-full h-[149px] mt-[29px] rounded-full border border-dashed border-[#8B6EAE] hover:bg-purple-lighter/10 cursor-pointer',
  bannerImage: 'relative group/banner-image flex flex-row justify-center items-center max-w-[287px] w-full h-[156px] mt-[30px] rounded-[14px] border border-dashed border-[#8B6EAE] hover:bg-purple-lighter/10 cursor-pointer',
  button: 'flex flex-row justify-center items-center max-w-[243px] w-full h-[58px] bg-purple font-poppins-600 text-base text-white leading-[98.3%] rounded-md my-[52px] hover:bg-purple-light ease-in duration-100',
}

const ProfileTab = (props: IProps) => {
  const intl = useIntl()
  const { user, setUser, save, connectTwitter, removeTwitter, className } = props

  // profile image
  const onProfileImageDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setUser({ ...user, profileImage: acceptedFiles[0] })
    }
  }, [user, setUser])
  const { getRootProps: getProfileImageRootProps, open: profileImageOpen, getInputProps: getProfileImageInputProps } = useDropzone({
    onDrop: onProfileImageDrop,
    noClick: true,
    noKeyboard: true,
  })

  // banner image
  const onBannerImageDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setUser({ ...user, bannerImage: acceptedFiles[0] })
    }
  }, [user, setUser])
  const { getRootProps: getBannerImageRootProps, open: bannerImageOpen, getInputProps: getBannerImageInputProps } = useDropzone({
    onDrop: onBannerImageDrop,
    noClick: true,
    noKeyboard: true,
  })

  return (
    <section className='w-full pt-[42px] px-[79px]'>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-[70px]'>
        {/* column 1 */}
        <div className='flex flex-col'>
          {/* username */}
          <div>
            <MainLabel label={intl.formatMessage({ 'id': 'page.settings.profile.username' })} />
            <MainInput
              type='text'
              value={user?.username || ''}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder={intl.formatMessage({ 'id': 'page.settings.profile.username.placeholder' })}
              className='max-w-[433px] w-full mt-[17px]'
              inputClassName={styles.input}
            />
          </div>
          {/* bio */}
          <div className='mt-[47px]'>
            <MainLabel label={intl.formatMessage({ 'id': 'page.settings.profile.bio' })} />
            <textarea
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className={styles.textarea}
              placeholder={intl.formatMessage({ 'id': 'page.settings.profile.bio.placeholder' })}
              value={user?.bio || ''}
            />
          </div>
          {/* email address */}
          <div className='mt-[47px]'>
            <MainLabel label={intl.formatMessage({ 'id': 'page.settings.profile.email_address' })} />
            <MainInput
              type='text'
              value={user?.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder={intl.formatMessage({ 'id': 'page.settings.profile.email_address.placeholder' })}
              className='max-w-[433px] w-full mt-[17px]'
              inputClassName={styles.input}
            />
          </div>
          {/* social connections */}
          <div className='mt-[47px]'>
            <MainLabel label={intl.formatMessage({ 'id': 'page.settings.profile.social_connections' })} />
            <MainDescription description={intl.formatMessage({ 'id': 'page.settings.profile.social_connections.desc' })} className='mt-[13px]' />
            <section className='mt-[17px]'>
              {/* twitter */}
              <div className='flex flex-row justify-between max-w-[433px] w-full h-11 bg-[#D6CCE4] rounded-md pl-4'>
                <div className='flex flex-row items-center'>
                  <TwitterSvgIcon color='#8B6EAE' width={19} height={16} />
                  <h3 className='font-poppins-400 text-sm text-purple-lighter leading-[21px] ml-[13px]'>
                    <FormattedMessage id='page.settings.profile.social_connections.twitter' />
                  </h3>
                </div>
                {user?.twitterData?.username? (
                  <button onClick={() => removeTwitter()} className='flex flex-row justify-center items-center max-w-[159px] w-full h-11 bg-purple-lighter hover:shadow-md hover:bg-purple-light rounded-md'>
                    <CloseSvgIcon color='white' width={12} height={12} />
                    <h3 className='font-poppins-600 text-sm text-white leading-[21px] ml-2'>
                      {user.twitterData.username}
                    </h3>
                  </button>
                ) : (
                  <button onClick={() => connectTwitter()} className='flex flex-row justify-center items-center max-w-[159px] w-full h-11 bg-purple hover:shadow-md hover:bg-purple-light rounded-md'>
                    <h3 className='font-poppins-600 text-sm text-white leading-[21px]'>
                      <FormattedMessage id='page.settings.profile.social_connections.button.connect' />
                    </h3>
                  </button>
                )}
              </div>
              {/* instagram */}
              <div className='flex flex-row justify-between max-w-[433px] w-full h-11 bg-[#D6CCE4] rounded-md pl-4 mt-[13px]'>
                <div className='flex flex-row items-center'>
                  <InstagramSvgIcon color='#8B6EAE' width={19} height={19} />
                  <h3 className='font-poppins-400 text-sm text-purple-lighter leading-[21px] ml-[13px]'>
                    <FormattedMessage id='page.settings.profile.social_connections.instagram' />
                  </h3>
                </div>
                <button className='flex flex-row justify-center items-center max-w-[159px] w-full h-11 bg-purple hover:shadow-md hover:bg-purple-light rounded-md'>
                  <h3 className='font-poppins-600 text-sm text-white leading-[21px]'>
                    <FormattedMessage id='page.settings.profile.social_connections.button.connect' />
                  </h3>
                </button>
              </div>
              {/* tiktok */}
              <div className='flex flex-row justify-between max-w-[433px] w-full h-11 bg-[#D6CCE4] rounded-md pl-4 mt-[13px]'>
                <div className='flex flex-row items-center'>
                  <TiktokSvgIcon color='#8B6EAE' width={16} height={18} />
                  <h3 className='font-poppins-400 text-sm text-purple-lighter leading-[21px] ml-[13px]'>
                    <FormattedMessage id='page.settings.profile.social_connections.tiktok' />
                  </h3>
                </div>
                <button className='flex flex-row justify-center items-center max-w-[159px] w-full h-11 bg-purple hover:shadow-md hover:bg-purple-light rounded-md'>
                  <h3 className='font-poppins-600 text-sm text-white leading-[21px]'>
                    <FormattedMessage id='page.settings.profile.social_connections.button.connect' />
                  </h3>
                </button>
              </div>
            </section>
          </div>
          {/* links */}
          <div className='mt-[57px]'>
            <MainLabel label={intl.formatMessage({ 'id': 'page.collection.creation.links.label' })} />
            <div className='flex flex-col mt-6'>
              <div className='flex flex-row items-center max-w-[433px] w-full h-11 bg-[#F5F5F5] rounded-md pl-4'>
                <GlobeSvgIcon color='#BCBCBC' />
                <input
                  type={'text'}
                  className={styles.linksInput}
                  placeholder={`Yoursite.io`}
                  value={user?.links || ''}
                  onChange={(e) => setUser({ ...user, links: e.target.value, })}
                />
              </div>
            </div>
          </div>
          {/* wallet address */}
          <div className='mt-[42px]'>
            <MainLabel label={intl.formatMessage({ 'id': 'page.settings.profile.wallet_address' })} />
            <div className='flex flex-row items-center max-w-[433px] w-full h-11 bg-[#F5F5F5] rounded-md mt-[17px]'>
              <input
                type={'text'}
                className='w-full bg-[#F5F5F5] font-poppins-400 text-sm text-black leading-[21px] py-[11px] pl-[17px] focus:outline-none'
                placeholder={`Yoursite.io`}
                value={user?.walletAddress || ''}
                readOnly
              />
              <CopyToClipboard text={user?.walletAddress} onCopy={() => toast.success('Copied!')}>
                <button className='flex flex-row justify-center items-center max-w-[50px] w-full h-full'>
                  <CopySvgIcon color='#8B6EAE' />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        {/* column 2 */}
        <div className='flex flex-col'>
          {/* profile image */}
          <section>
            <MainLabel label={intl.formatMessage({ 'id': 'page.settings.profile.profile_image' })} />
            <MainDescription description={intl.formatMessage({ 'id': 'page.settings.profile.profile_image.desc' })} className='max-w-[285px] w-full mt-3' />
            <div className={styles.profileImage} {...getProfileImageRootProps()} onClick={profileImageOpen}>
              <input {...getProfileImageInputProps()} />
              {user?.profileImage && <div className='absolute w-full h-full box-border'>
                <picture><img src={typeof user.profileImage === 'string'? user.profileImage : URL.createObjectURL(user.profileImage)} alt='user profile image' className='min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] rounded-full object-cover' /></picture>
                <div className='absolute top-6 right-6 z-20' onClick={(e) => {
                  e.stopPropagation()
                  setUser({ ...user, profileImage: null, })
                  return
                }}>
                  <CloseSvgIcon color='white' width={16} height={16} />
                </div>
              </div>}
              <div className='absolute hidden group-hover/profile-image:block p-1 w-full h-full '>
                <div className='w-full h-full rounded-full bg-black/40'>
                </div>
              </div>
              <Image
                src={ImagePlaceholderIcon}
                alt='profile image placeholder'
                className='min-w-[30px] max-w-[53px] w-full h-auto group-hover/profile-image:z-[1] group-hover/image:opacity-90'
              />
            </div>
          </section>
          {/* banner image */}
          <section className='mt-[67px]'>
            <MainLabel label={intl.formatMessage({ 'id': 'page.settings.profile.banner_image' })} />
            <MainDescription description={intl.formatMessage({ 'id': 'page.settings.profile.banner_image.desc' })} className='max-w-[285px] w-full mt-3' />
            <div className={styles.bannerImage} {...getBannerImageRootProps()} onClick={bannerImageOpen}>
              <input {...getBannerImageInputProps()} />
              {user?.bannerImage && <div className='absolute w-full h-full box-border'>
                <picture><img src={typeof user.bannerImage === 'string'? user.bannerImage : URL.createObjectURL(user.bannerImage)} alt='user cover image' className='min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] rounded-[14px] object-cover' /></picture>
                <div className='absolute top-3 right-3 z-20' onClick={(e) => {
                  e.stopPropagation()
                  setUser({ ...user, bannerImage: null, })
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
        </div>
      </div>
      <button className={styles.button} onClick={save}>
        <FormattedMessage id='page.nft.creation.add_property_modal.save' />
      </button>
    </section>
  )
}

export default ProfileTab
