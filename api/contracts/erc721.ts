import Web3 from '../../helpers/web3'
import { contracts } from '../../config'
import { IContractConfig } from '../../types/types'

export const approveERC721NFTs = async (
  account: string,
  address: string,
  tokenAddress: string,
) => {
  try {
    console.log('⏳ Approving ERC721 NFTs...')
    const web3 = Web3.instance
    const erc721 = contracts.filter((contract: IContractConfig, index: number) => contract.name === 'ERC721')
    const erc721Contract = new web3.eth.Contract(erc721[0].abi, tokenAddress)

    const isApprovedForAll = await erc721Contract.methods
      .isApprovedForAll(account, address)
      .call()
    
    if (!isApprovedForAll) {      
      const txn = await erc721Contract.methods
        .setApprovalForAll(address, true)
        .send({ from: account, gas: 1500000, gasPrice: 50000000000 })
        .catch((err: any) => {
          return { err, data: null }
        })
  
      return { err: null, data: txn }
    }

    return { err: null, data: {} }
  } catch (err) {
    return { err, data: null }
  }
}
