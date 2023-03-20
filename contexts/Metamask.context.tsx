import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useSwitch from './../hooks/useSwitch'
import useForceUpdate from './../hooks/useForceUpdate'
import usePersistentToast from './../hooks/usePersistentToast'
import Web3 from '../helpers/web3'
import { allowedChains, EthNetworkIDs } from './../config'
import { IAllowedChainConfig, IContextProviderProps, IMetamaskContextValue } from '../types/types'
import { ethers } from 'ethers'

declare var window: any

const metamaskCtxDefaultValue: IMetamaskContextValue = {
  account: '',
  chain: allowedChains[0],
  disconnect: () => {},
  connect: () => {},
  isConnectedToAllowedNetwork: async () => false,
  handleTransactionError: (err: any) => {},
  signMessage: async (message: string) => {},
  verifyMessage: async (data: any) => false,
  refresh: {
    rerender: () => {},
    triggerValue: 0,
  },
}
const MetamaskContext = createContext(metamaskCtxDefaultValue)

let chainId: number

const MetamaskProvider = (props: IContextProviderProps) => {
  const { children } = props
  const forceUpdate = useForceUpdate()
  const [account, setAccount] = useState<string>('')
  const [chain, setChain] = useState<IAllowedChainConfig | undefined>(allowedChains[0])

  const isTransactionErrorModalOpen = useSwitch()
  const [transactionErrorMessage, setTransactionErrorMessage] = useState<string>('')
  const [isAllowedNetworkNotConnected, setIsAllowedNetworkNotConnected] = useState<boolean>(false)

  const persistentWeb3BrowserToast = usePersistentToast(
    'Ensure you are using a Web3 enabled browser',
    'error',
  )

  const isConnectedToAllowedNetwork = async () => {
    chainId = parseInt(
      await window.ethereum?.request({ method: 'eth_chainId' }),
    )

    return !(
      allowedChains.length > 0 &&
      !allowedChains.find((chain) => chain.id === chainId)
    )
  }

  const connect = async () => {
    if (!Web3.isEnabled())
      // return persistentWeb3BrowserToast.trigger()
      return window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en', '_blank')

    try {
      const isConnectedToAllowedChain = await isConnectedToAllowedNetwork()
      if (!isConnectedToAllowedChain) {
        try {
          if (!EthNetworkIDs.includes(allowedChains[0].id)) {
            await window.ethereum?.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: allowedChains[0].hex,
                  rpcUrls: [allowedChains[0].rpcUrl],
                  chainName: allowedChains[0].name,
                  blockExplorerUrls: [allowedChains[0].blockExplorerUrl],
                  nativeCurrency: {
                    name: allowedChains[0].nativeCurrency.name,
                    symbol: allowedChains[0].nativeCurrency.symbol,
                    decimals: allowedChains[0].nativeCurrency.decimals,
                  },
                },
              ],
            })
          }
          await window.ethereum?.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: allowedChains[0].hex }],
          })
        } catch (err: any) {
          handleTransactionError(err)
          return ''
        }
      }
      setChain(allowedChains.find((chain) => chain.id === chainId))
      const accounts = await window.ethereum?.request({
        method: 'eth_requestAccounts',
      })
      setAccount(accounts[0])
      return accounts[0]
    } catch (e: any) {
      switch (e.code) {
        case 4001:
          toast.info('Please connect to Metamask')
          break
        case -32002:
          toast.info('Please open Metamask')
          break
      }
    }
  }

  const disconnect = () => {
    setAccount('')
    forceUpdate.rerender()
  }

  const refresh = async () => {
    forceUpdate.rerender()
    if (await isConnectedToAllowedNetwork())
      return setIsAllowedNetworkNotConnected(false)

    setIsAllowedNetworkNotConnected(true)
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: allowedChains[0].hex }], // chainId must be in hexadecimal numbers
    })
  }

  const handleTransactionError = (err: any) => {
    const fallbackMessage = `Something went wrong. Please check the transaction in the explorer.`
    switch (err.code) {
      case 4001:
        toast.error('Transaction was rejected by the user.')
        return

      default:
        if (err.message) {
          try {
            const substring = err.message.substring(
              err.message.indexOf('{'),
              err.message.lastIndexOf('}') + 1,
            )
            const errorObject = JSON.parse(substring)
            const errorMessage =
              errorObject.originalError?.message || errorObject.value?.message
            return toast.error(
              errorMessage.charAt(0).toUpperCase() +
                errorMessage.substr(1, errorMessage.length - 1),
            )
          } catch (error) {
            setTransactionErrorMessage(err.message)
            isTransactionErrorModalOpen.true()
          }
        } else {
          toast.error(fallbackMessage)
          return
        }
    }
  }

  const signMessage = async (message: string) => {
    if (!window.ethereum)
      throw new Error('No metamask wallet found. Please install it.')
    
    await window.ethereum.send('eth_requestAccounts')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signature = await signer.signMessage(message)
    const walletAddress = await signer.getAddress()

    setAccount(walletAddress)

    return {
      message,
      signature,
      walletAddress,
    }
  }

  const verifyMessage = async (message: string, address: string, signature: string) => {
    try {
      const signerAddress = await ethers.utils.verifyMessage(message, signature)
      if (signerAddress !== address) {
        return false
      }

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  useEffect(() => {
    const init = async () => {
      if (!Web3.isEnabled()) return persistentWeb3BrowserToast.trigger()

      window?.ethereum.on('chainChanged', refresh)
      window?.ethereum.on('accountsChanged', (accounts: string[]) =>
        setAccount(accounts[0] || ''),
      )
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    account,
    chain,
    connect,
    disconnect,
    isConnectedToAllowedNetwork,
    handleTransactionError,
    signMessage,
    verifyMessage,
    refresh: { rerender: refresh, triggerValue: forceUpdate.triggerValue },
  }

  return (
    <>
      <MetamaskContext.Provider value={value}>
        {children}
      </MetamaskContext.Provider>
    </>
  )
}

export const useMetamask = () => useContext(MetamaskContext)
export default MetamaskProvider
