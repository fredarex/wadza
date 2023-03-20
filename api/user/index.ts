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

export const updateProfile = (data: any) => {
  const token = getToken()
  return client.patch(`/users/updateProfile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}    
    
export const uploadCoverImage = (data: any) => {
  const token = getToken()
  return client.post(`/users/uploadCoverImage`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const verifyUsername = (username: string) => {
  const token = getToken()
  return client.get(`/users/verify-username/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getTwitterRequestToken = () => {
  const token = getToken()
  return client.get(`/users/twitter/getTwitterRequestToken`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const getConnectTwitter = (payload: any) => {
  const token = getToken()
  return client.post(`/users/twitter/connectTwitter`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getRemoveTwitter = () => {
  const token = getToken()
  return client.get(`/users/twitter/removeTwitter`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const addWatchlist = (collectionId: string) => {
  const token = getToken()
  return client.get(`/users/${collectionId}/addWatchlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const removeWatchlist = (collectionId: string) => {
  const token = getToken()
  return client.get(`/users/${collectionId}/removeWatchlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const createReferralCode = (data: any) => {
  const token = getToken()
  return client.post(`/users/createReferralCode`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const updateReferralCode = (data: any) => {
  const token = getToken()
  return client.patch(`/users/updateReferralCode`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const claimReferralCommission = () => {
  const token = getToken()
  return client.get(`/users/referral/getReferralCommission`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const getReferralCommissionData = () => {
  const token = getToken()
  return client.get(`/users/referral/getReferralData`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const getAllERC20Tokens = (data: any) => {
  const token = getToken()
  return client.post(`/users/wallet/getAllERC20Tokens`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const setNotificationPreferences = (data: any) => {
  const token = getToken()
  return client.post(`/users/setNotificationPreferences`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const updateMinimumBidThreshold = (data: any) => {
  const token = getToken()
  return client.post(`/users/updateMinimumBidThreshold`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const updateOfferSettings = (data: any) => {
  const token = getToken()
  return client.post(`/users/updateOfferSettings`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const addFirebaseToken = (data: any) => {
  const token = getToken()
  return client.post(`/users/firebase/addFirebaseToken`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
}
