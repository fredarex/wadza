import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

/* create the subgraph client */
export const subgraphClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT,
  cache: new InMemoryCache()
})

/* all listingAddeds */
export const listingAddeds = gql`
query ListingAddeds($tokenAddress: Bytes!, $tokenId: BigInt!) {
  listingAddeds(where: {
    _tokenAddress: $tokenAddress,
    _tokenId: $tokenId,
  }) {
    _payToken
    _price
    _seller
    _startingDate
    _endingDate
    transactionHash
  }
}
`

/* all offerMades */
export const offerMades = gql`
query OfferMades($tokenAddress: Bytes!, $tokenId: BigInt!) {
  offerMades(where: {
    nftAddress: $tokenAddress,
    nftId: $tokenId,
  }) {
    buyer
    expiryTime
    price
    transactionHash
  }
}
`
