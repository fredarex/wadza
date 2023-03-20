import NFTBuilderABI from './abis/NFTBuilder.json'
import NFTSaleABI from './abis/NFTSale.json'
import ERC20ABI from './abis/ERC20.json'
import ERC721ABI from './abis/ERC721.json'
import { IAllowedChainConfig, IContractAddresses, IContractConfig } from './types/types'

export const EthNetworkIDs: number[] = [
  1,
  5,
  11155111,
]

export const allowedChains: IAllowedChainConfig[] = [
  {
    id: 5,
    hex: '0x5',
    name: 'Goerli',
    slug: 'goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    rpcUrl: 'https://goerli.infura.io/v3',
    nativeCurrency: {
      name: 'Goerli Ethereum',
      symbol: 'GoerliETH',
      decimals: 18,
    },
  },
  {
    id: 80001,
    hex: '0x13881',
    name: 'Mumbai Testnet',
    slug: 'mumbai',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
    nativeCurrency: {
      name: 'Polygon Testnet Mumbai ',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
]

export const contractAddresses: IContractAddresses = {
  NFTBUILDER: process.env.NEXT_PUBLIC_NFT_ETHEREUM_BUILDER_ADDRESS,
  NFTSALE: process.env.NEXT_PUBLIC_NFT_ETHEREUM_SALE_ADDRESS,
}

export const contracts: IContractConfig[] = [
  {
    name: 'NFTBUILDER',
    abi: NFTBuilderABI.abi,
    address: contractAddresses.NFTBUILDER || '',
  },
  {
    name: 'NFTSALE',
    abi: NFTSaleABI.abi,
    address: contractAddresses.NFTSALE || '',
  },
  {
    name: 'ERC20',
    abi: ERC20ABI.abi,
    address: '',
  },
  {
    name: 'ERC721',
    abi: ERC721ABI.abi,
    address: '',
  },
]

export const currencies = [
  {
    name: 'ETH',
    address: process.env.NEXT_PUBLIC_ETH,
  },
  {
    name: 'WETH',
    address: process.env.NEXT_PUBLIC_GOERLI_WETH,
  },
]

export const IMAGE_FILE_TYPES: string[] = [
  'png',
  'jpeg',
  'jpg',
  'webp',
  'gif',
]

export const VIDEO_FILE_TYPES: string[] = [
  'mp4',
  'mov',
]

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}
