import Contracts from '../../helpers/contracts'

const contracts = Contracts.instances

export const issueToken = async (
  account: string,
  ipfsHashUrl: string,
) => {
  try {
    const tokenId = await contracts.NFTBUILDER.methods
      .issueToken(account, ipfsHashUrl)
      .send({ from: account, gas: 1500000, gasPrice: 50000000000 })
      .catch((err) => {
        return { err, data: null }
      })

    return { err: null, data: tokenId }
  } catch (err) {
    return { err, data: null }
  }
}

export const approve = async (
  account: string,
  address: string,
) => {
  try {
    console.log('⏳ Approving...')
    const isApprovedForAll = await contracts.NFTBUILDER.methods
      .isApprovedForAll(account, address)
      .call()
    
    if (!isApprovedForAll) {      
      const txn = await contracts.NFTBUILDER.methods
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

export const ownerOf = async (tokenId: number) => {
  try {
    const owner = contracts.NFTBUILDER.methods
      .ownerOf(tokenId)

    return { err: null, data: owner }
  } catch (err) {
    return { err, data: null }
  }
}

export const transfer = async () => {
  try {
    
  } catch (err) {
    return { err, data: null }
  }
}
