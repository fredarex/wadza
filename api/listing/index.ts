import client from '../client'

const getToken = () => {
  const token =
    typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('@token')
      ? localStorage.getItem('@token')!
      : ''
  
  return token
}

export const getAllListings = () => {
  return client.get('/listings/all')
}

export const getCollectedListings = (username: string, chain: string) => {
  return client.get(`/listings/${username}/${chain}/getCollectedListings`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getCreatedListings = (username: string, chain: string) => {
  return client.get(`/listings/${username}/${chain}/getCreatedListings`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const uploadFileToPinata = (data: any) => {
  const token = getToken()
  return client.post('/listings/upload-file-pinata', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const saveListing = (data: any) => {
  const token = getToken()
  return client.post('/listings/save-listing', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getNFTMetadata = (data: any) => {
  return client.post('/listings/getNFTMetadata', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const likeListing = (listingId: string) => {
  const token = getToken()
  return client.get(`/listings/${listingId}/like`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getLikes = (listingId: string) => {
  return client.get(`/listings/${listingId}/likes`)
}

export const getListingsByFilterWidthCollection = (collectionId:string, filter: any) => {
  return client.post(`/listings/${collectionId}/getListingsByFilterWidthCollection`, filter, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getFavoriteListings = (username: string) => {
  return client.get(`/listings/${username}/getFavoriteListings`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
