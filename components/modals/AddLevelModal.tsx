import React, { useEffect, useRef } from 'react'
import { IModal, INftStatsData } from '../../types/types'
import { CloseSvgIcon } from '../icons'
import { FormattedMessage, useIntl } from 'react-intl'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  description: string
  data: INftStatsData[]
  close: () => void
  addMore: () => void
  save: () => void
  onChange: (value: any, index: number, div: string, sub: string) => void
  remove: (index: number) => void
}

const styles = {
  input: 'w-full bg-[#F5F5F5] caret-slate-800 font-poppins-400 text-sm text-black-lighter placeholder:text-[#BCBCBC] px-[22px] py-[3px] rounded-md leading-[21px] focus:outline-none',
  addMoreBtn: 'flex justify-center items-center max-w-[134px] w-full h-[44px] bg-[rgba(139,110,174,0.13)] hover:bg-purple-lightest font-poppins-600 text-sm text-[#7F4CB5] leading-[21px] rounded-md mt-[31px]',
  saveBtn: 'flex justify-center items-center w-full h-[58px] bg-purple hover:bg-purple-light rounded-md font-poppins-600 text-[19px] text-white leading-[98.3%]',
}

const AddLevelModal = (props: IProps) => {
  const { isOpen, title, description, data, close, addMore, save, onChange, remove } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const intl = useIntl()

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

  useEffect(() => {
    if (isOpen)
      document.body.style.overflow = 'hidden'
    else 
      document.body.style.overflow = 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
    {isOpen ? (
      <>
        <div
          className='flex fixed justify-center items-center inset-0 z-50'
        >
          <div
            ref={modalRef}
            className='max-w-[578px] w-full'
          >
            {/*content*/}
            <div className='flex flex-col w-full bg-white rounded-[15px]'>
              {/*header*/}
              <section className='flex items-start justify-between pt-[23px] pb-5 px-[26px] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                <span className='w-[23px]'>&nbsp;</span>
                <header className='font-poppins-600 text-lg text-purple leading-6'>
                  {title}
                </header>
                <button
                  onClick={close}
                >
                  <CloseSvgIcon color='#3C1361' />
                </button>
              </section>
              {/*body*/}
              <section className='py-8 px-[39px] max-h-[calc(100vh-189px)] overflow-y-auto font-poppins-400 text-base text-purple leading-[24px]'>
                {description}
                <header className='grid grid-cols-2 gap-[27px] mt-[22px]'>
                  <span>
                    <FormattedMessage id='page.nft.creation.add_property_modal.type' />
                  </span>
                  <span>
                    <FormattedMessage id='page.nft.creation.add_level_modal.value' />
                  </span>
                </header>
                <div className='mt-[5px]'>
                  {data?.length> 0 && data.map((property: INftStatsData, index: number) => (
                    <div key={index} className='flex flex-row mb-2'>
                      <div className={`flex max-w-[237px] w-full bg-[#F5F5F5] rounded-md py-[10px] mr-[27px]`}>
                        <button onClick={() => remove(index)} className={`flex max-w-[49px] w-full justify-center items-center border-r-2 border-solid border-[#E0E0E0]`}>
                          <CloseSvgIcon color='#BCBCBC' width={14} height={15} />
                        </button>
                        <input
                          type='text'
                          className={styles.input}
                          placeholder={intl.formatMessage({'id': 'page.nft.creation.add_property_modal.placeholder.character'})}
                          value={property.trait_type}
                          onChange={(e) => onChange(e.target.value, index, 'trait_type', '')}
                        />
                      </div>
                      <div className={`flex max-w-[237px] w-full bg-[#F5F5F5] rounded-md py-[7px]`}>
                        <input
                          type='number'
                          className='w-full bg-[#F5F5F5] caret-slate-800 font-poppins-400 text-sm text-black-lighter placeholder:text-[#BCBCBC] px-[22px] py-[3px] rounded-md leading-[21px] focus:outline-none'
                          value={property.value?.amount}
                          onChange={(e) => onChange(Number(e.target.value), index, 'value', 'amount')}
                          min={0}
                          max={property.value?.total}
                        />
                        <span className='flex justify-center items-center min-w-[39px] h-[33px] bg-[#E9E6E6] rounded-md font-poppins-400 text-sm leading-[21px] text-[#9B9B9B]'>
                          <FormattedMessage id='page.assets.filter.sidebar.price.to' />
                        </span>
                        <input
                          type='number'
                          className='w-full bg-[#F5F5F5] caret-slate-800 font-poppins-400 text-sm text-black-lighter placeholder:text-[#BCBCBC] px-[22px] py-[3px] rounded-md leading-[21px] focus:outline-none'
                          value={property.value?.total}
                          onChange={(e) => onChange(Number(e.target.value), index, 'value', 'total')}
                          min={0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button className={styles.addMoreBtn} onClick={addMore}>
                  +&nbsp;<FormattedMessage id='page.nft.creation.add_property_modal.add_more' />
                </button>
              </section>
              {/* footer */}
              <section className='pt-6 pb-[38px] px-[39px]'>
                <button onClick={save} className={styles.saveBtn}>
                  <FormattedMessage id='page.nft.creation.add_property_modal.save' />
                </button>
              </section>
            </div>
          </div>
        </div>
        <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
      </>
    ) : null}
    </>
  )
}

export default AddLevelModal
