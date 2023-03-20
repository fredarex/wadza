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

export const saveItem = (data: any) => {
  const token = getToken()
  return client.post(`/item`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const getItemById = (itemId: string) => {
  return client.get(`/item/${itemId}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const getItemsByIds = (data: any) => {
  return client.post(`/item/getItemsByIds`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
