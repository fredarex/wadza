import React, { useEffect, useRef } from 'react'
import { IModal, INftAttributeData } from '../../types/types'
import { CloseSvgIcon } from '../icons'
import { FormattedMessage, useIntl } from 'react-intl'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  description: string
  properties: INftAttributeData[]
  close: () => void
  addMore: () => void
  save: () => void
  onChange: (value: string, index: number, div: string) => void
  remove: (index: number) => void
}

const styles = {
  input: 'w-full bg-[#F5F5F5] caret-slate-800 font-poppins-400 text-sm text-black-lighter placeholder:text-[#BCBCBC] px-[22px] py-[3px] rounded-md leading-[21px] focus:outline-none',
  addMoreBtn: 'flex justify-center items-center max-w-[134px] w-full h-[44px] bg-[rgba(139,110,174,0.13)] hover:bg-purple-lightest font-poppins-600 text-sm text-[#7F4CB5] leading-[21px] rounded-md mt-[31px]',
}

const AddPropertyModal = (props: IProps) => {
  const { isOpen, title, description, properties, close, addMore, save, onChange, remove } = props
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
                      <FormattedMessage id='page.nft.creation.name.label' />
                    </span>
                  </header>
                  <div className='mt-[5px]'>
                    {properties.length> 0 && properties.map((property: INftAttributeData, index: number) => (
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
                            onChange={(e) => onChange(e.target.value, index, 'trait_type')}
                          />
                        </div>
                        <div className={`flex max-w-[237px] w-full bg-[#F5F5F5] rounded-md py-[10px]`}>
                          <input
                            type='text'
                            className={styles.input}
                            value={property.value}
                            onChange={(e) => onChange(e.target.value, index, 'value')}
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
                  <button onClick={save} className='flex justify-center items-center w-full h-[58px] bg-purple hover:bg-purple-light rounded-md font-poppins-600 text-[19px] text-white leading-[98.3%]'>
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

export default AddPropertyModal
