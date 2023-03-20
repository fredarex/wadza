import { ethers } from 'ethers'
import Web3 from 'web3'
import { contractAddresses } from '../../config'
import Contracts from '../../helpers/contracts'
import { getBytesDataForNFT } from '../../helpers/ethers'
import Web3Instance from '../../helpers/web3'

const contracts = Contracts.instances
declare var window: any

export const purchaseNFT = async (
  tokenAddress: string,
  tokenId: number,
  seller: string,
  currency: string,
  creatorAddresses: string[],
  creatorFeePercentages: number[],
  account: string,
  isPaymentETH: boolean,
  amount: number
) => {
  try {
    const _amount = Web3.utils.toWei(String(amount))
    const txn: any = await contracts.NFTSALE.methods
      .purchaseNFT(tokenAddress, tokenId, seller, _amount, currency, creatorAddresses, creatorFeePercentages)
      .send({ from: account, value: isPaymentETH ? _amount : 0 })
      .catch((err: any) => {
        return { err, data: null }
      })

    return { err: null, data: txn }
  } catch (err: any) {
    return { err, data: null }
  }
}

export const updateListingPrice = async (
  tokenAddress: string,
  tokenId: number,
  newPrice: number,
  account: string,
) => {
  try {
    const _amount = Web3.utils.toWei(String(newPrice))
    const txn = await contracts.NFTSALE.methods
      .updateListingPrice(tokenAddress, tokenId, _amount)
      .send({ from: account })
      .catch((err: any) => {
        return { err, data: null }
      })

    return { err: null, data: txn }
  } catch (err: any) {
    return { err, data: null }
  }
}

export const listingNFT = async (
  tokenAddress: string,
  tokenId: number,
  currency: string,
  account: string,
  startingDate: string,
  endingDate: string,
  price: number,
) => {
  try {
    console.log('⏳ Listing NFT...')
    const _amount = Web3.utils.toWei(String(price))
    const txn = await contracts.NFTSALE.methods
      .listingNFT(tokenId, Web3.utils.toChecksumAddress(tokenAddress), currency, startingDate, endingDate, _amount)
      .send({ from: account })
      .catch((err: any) => {
        return { err, data: null }
      })

    return { err: null, data: txn }
  } catch (err: any) {
    return { err, data: null }
  }
}

export const getTreasuryPercentage = async (address: string) => {
  try {
    const percentage = await contracts.NFTSALE.methods
      .treasuryPercentage(address)
      .call()
    
    return { err: null, data: percentage}
  } catch (err: any) {
    return { err, data: null }
  }
}

export const makeOffer = async (
  tokenAddress: string,
  tokenId: number,
  account: string,
  timestamp: number,
  exprityTime: number,
  price: number
) => {
  try {
    console.log('⏳ Making offer...')
    const _amount = Web3.utils.toWei(String(price))
    const txn = await contracts.NFTSALE.methods
      .makeOffer(account, _amount, tokenAddress, tokenId, timestamp, exprityTime)
      .send({ from: account })
      .catch((err: any) => {
        return { err, data: null }
      })

    return { err: null, data: txn }
  } catch (err: any) {
    return {err, data: null}
  }
}

export const acceptOffer = async (
  offerSender: string,
  price: number,
  tokenAddress: string,
  tokenId: number,
  timestamp: number,
  expiryTime: number,
  account: string,
  creatorAddresses: string[],
  creatorFeePercentages: number[]
) => {
  try {
    console.log('⏳ Accepting offer...')
    const _amount = Web3.utils.toWei(String(price))
    
    const name = "WadzaNFTsale"
    const web3 = Web3Instance.instance
    const chainId = await web3.eth.getChainId()
    const version = "1.0.0"
    const domainData = {
      name: name,
      version: version,
      verifyingContract: contractAddresses.NFTSALE,
      salt: "0x" + parseInt(String(chainId)).toString(16).padStart(64, "0"),
    }
    const offerType = [
      {
        name: "buyer",
        type: "address",
      },
      {
        name: "nftAddress",
        type: "address",
      },
      {
        name: "nftId",
        type: "uint256",
      },
      {
        name: "price",
        type: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
      },
      {
        name: "expiryTime",
        type: "uint256",
      },
    ]
    
    const message = {
      buyer: offerSender,
      nftAddress: tokenAddress,
      nftId: tokenId,
      price: _amount,
      timestamp: timestamp,
      expiryTime: expiryTime,
    }
    const types = {
      Offer: offerType,
    }

    if (!window.ethereum)
      throw new Error('No metamask wallet found. Please install it.')
    
    await window.ethereum.send('eth_requestAccounts')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signature = await signer._signTypedData(domainData, types, message)

    let r = signature.slice(0, 66)
    let s = "0x".concat(signature.slice(66, 130))
    let V = "0x".concat(signature.slice(130, 132))
    let v = parseInt(V)

    if (![27, 28].includes(v)) v += 27
    const txn = await contracts.NFTSALE.methods
      .acceptOffer(offerSender, _amount, tokenAddress, tokenId, timestamp, expiryTime, r, s, v, creatorAddresses, creatorFeePercentages)
      .send({ from: account })
      .catch((err: any) => {
        return { err, data: null }
      })
    
    return {err: null, data: txn}
  } catch (err: any) {
    return {err, data: null}
  }
}

export const multiPurchaseNFT = async (
  data: any[],
  account: string,
  isPaymentETH: boolean,
  amount: number,
) => {
  try {
    const _amount = Web3.utils.toWei(String(amount))
    let bytesData: any[] = []

    if (data.length > 0) {
      for (const item of data) {
        const byteData = getBytesDataForNFT(
          item.tokenAddress,
          item.tokenId,
          item.seller,
          Web3.utils.toWei(String(item.price)),
          item.currency,
          item.creatorAddresses,
          item.creatorFeePercentages
        )
        
        bytesData = [
          ...bytesData,
          byteData,
        ]
      }
    }
    const txn: any = await contracts.NFTSALE.methods
      .multiPurchaseNFT(bytesData)
      .send({ from: account, value: isPaymentETH ? _amount : 0 })
      .catch((err: any) => {
        return { err, data: null }
      })

    return { err: null, data: txn }
  } catch (err: any) {
    return { err, data: null }
  }
}
