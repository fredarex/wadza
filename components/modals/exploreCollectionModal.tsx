import Link from 'next/link';
import { useRouter } from 'next/router';
import React,{useEffect, useRef} from 'react'
import { CategoryData } from '../../mock/CategoryData';
import { IMockCategory } from '../../types/types';
import { CloseSvgIcon } from '../icons';

function ExploreCollectionModal(props:any) {
    const { isOpen, close } = props;
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

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
    }, []);
  return (
    <>
      {isOpen ? (
        <>
          <div
            className='z-[99999] md:hidden w-full h-[400px] flex fixed justify-center items-center inset-0'
          >
            <div
              ref={modalRef}
              className='w-full h-full'
            >
              {/*content*/}
              <div className='mt-[270px] bottom-0 flex flex-col w-full pb-[120px] bg-[rgba(255,255,255,0.96)] rounded-[15px] max-h-[100vh] overflow-y-auto'>
                {/*header*/}
                <div className='flex sticky bottom-[2px] items-start justify-between pt-[23px] pb-5 px-[26px] bg-[rgba(255,255,255,0.96)] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                    <span>{' '}</span>
                  <span className='font-poppins-600 text-lg text-purple leading-6'>
                    Explore
                  </span>
                  <button
                    onClick={close}
                  >
                    <CloseSvgIcon color='#3C1361' />
                  </button>
                </div>
                {/*body*/}
                <div className='min-h-[300px] overflow-y-auto  py-7 px-[39px] bg-[rgba(255,255,255,0.96)]'>
                <ul
                className='w-full p-2 divide-y max-h-[285px] overflow-y-auto divide-gray-100 rounded-md'
                >
                    <li onClick={() => {
                    router.push({ pathname: '/assets', })
                    }}>
                    <Link
                        className='text-black hover:bg-purple hover:text-white py-2 px-4 block ease-in duration-200'
                        href={`/assets`}
                    >{`All NFTs`}</Link>
                    </li>
                    {CategoryData.length > 0 && CategoryData.map((category: IMockCategory, index: number) => (
                    <li key={index}>
                        <a
                        className='text-black hover:bg-purple hover:text-white py-2 px-4 block ease-in duration-200'
                        href='#'
                        >{category.label}</a>
                    </li>
                    ))}
                </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-70 md:hidden fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  )
}

export default ExploreCollectionModal