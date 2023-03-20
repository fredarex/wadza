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

export const newSale = (value: number, itemId: string, txHash: string, currency: string) => {
  const token = getToken()
  return client.post(
    `/sale/${itemId}/newSale`,
    { value, txHash, currency },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

export const newMultipleSale = (data: any, txHash: string) => {
  const token = getToken()
  return client.post(`/sale/${txHash}/newMultipleSale`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
}
