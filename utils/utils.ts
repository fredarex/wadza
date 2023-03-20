import axios from 'axios'
import moment from 'moment'

/**
 * Returns the abbreviation value.
 * 
 * @param str - Any kind of value
 * @param num - Number of the targeted value's length * 
 * @returns String
 */
export const abbreviationBasic = (str: any, num: number) => {
  if (!str) return ''

  return `${String(str).substring(0, num)}`
}

/**
 * Returns the abbreviation value.
 * 
 * @param str - Any kind of value
 * @param num - Number of the targeted value's length * 
 * @returns String
 */
export const abbreviation = (str: any, num: number) => {
  if (!str) return ''

  return `${String(str).substring(0, num)}${String(str).length > num ? '...' : ''}`
}

/**
 * Returns the abbreviation value like this 0xAE01...45bD.
 * 
 * @param str - Any kind of value
 * @param num1 - Number of the targeted value's first length *
 * @param num2 - Number of the targeted value's last length * 
 * @returns String
 */
export const abbreviationFormat = (str: any, num1: number, num2: number) => {
  if (!str) return ''
  const _str = String(str)

  return `${_str.substring(0, num1)}${_str.length > num1 + num2 ? '...' : ''}${_str.substring(_str.length - num2, _str.length)}`
}

/**
 * Convert crypto's price to cash price
 * 
 * @param price any - NFT's price with symbol
 * @param ids string - id that is provided by coingecko - ex: 'ethereum', 'matic-network', etc
 * @param vsCurrency - targeted currency
 * @returns Converted price
 */
export const convertCryptoToUSD = async (price: any, ids: string = 'ethereum', vsCurrency: string = 'USD') => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrency}`,
    {
      headers: {
        'Access-Contol-Allow-Origin': '*',
      },
      withCredentials: false,
    },
  )

  return res?.data[ids]? (price * res.data[ids][vsCurrency.toLocaleLowerCase()]).toFixed(2) : ''
}

/**
 * Convert crypto's price to cash price using fastforex
 * 
 * @param price any - Price
 * @param pairs string - pairs, ex: ETH/USD
 * @returns Converted price
 */
export const convertCryptoToCash = (price: any, pairs: string = 'ETH/USD') => {
  const options = {method: 'GET', headers: {accept: 'application/json'}}

  const result = fetch(`${process.env.NEXT_PUBLIC_FASTFOREX_API_URL}/crypto/fetch-prices?pairs=${encodeURIComponent(pairs)}&api_key=${process.env.NEXT_PUBLIC_FASTFOREX_API_KEY}`, options)
    .then(response => response.json())
    .then(response => {
      return response.prices[pairs]? (Number(price) * response.prices[pairs]).toFixed(2) : ''
    })
    .catch(err => console.error(err))
  
  return result
}

/**
 * Get availabe token pairs from fastforex
 * 
 * @returns Token pairs
 */
export const getAvailablePairs = async () => {
  const pairs = await axios.get(
    `${process.env.NEXT_PUBLIC_FASTFOREX_API_URL}/crypto/pairs?api_key=${process.env.NEXT_PUBLIC_FASTFOREX_API_KEY}`,
    {
      headers: {
        'Access-Contol-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    },
  )
    .then((response) => {
      if (response?.data?.pairs) {
        return response.data.pairs
      } else {
        return {}
      }
    })

  return pairs
}

/**
 * Convert crypto's price to cash price using fastforex
 * 
 * @param price any - Price
 * @param pairs string - pairs, ex: ETH/USD
 * @returns Converted price
 */
export const getCryptoPrice = (pairs: string = 'ETH/USD') => {
  const options = {method: 'GET', headers: {accept: 'application/json'}}

  const result = fetch(`${process.env.NEXT_PUBLIC_FASTFOREX_API_URL}/crypto/fetch-prices?pairs=${encodeURIComponent(pairs)}&api_key=${process.env.NEXT_PUBLIC_FASTFOREX_API_KEY}`, options)
    .then(response => response.json())
    .then(response => {
      return response.prices[pairs] || ''
    })
    .catch(err => console.error(err))
  
  return result
}

/**
 * Convert normal date to unix timestamp
 * 
 * @param date any - Target date
 * @returns Converted unix timestamp
 */
export const convertDateToUnixTimestamp = (date: any) => {
  return Math.floor(new Date(date).getTime() / 1000)
}

/**
 * Convert BigInt to Decimal
 * 
 * @param value Number
 * @returns Converted String
 */
export const bigintToDecimal = (value: number) => {
  return (value / 10 ** 18).toFixed(4)
}

export const getPassedTime = (date: any) => {
  let _loadedTime: string = ''
  const passed = moment(new Date()).diff(date)
  if (passed > 0) {
    const diffDuration = moment.duration(passed)

    const months = diffDuration.months()
    const days = diffDuration.days()
    const hours = diffDuration.hours()
    const minutes = diffDuration.minutes()
    const seconds = diffDuration.seconds()

    if (months > 0) {
      _loadedTime = `${months} months`
    } else if (days > 0) {
      _loadedTime = `${days} days`
    } else if (hours > 0) {
      _loadedTime = `${hours} hours`
    } else if (minutes > 0) {
      _loadedTime = `${minutes} minutes`
    } else if (seconds > 0) {
      _loadedTime = `${seconds} seconds`
    }    
  }

  return `${_loadedTime} ago`
}
