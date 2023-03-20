import { createSlice, current } from '@reduxjs/toolkit'
import { IArrangementState} from '../../types/types'

const initialState: IArrangementState = {
  openFilterModal: false,
  openSortByModal:false,
  exploreCollectionModal: false,
  researchModal:false,
  cartModal: false,
  createCollectionModal:false,
  moreModal:false
}

export const arrangementSlice = createSlice({
  name: 'arrangement',
  initialState,
  reducers: {
    setOpenFilterModal: (state, action) => {
        state.openFilterModal = action.payload
    },
    setOpenSortByModal: (state, action) => {
      state.openSortByModal = action.payload
    },
    setOpenExploreCollectionModal: (state, action) => {
      state.exploreCollectionModal = action.payload
    },
    setOpenResearchModal: (state, action) => {
      state.researchModal = action.payload;
    },
    setOpenCartModal: (state, action) => {
      state.cartModal = action.payload;
    },
    setOpenCreateCollectionModal: (state, action) => {
      state.createCollectionModal = action.payload
    },
    setOpenMoreModal: (state, action) => {
      state.moreModal = action.payload
    }
  },
})

export const {
  setOpenFilterModal,
  setOpenSortByModal,
  setOpenExploreCollectionModal,
  setOpenResearchModal,
  setOpenCartModal,
  setOpenCreateCollectionModal,
  setOpenMoreModal
} = arrangementSlice.actions

export default arrangementSlice.reducer
