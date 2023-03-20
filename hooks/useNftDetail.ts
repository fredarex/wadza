import { useEffect, useState } from 'react'
import { getNFTMetadata } from '../api/listing'
import { ICreatorFee } from '../types/types'

/**
 * Hook to get NFT details.
 * 
 * @returns NFT details
 */
const useNftDetail = (params: string[]) => {
  const [nft, setNft] = useState<any>({})
  const [collection, setCollection] = useState<any>({})
  const [owner, setOwner] = useState<any>({})
  const [creator, setCreator] = useState<any>({})
  const [status, setStatus] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isListPage, setIsListPage] = useState<boolean>(false)

  useEffect(() => {
    const getMetadata = async () => {
      if (params.length >= 3) {
        if (params[3] && params[3] === 'sell') {
          setIsListPage(true)
        } else {
          setIsListPage(false)
        }

        const data = {
          chain: params[0],
          address: params[1],
          tokenId: params[2],
        }

        const response = await getNFTMetadata(data)

        if (response?.data?.data) {
          const _data = response.data.data

          setNft(_data.nft)

          let creatorFee: number = 0
          const collectionData = _data.collection
          if (collectionData?.creatorFees?.length > 0) {
            collectionData?.creatorFees.map((fee: ICreatorFee, index: number) => {
              creatorFee += fee.percentage
            })
          }

          setCollection({
            ..._data.collection,
            creatorFee,
          })
          setOwner(_data.nft?.owner)
          setCreator(_data.nft?.creator)
          setStatus(_data?.status)
          setMessage(_data?.message)
        }
      }
    }

    getMetadata()
  }, [params])

  return { nft, collection, owner, creator, isListPage, status, message }
}

export default useNftDetail
