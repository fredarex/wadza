import React from 'react';
import {BsFillGrid3X3GapFill} from 'react-icons/bs';
import {TbArrowsUpDown} from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setOpenFilterModal, setOpenSortByModal } from '../../redux/features/arrangementSlice';
function SmallFilterNavbar() {
    const dispatch = useDispatch();

    const handleFilterModal = () => {
      dispatch(setOpenFilterModal(true));
    }

    const handleSortByModal = () => {
      dispatch(setOpenSortByModal(true));
    }

  return (
    <div className="w-full h-full mobile-filter  justify-between  pt-[21px] pb-[15px] px-[16px]">
        <div className="flex w-[50%] cursor-pointer justify-center items-center h-[40px] bg-white l-rounded-top" onClick={handleFilterModal}>
            <BsFillGrid3X3GapFill size={10} />
            <span className='text-[#373737] text-[12px] font-poppins-400 ml-[7px]'>Filters</span>
        </div>
        <div className="flex justify-center cursor-pointer items-center w-[50%] h-[40px] bg-white ml-[6px] r-rounded-top" onClick={handleSortByModal}>
            <TbArrowsUpDown size={10} />
            <span className='text-[#373737] text-[12px] font-poppins-400 ml-[7px]'>Sort by</span>
        </div>
    </div>
  )
}

export default SmallFilterNavbar