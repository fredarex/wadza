import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { IUserState } from '../../types/types'

const userData = () => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('@user')
  ) {
    // const currentTime = moment(new Date())
    // if (
    //   currentTime.diff(
    //     JSON.parse(localStorage.getItem('@user')!).lastActivityAt,
    //     'minutes',
    //   ) < 60
    // ) {
      return JSON.parse(localStorage.getItem('@user')! || '')
    // } else {
      // localStorage.removeItem('@user')
    // }
  } else {
    return null
  }
}

const getToken = () => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('@user') &&
    localStorage.getItem('@token')
  ) {
    // const currentTime = moment(new Date())
    // if (
    //   currentTime.diff(
    //     JSON.parse(localStorage.getItem('@user')!).lastActivityAt,
    //     'minutes',
    //   ) < 60
    // ) {
      return localStorage.getItem('@token')!
    // } else {
      // localStorage.removeItem('@token')
    // }
  } else {
    return ''
  }
}

const getGlobalCurrency = () => {  
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('@currency')
  ) {
    return localStorage.getItem('@currency')
  } else {
    return 'USD'
  }
}

const getLanguage = () => {  
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('@language')
  ) {
    return localStorage.getItem('@language')
  } else {
    return 'en'
  }
}

const getNightMode = () => {  
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('@night')
  ) {
    return Boolean(localStorage.getItem('@night'))
  } else {
    return false
  }
}

const getAdditionalDetails = () => {  
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('@detail')
  ) {
    return Boolean(localStorage.getItem('@detail'))
  } else {
    return false
  }
}

const getShoppingCarts = () => { 
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('shoppingCarts')
  ) {
    return JSON.parse(localStorage.getItem('shoppingCarts')! || '') as string[]
  } else {
    return []
  }
}

const getReferredCode = () => {  
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('@referredCode')
  ) {
    return localStorage.getItem('@referredCode')!
  } else {
    return ''
  }
}

const getFirebaseToken = () => {  
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('@firebaseToken')
  ) {
    return localStorage.getItem('@firebaseToken')!
  } else {
    return ''
  }
}

const initialState: IUserState = {
  user: userData(),
  token: getToken(),
  currency: getGlobalCurrency(),
  language: getLanguage(),
  night: getNightMode(),
  detail: getAdditionalDetails(),
  shoppingCartModal: false,
  shoppingCarts: getShoppingCarts(),
  mintedModal: false,
  referredCode: getReferredCode(),
  loginModal: false,
  connectWalletsModal: false,
  addFundsModal: false,
  myWalletModal: false,
  purchasingResultModal: false,
  firebaseToken: getFirebaseToken(),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.data.data.user
      state.token = action.payload.data.data.token
      localStorage.setItem('@user', JSON.stringify(state.user))
      localStorage.setItem('@token', state.token || '')
    },
    logoutSuccess: (state, action) => {
      state.user = null
      state.token = ''
      localStorage.removeItem('@user')
      localStorage.removeItem('@token')
    },
    setUpdatedUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('@user', JSON.stringify(state.user))
    },
    setUpdatedCurrency: (state, action) => {
      state.currency = action.payload
      localStorage.setItem('@currency', action.payload)
    },
    setUpdatedLanguage: (state, action) => {
      state.language = action.payload
      localStorage.setItem('@language', action.payload)
    },
    setNightMode: (state, action) => {
      state.night = action.payload,
      localStorage.setItem('@night', action.payload)
    },
    setAdditionalDetails: (state, action) => {
      state.detail = action.payload,
      localStorage.setItem('@detail', action.payload)
    },
    setShoppingCartModal: (state, action) => {
      state.shoppingCartModal = action.payload
    },
    setShoppingCarts: (state, action) => {
      state.shoppingCarts = action.payload
      localStorage.setItem('shoppingCarts', JSON.stringify(action.payload))
    },
    setMintedModal: (state, action) => {
      state.mintedModal = action.payload
    },
    setReferredCode: (state, action) => {
      state.referredCode = action.payload
      localStorage.setItem('@referredCode', action.payload)
    },
    setLoginModal: (state, action) => {
      state.loginModal = action.payload
    },
    setConnectWalletsModal: (state, action) => {
      state.connectWalletsModal = action.payload
    },
    setAddFundsModal: (state, action) => {
      state.addFundsModal = action.payload
    },
    setMyWalletModal: (state, action) => {
      state.myWalletModal = action.payload
    },
    setPurchasingResultModal: (state, action) => {
      state.purchasingResultModal = action.payload
    },
    setFirebaseToken: (state, action) => {
      state.firebaseToken = action.payload
      localStorage.setItem('@firebaseToken', action.payload)
    }
  },
})

export const {
  loginSuccess,
  logoutSuccess,
  setUpdatedUser,
  setUpdatedCurrency,
  setUpdatedLanguage,
  setNightMode,
  setAdditionalDetails,
  setShoppingCartModal,
  setShoppingCarts,
  setMintedModal,
  setReferredCode,
  setLoginModal,
  setConnectWalletsModal,
  setAddFundsModal,
  setMyWalletModal,
  setPurchasingResultModal,
  setFirebaseToken,
} = userSlice.actions

export default userSlice.reducer
