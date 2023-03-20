import { IMockGuide, IMockNotableCollection, IMockProduct } from '../types/types'

import Product1 from '../assets/products/prod1.png'
import Product2 from '../assets/products/prod2.png'
import Product3 from '../assets/products/prod3.png'
import Product4 from '../assets/products/prod4.png'

import Profile1 from '../assets/profiles/prof1.png'

import Collection1 from '../assets/collections/coll1.webp'
import Collection2 from '../assets/collections/coll2.webp'
import Collection3 from '../assets/collections/coll3.webp'

import Profile2 from '../assets/profiles/prof2.webp'
import Profile3 from '../assets/profiles/prof3.webp'
import Profile4 from '../assets/profiles/prof4.webp'

import Dream1 from '../assets/collections/dream1.webp'
import Dream2 from '../assets/collections/dream2.webp'
import Dream3 from '../assets/collections/dream3.webp'

import Profile5 from '../assets/profiles/prof18.webp'
import Profile6 from '../assets/profiles/prof19.webp'
import Profile7 from '../assets/profiles/prof20.webp'

import Guide1 from '../assets/guides/guide1.webp'
import Guide2 from '../assets/guides/guide2.webp'
import Guide3 from '../assets/guides/guide3.webp'

export const Products: IMockProduct[] = [
  {
    productImage: Product1,
    creator: 'Monkey11',
    creatorImage: Profile1,
    floorPrice: 0.14,
    currency: 'ETH'
  },
  {
    productImage: Product2,
    creator: 'Monkey12',
    creatorImage: Profile1,
    floorPrice: 1.2,
    currency: 'ETH'
  },
  {
    productImage: Product3,
    creator: 'Monkey13',
    creatorImage: Profile1,
    floorPrice: 0.025,
    currency: 'ETH'
  },
  {
    productImage: Product4,
    creator: 'Monkey14',
    creatorImage: Profile1,
    floorPrice: 10.14,
    currency: 'ETH'
  }
]

export const Collections: IMockNotableCollection[] = [
  {
    coverImage: Collection1,
    profileImage: Profile2,
    title: 'Cyberbrokers',
  },
  {
    coverImage: Collection2,
    profileImage: Profile3,
    title: 'Arivaman',
  },
  {
    coverImage: Collection3,
    profileImage: Profile4,
    title: 'Amazonia',
  }
]

export const DreamersSpotlightCollections: IMockNotableCollection[] = [
  {
    coverImage: Dream1,
    profileImage: Profile5,
    title: 'Cyberbrokers',
  },
  {
    coverImage: Dream2,
    profileImage: Profile6,
    title: 'Arivaman',
  },
  {
    coverImage: Dream3,
    profileImage: Profile7,
    title: 'Amazonia',
  }
]

export const Guides: IMockGuide[] = [
  {
    title: 'What are blockchain gas fees?',
    date: '2022-10-04',
    image: Guide1,
  },
  {
    title: 'What is Ethereum Veritual Machine?',
    date: '2022-11-14',
    image: Guide2,
  },
  {
    title: 'What is Ariva chain?',
    date: '2022-11-30',
    image: Guide3,
  }
]
