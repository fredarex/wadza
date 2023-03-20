import { createSlice, current } from '@reduxjs/toolkit'
import { IListingsState } from '../../types/types'

const initialState: IListingsState = {
  listings: [],
  filteredListings: [],
}

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setAllListings: (state, action) => {
      state.listings = action.payload
      state.filteredListings = action.payload
    },
    setListingsByCategory: (state, action) => {
      const { listings } = current(state)

      if (action.payload != 'All') {
        const filteredListings = listings?.filter(
          (listing: any) => listing.category === action.payload,
        )

        state.filteredListings = filteredListings!
      } else {
        state.filteredListings = listings!
      }
    },
    setListingsBySearch: (state, action) => {
      const { listings } = current(state)
      const filteredListings = listings?.filter(
        (listing: any) => 
        listing.category?.toLowerCase().includes(action.payload?.toLowerCase()) || 
        listing.name?.toLowerCase().includes(action.payload?.toLowerCase()) || 
        listing.description?.toLowerCase().includes(action.payload?.toLowerCase()) || 
        listing.creator?.fullName.toLowerCase().includes(action.payload?.toLowerCase()) || 
        listing.creator?.username.toLowerCase().includes(action.payload?.toLowerCase()),
      )

      state.filteredListings = filteredListings!
    },
  },
})

export const {
  setAllListings,
  setListingsByCategory,
  setListingsBySearch,
} = listingsSlice.actions

export default listingsSlice.reducer
