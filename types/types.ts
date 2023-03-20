import { StaticImageData } from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { NFTBuilder, NFTSale } from '../typechain-types'

export interface ISvgIconProps {
  color: string
  width?: number
  height?: number
}

export interface ICommonProps {
  className?: string
}

export interface IContextProviderProps {
  children?: any
}

export interface IAssetsContextValue {
  onFilterSidebar: boolean
  setOnFilterSidebar: Dispatch<SetStateAction<boolean>>
  filterParams: string
  setFilterParams: Dispatch<SetStateAction<string>>
  statusFilterOptions: string[]
  setStatusFilterOptions: Dispatch<SetStateAction<string[]>>
  handleStatusFilter: (e: React.MouseEvent<HTMLInputElement>, status: string) => void
  priceFilterOptions: IPriceFilterOption
  setPriceFilterOptions: Dispatch<SetStateAction<IPriceFilterOption>>
  handlePriceFilter: () => void
  quantityFilterOption: string
  setQuantityFilterOption: Dispatch<SetStateAction<string>>
  handleQuantityFilter: (quantityOption: string) => void
  categoryFilterOptions: string[]
  setCategoryFilterOptions: Dispatch<SetStateAction<string[]>>
  handleCategoryFilter: (e: React.MouseEvent<HTMLInputElement>, category: string) => void
  collectionFilterOptions: string[]
  setCollectionFilterOptions: Dispatch<SetStateAction<string[]>>
  handleCollectionFilter: (e: React.MouseEvent<HTMLElement>, collection: IMockCollection) => void
}

export interface IPriceFilterOption {
  currency: CurrencyType
  min: string
  max: string
}

export interface ICollectionContextValue {
  onFilterSidebar: boolean
  setOnFilterSidebar: Dispatch<SetStateAction<boolean>>
  onSweepMode: boolean
  setOnSweepMode: Dispatch<SetStateAction<boolean>>
}

export interface IActivityContextValue {
  onFilterSidebar: boolean
  setOnFilterSidebar: Dispatch<SetStateAction<boolean>>
  eventTypes: IFilterOption[]
  setEventTypes: Dispatch<SetStateAction<IFilterOption[]>>
  filterParams: string
  setFilterParams: Dispatch<SetStateAction<string>>
  eventTypeFilterOptions: string[]
  setEventTypeFilterOptions: Dispatch<SetStateAction<string[]>>
  handleEventTypeFilter: (e: React.MouseEvent<HTMLElement>, filterOption: IFilterOption) => void
  collectionOptions: IMockCollection[]
  setCollectionOptions: Dispatch<SetStateAction<IMockCollection[]>>
  handleCollectionOptionFilter: (e: React.MouseEvent<HTMLElement>, collection: IMockCollection) => void
  collectionFilterOptions: string[]
  setCollectionFilterOptions: Dispatch<SetStateAction<string[]>>
}

export interface IMetamaskContextValue {
  account: string
  chain: IAllowedChainConfig | undefined
  disconnect: () => void
  connect: () => void
  isConnectedToAllowedNetwork: () => Promise<boolean>
  handleTransactionError: (err: any) => void
  signMessage: (message: string) => Promise<any>
  verifyMessage: (message: string, address: string, signature: string) => Promise<boolean>
  refresh: {
    rerender: () => void
    triggerValue: number
  }
}

export interface ITab {
  icon?: any
  iconWidth?: number
  iconHeight?: number
  iconColor?: string
  name: string
  description?: string
  slug: string
}

export interface ISubMenu {
  name: string
  url: string
}

export interface IMenu {
  title: string
  menus: ISubMenu[]
}

export interface IUserData {
  fullName?: string
  username?: string
  twitterData?: ITwitterData
  about?: string
  links?: string
  earnings?: string
  email?: string
  notificationPreferences?: INotificationPreferences
  profileImage?: string
  coverImage?: string
  walletAddress: string
  listings?: string[]
  lastLogin?: Date
  lastActivityAt?: Date
  tokens?: IToken[]
  totalEarnings?: Number
  following?: string[]
  followers?: string[]
}

export interface ITwitterData {
  username: string
  twitterId: string
}

export interface INotificationPreferences {
  newSales: boolean
  newBids: boolean
  likeOnPosts: boolean
  newComments: boolean
  priceChanged: boolean
  auctionExpiration: boolean
  outBid: boolean
  ownedItemUpdates: boolean
  successfulPurchase: boolean
  newsletter: boolean
}

export interface IToken {
  token: string
}

export interface IAllowedChainConfig {
  id: number
  hex: string
  name: string
  slug: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrl: string
  blockExplorerUrl: string
}

export interface IContractConfig {
  name: string
  address: string
  abi: any
}

export interface IContractInstances {
  NFTBUILDER: NFTBuilder
  NFTSALE: NFTSale
}

export interface IContractAddresses {
  NFTBUILDER?: string
  NFTSALE?: string
  NFTAUCTION?: string
}

export interface IMoralisData {
  MORALIS_APP_ID: string,
  MORALIS_SERVER_URL: string,
  MORALIS_API_KEY: string,
  MORALIS_BASE_URL: string,
  MORALIS_CHAIN: string,
  MORALIS_FORMAT: string,
}

export interface IModal {
  isOpen: boolean
  title: string
  subTitle?: string
  content?: any
  close?: () => void
  cancel?: () => void
  accept?: () => void
}

export interface IWalletOption {
  title: string
  icon: StaticImageData
  onClick?: () => void
}

export interface INftData {
  image: any
  fileType?: string
  collectionId?: string
  name: string
  externalLink?: string
  description?: string
  descriptionArabic?: string
  properties?: INftAttributeData[]
  stats?: INftStatsData[]
  levels?: INftStatsData[]
  unlockableContent?: string
  explicit?: boolean
  supply?: string
  chain?: string
  price?: number
  currency?: string
}

export interface INftAttributeData {
  trait_type?: string
  value?: string
}

export interface INftStatsData {
  trait_type?: string
  value?: {
    amount?: number
    total?: number
  }
}

export interface INftErrorMsg {
  image: string
  name: string
  supply: string
}

export interface IUserState {
  user: object | null
  token: string | null | undefined
  currency: string | null | undefined
  language: string | null | undefined
  night: boolean
  detail: boolean
  shoppingCartModal: boolean
  shoppingCarts: string[]
  mintedModal: boolean
  referredCode: string
  loginModal: boolean
  connectWalletsModal: boolean
  addFundsModal: boolean
  myWalletModal: boolean
  purchasingResultModal: boolean
  firebaseToken: string
}

export interface IListingsState {
  listings: Array<object> | null
  filteredListings: Array<object> | null
}

export interface IArrangementState {
  openFilterModal: boolean,
  openSortByModal:boolean,
  exploreCollectionModal: boolean,
  researchModal: boolean,
  cartModal: boolean,
  createCollectionModal:boolean,
  moreModal:boolean
}

export interface ICollectionState {
  collections: Array<object> | null
  ownedCollections: Array<object> | null
  filteredCollections: Array<object> | null
}

export interface IFilterOption {
  label: string
  value: string
}

export interface IAttribute {
  name: string
  description: string
  image: StaticImageData
  info?: boolean
  slug: string
}

export interface ICollectionData {
  _id?: string
  logoImage: any
  featuredImage: any
  bannerImage: any
  ownWebsite: string
  mediumAddress: string
  telegramAddress: string
  creatorFees: ICreatorFee[]
  explicit: boolean
  rarity: boolean
  name: string
  url: string
  description: string
  descriptionArabic: string
  category: IMockCategory[]
  paymentTokens: IPaymentToken[],
  displayTheme: CollectionThemeType,
  isVerified?: boolean
  slug?: string
}

export interface ICollectionErrorMsg {
  logoImage: string
  name: string
}

export interface ICreatorFee {
  address: string
  percentage: number
}

export interface IPaymentToken {  
  symbol: string
  chain: string | undefined
  icon: StaticImageData
  removable: boolean
}

export interface IOffer {
  _id: string
  listing: any
  value: number
  seller: any
  offerBy: any
  expiryDate: number
  isAccepted: boolean
  isCanceled: boolean
}

export interface ICollectionTheme {
  icon: StaticImageData
  label: string
  description: string
  slug: CollectionThemeType
}

// Mock data
export interface IMockProduct {
  creator: string
  currency: string
  productImage: StaticImageData
  creatorImage: StaticImageData
  floorPrice: number
}

export interface IMockCollection {
  _id?: string
  id: string
  floorPrice: number
  totalValue: number
  collectionImage: StaticImageData
  title: string
  currency: string
  count?: number
  image?: string
  slug?: string
  volume?: number
  change?: number
  name?: string
  isVerified?: boolean
  sales?: number
  rank?: number
  listingsCount?: number
  logoImage?: string
  featuredImage?: string
  bannerImage?: string
}

export interface IMockNotableCollection {
  coverImage: StaticImageData
  profileImage: StaticImageData
  title: string
}

export interface IMockCategory {
  label: string
  value: string
}

export interface IMockLeaderboard {
  grade: number
  profileImage: StaticImageData
  username: string
  value: number
  currency: string
}

export interface IMockGuide {
  title: string
  date: string
  image: StaticImageData
}

export type ArrowType = 
  | 'right'
  | 'left'

export type CurrencyType = 
  | 'USD'
  | 'ETH'

export type CollectionThemeType = 
  | 'padded'
  | 'contained'
  | 'covered'

export type ProfileTabsType = 
  | 'collected'
  | 'created'
  | 'favorites'
  | 'activity'
  | 'bids_made'
  | 'bids'
  | 'listings'
  | 'listings_inactive'
  | 'private'

export type ProfileSettingsTabsType = 
  | 'profile'
  | 'featured_items'
  | 'notifications'
  | 'offers'
  | 'account_support'
  | 'earnings'

export type TypeOfSale = 
  | 'fixed'
  | 'auction'

export type AuctionMethodType = 
  | 'highest_bidder'
  | 'declining_price'

export type CollectionPageType = 
  | 'edit'
  | 'payouts'

export type TimeRangeType =
  | 'one_hour_volume'
  | 'six_hour_volume'
  | 'one_day_volume'
  | 'seven_day_volume'
  | 'thirty_day_volume'
  | 'total_volume'

export type CategoryType =
  | 'all_categories'
  | 'art'
  | 'music'
  | 'trading_cards'
  | 'collectibles'
  | 'photography'
  | 'utility'
  | 'domain_names'
  | 'sports'
  | 'virtual_worlds'
