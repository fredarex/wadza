import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {MdOutlineExplore} from 'react-icons/md';
import {SlGraduation} from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCartModal, setOpenExploreCollectionModal, setOpenMoreModal, setOpenResearchModal } from '../../redux/features/arrangementSlice';
import ExploreCollectionModal from '../modals/exploreCollectionModal';
import ResearchModal from '../modals/ResearchModal';
import SingleNavLink from './SingleNavLink';
import activeExploreIcon from '../../assets/svg/active-explore.svg';
import exploreIcon from '../../assets/svg/explore.svg';
import activeResourceIcon from '../../assets/svg/active-resource.svg';
import resourceIcon from '../../assets/svg/resource.svg';
import activeCartIcon from '../../assets/svg/active-cartIcon.svg';
import CartIcon from '../../assets/svg/carticon.svg';
import hamburgerIcon from '../../assets/svg/hamburger.svg';
import createIcon from '../../assets/svg/create.svg';
import NavCartModal from '../modals/NavCartModal';
import MoreLinkModal from '../modals/MoreLinkModal';


const mapState = (state:any) => ({
  exploreCollectionModal: state.arrangement.exploreCollectionModal,
  researchModal: state.arrangement.researchModal,
  cartModal: state.arrangement.cartModal,
  createCollectionModal: state.arrangement.createCollectionModal,
  moreModal: state.arrangement.moreModal
})

function BottomNavbar() {
  const [showExplore, setShowExplore] = useState(false);
  const [showCurrentModalId, setShowCurrentModalId] = useState<number>(0);
  const {exploreCollectionModal, researchModal,cartModal,createCollectionModal,moreModal} = useSelector(mapState);
  const dispatch = useDispatch();
  
  return (
    <>
    <div className='sticky bottom-0 z-[9999999]'>
      <div className="flex px-10 justify-between items-center w-full md:hidden min-h-[68px] bottom-nav-container">

        <SingleNavLink
          activeIcon={activeExploreIcon}
          icon={exploreIcon}
          onClick={() => dispatch(setOpenExploreCollectionModal(!exploreCollectionModal))}
          modal={exploreCollectionModal}
        />
        <SingleNavLink
          activeIcon={activeResourceIcon}
          icon={resourceIcon}
          onClick={() => dispatch(setOpenResearchModal(!researchModal))}
          modal={researchModal}
        />
        <SingleNavLink
          activeIcon={activeCartIcon}
          icon={CartIcon}
          onClick={() => dispatch(setOpenCartModal(!cartModal))}
          modal={cartModal}
        />
        <SingleNavLink
          activeIcon={createIcon}
          icon={createIcon}
          onClick={""}
          modal={createCollectionModal}
        />
        <SingleNavLink
          activeIcon={hamburgerIcon}
          icon={hamburgerIcon}
          onClick={() => dispatch(setOpenMoreModal(!moreModal))}
          modal={moreModal}
        />
        {/* <div className="relative h-[68px] items-center justify-center  cursor-pointer flex flex-col">
          <div className='h-full flex items-center'  onClick={() => dispatch(setOpenResearchModal(!researchModal))}>
            <SlGraduation size={29} />
            
          </div>
          {researchModal && <div className="w-[67px] h-full bg-transparent absolute top-0 z-[999099999]"></div>}
          <div className={`w-[67px] h-[7px] rounded-[15px,15px,0,0] ${researchModal && 'bg-[#3C1361]'} `}></div>
        </div> */}
      </div>
    </div>
    {
      exploreCollectionModal && <ExploreCollectionModal isOpen={exploreCollectionModal} close={() => dispatch(setOpenExploreCollectionModal(false))} />
    }
    {
      researchModal && <ResearchModal isOpen={researchModal} close={() => dispatch(setOpenResearchModal(false))} />
    }
    {
      cartModal && <NavCartModal isOpen={cartModal} close={() => dispatch(setOpenCartModal(false))} />
    }
    {
      moreModal && <MoreLinkModal isOpen={moreModal} close={() => dispatch(setOpenMoreModal(false))} />
    }
    </>
    
  )
}

export default BottomNavbar