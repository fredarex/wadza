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

export const saveCollection = (data: any) => {
  const token = getToken()
  return client.post('/collection', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateCollection = (data: any, collectionId: string) => {
  const token = getToken()
  return client.patch(`/collection/${collectionId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getAllCollections = () => {
  return client.get('/collection', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getOwnedAllCollections = () => {
  const token = getToken()
  return client.get('/collection/getOwnedAllCollections', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const getAllCollectionsByCategory = (category: string) => {
  return client.get(`/collection/${category}/getAllCollectionsByCategory`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getCollectionBySlug = (slug: string) => {
  return client.get(`/collection/${slug}/getCollectionBySlug`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getAllEarningsBySlug = (slug: string) => {
  return client.get(`/collection/${slug}/getAllEarningsBySlug`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getTopRankingsCollections = (data: any) => {
  return client.post(`/collection/getTopRankingsCollections`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getTrendingRankingsCollections = (data: any) => {
  return client.post(`/collection/getTrendingRankingsCollections`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getWatchlist = (data: any) => {
  const token = getToken()
  return client.post(`/collection/getWatchlist`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const editCollectionBySlug = (slug: string) => {
  return client.get(`/collection/${slug}/editCollectionBySlug`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getActivityData = (data: any) => {
  return client.post(`/collection/getActivityData`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getAllCollectionsByListings = () => {
  const token = getToken()
  return client.get(`/collection/getAllCollectionsByListings`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}
