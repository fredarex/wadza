import React, { useEffect, useRef } from 'react'
import { CloseSvgIcon } from '../../icons'
import constants from '../../../utils/constants'
import { useAssets } from '../../../contexts/Assets.context'
import { IFilterOption } from '../../../types/types'
import SortByRadio from '../_filterSidebar/SortByRadio';


const SortByModal = (props: any) => {
  const { isOpen, close } = props;
  const { SORT_BY } = constants()

  const modalRef = useRef<HTMLDivElement>(null)
  const {
    quantityFilterOption,
    handleQuantityFilter  } = useAssets()
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
  }, [close]);

  


  return (
    <>
      {isOpen ? (
        <>
          <div
            className='w-full h-full flex fixed justify-center items-center inset-0 z-50'
          >
            <div
              ref={modalRef}
              className='w-full h-full'
            >
              {/*content*/}
              <div className='mt-[60px] flex flex-col w-full bg-white rounded-[15px]'>
                {/*header*/}
                <div className='flex items-start justify-between pt-[23px] pb-5 px-[26px] bg-[#F2F2F2] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                  <span className="text-[16px] text-[#3C1361] font-semibold underline">Clear all</span>
                  <span className='font-poppins-600 text-lg text-purple leading-6'>
                    Sort By
                  </span>
                  <button
                    onClick={close}
                  >
                    <CloseSvgIcon color='#3C1361' />
                  </button>
                </div>
                {/*body*/}
                <div className='min-h-[100vh]  py-7 px-[39px] bg-[#ECECEC]'>
                  
                  {/* quantity filter */}
                  {SORT_BY.length > 0 && SORT_BY.map((option: IFilterOption, index: number) => (
                    <SortByRadio
                      key={index}
                      label={option.label}
                      checked={quantityFilterOption === option.value}
                      id={`quantity-radio-${index + 1}`}
                      name='qunatity-radio'
                      onMobile={true}
                      onClick={() => handleQuantityFilter(option.value)}
                    />
                  ))}
                  <div className="w-full h-[60px] bg-[#512D72] mt-[78px] text-white rounded-[15px] flex justify-center items-center">Confirm</div>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  )
}

export default SortByModal
