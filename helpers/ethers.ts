import { ethers } from "ethers"

/**
 * Get converted bytes data for multiple NFTs purchasing
 * 
 * @param _nftAddress - Address of NFT minter
 * @param _nftId - Id of NFT
 * @param _seller - Address of the seller
 * @param _price - Price of the NFT
 * @param _currency - Address of currency to purchase the NFT
 * @param _creatorAddresses - Array of creator addresses
 * @param _creatorFeePercentages - Array of creator fees
 * @returns Converted Bytes data for NFT purchasing
 */
export const getBytesDataForNFT = (
  _nftAddress: string, 
  _nftId: number, 
  _seller: string, 
  _price: string, 
  _currency: string, 
  _creatorAddresses: string[], 
  _creatorFeePercentages: number[]
) => {
  const hexStr = ethers.utils.defaultAbiCoder.encode(
    ["address", "uint256", "address", "uint256", "address", "address[]", "uint256[]"],
    [_nftAddress, _nftId, _seller, _price, _currency, _creatorAddresses, _creatorFeePercentages]
  )
  const uint8Arr = ethers.utils.arrayify(hexStr)
  return ethers.utils.hexlify(uint8Arr)
}
