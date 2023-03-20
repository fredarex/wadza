import { createSlice, current } from '@reduxjs/toolkit'
import { ICollectionState } from '../../types/types'

const initialState: ICollectionState = {
  collections: [],
  ownedCollections: [],
  filteredCollections: [],
}

export const collectionSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setAllCollections: (state, action) => {
      state.collections = action.payload
      state.filteredCollections = action.payload
    },
    setOwnedCollections: (state, action) => {
      state.ownedCollections = action.payload
    },
    setCollectionsBySearch: (state, action) => {
      const { collections } = current(state)
      const filteredCollections = collections?.filter(
        (collection: any) => collection.name?.toLowerCase().includes(action.payload?.toLowerCase()))

      state.filteredCollections = filteredCollections!
    },
  },
})

export const {
  setAllCollections,
  setOwnedCollections,
  setCollectionsBySearch,
} = collectionSlice.actions

export default collectionSlice.reducer
