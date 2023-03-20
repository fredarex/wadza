import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import AssetsProvider from '../../contexts/Assets.context'
import { getAllListings } from '../../api/listing'
import { RootState } from '../../redux/store'
import { setAllListings } from '../../redux/features/listingsSlice'
import { FilterNavbar, FilterResults, FilterSidebar } from '../../components/_assets'
import SmallFilterNavbar from '../../components/_filterNavbar/index';
import FilterModal from '../../components/_assets/_modal/FilterModal'
import SortByModal from '../../components/_assets/_modal/SortByModal'
import { setOpenFilterModal, setOpenSortByModal } from '../../redux/features/arrangementSlice'
interface IProps {
  listings?: any
}

const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}

const mapState = (state:any) => ({
  openFilterModal: state.arrangement.openFilterModal,
  openSortByModal: state.arrangement.openSortByModal
});

const Assets = (props: IProps) => {
  const {openFilterModal,openSortByModal} = useSelector(mapState);
  const { listings } = props
  const dispatch = useDispatch();
  const [_show, setShow] = useState<boolean>(true);
  const _listings: any = useSelector((state: RootState) => state.listings)

  useEffect(() => {
    if (listings.data) {
      dispatch(setAllListings(listings.data))
    }
  }, [listings, dispatch]);


  useEffect(() => {
   
    const handleWindowResize = () => {
      const { innerWidth } = getWindowSize()
      if (innerWidth >= 1024)
        setShow(true);
      else
        setShow(false)
    }

    window.addEventListener('resize', handleWindowResize)
    
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, []);


  return (
    <AssetsProvider>
      <>
        <div className='flex flex-col items-center mt-[116px]'>
          {
            _show && <FilterNavbar />}
          <SmallFilterNavbar />
          
          <div className='flex flex-row max-w-[1250px] w-full mt-[9px]'>
            <FilterSidebar />
            <FilterResults listings={_listings} />
          </div>
        </div>
        {
          
          <FilterModal
            isOpen={openFilterModal}
            close={() => dispatch(setOpenFilterModal(false))}

          />
        }
        {
          <SortByModal
            isOpen={openSortByModal}
            close={() => dispatch(setOpenSortByModal(false))}

          />
        }
      </>
    </AssetsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { data } = await getAllListings()

  return {
    props: {
      listings: JSON.parse(JSON.stringify(data))
    }
  }
}

export default Assets
