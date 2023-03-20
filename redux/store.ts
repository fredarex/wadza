import { configureStore } from '@reduxjs/toolkit'

import userReducer from './features/userSlice'
import listingsReducer from './features/listingsSlice'
import collectionReducer from './features/collectionSlice'
import arrangementReducer from './features/arrangementSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    listings: listingsReducer,
    collection: collectionReducer,
    arrangement: arrangementReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
