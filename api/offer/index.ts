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

export const newOffer = (data: any, listingId: string) => {
  const token = getToken()
  return client.post(`/offer/${listingId}/makeOffer`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const saveAcceptOffer = (data: any, listingId: string) => {
  const token = getToken()
  return client.post(`/offer/${listingId}/acceptOffer`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const getOfferById = (offerId: string) => {
  return client.get(`/offer/${offerId}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const cancelOffer = (offerId: string) => {
  const token = getToken()
  return client.get(`/offer/${offerId}/cancelOffer`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}
