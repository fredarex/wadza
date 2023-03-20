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

export const getAllFeaturedItems = () => {
  const token = getToken()
  return client.get(`/featured/getAllFeaturedItems`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const createFeaturedItem = (data: any) => {
  const token = getToken()
  return client.post(`/featured`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const updateFeaturedItem = (data: any, featuredItemId: string) => {
  const token = getToken()
  return client.patch(`/featured/${featuredItemId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const getFeaturedItem = (featuredItemId: string) => {
  return client.get(`/featured/${featuredItemId}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const changeOrder = (data: any) => {
  const token = getToken()
  return client.post(`/featured/changeOrder`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const removeFeaturedItem = (featuredItemId: string) => {
  const token = getToken()
  return client.delete(`/featured/${featuredItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}
