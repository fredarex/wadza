import React, {createContext, useContext, useState} from 'react'
import { ICollectionContextValue, IContextProviderProps } from '../types/types'

const collectionCtxDefaultValue:ICollectionContextValue = {
  onFilterSidebar: true,
  setOnFilterSidebar: onFilterSidebar => {},
  onSweepMode: false,
  setOnSweepMode: onSweepMode => {},
}

const CollectionContext = createContext(collectionCtxDefaultValue)

const CollectionProvider = (props: IContextProviderProps) => {
  const { children } = props
  const [onFilterSidebar, setOnFilterSidebar] = useState(collectionCtxDefaultValue.onFilterSidebar)
  const [onSweepMode, setOnSweepMode] = useState(collectionCtxDefaultValue.onSweepMode)
  
  const value = {
    onFilterSidebar,
    setOnFilterSidebar,
    onSweepMode,
    setOnSweepMode,
  }
  
  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollection = () => useContext(CollectionContext) as ICollectionContextValue
export default CollectionProvider
