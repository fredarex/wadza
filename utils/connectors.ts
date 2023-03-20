import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { BscConnector } from '@binance-chain/bsc-connector'

const POLLING_INTERVAL = 12000

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.NEXT_PUBLIC_RPC_URL_1 as string,
  5: process.env.NEXT_PUBLIC_RPC_URL_5 as string,
}

export const trustwallet = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: 1,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

export const coinbaseWallet = new WalletLinkConnector({
  url: process.env.NEXT_PUBLIC_RPC_URL_5 as string,
  appName: 'Wadza coinbase wallet connect',
  supportedChainIds: [1, 3, 4, 5, 42],
})

export const bscWallet = new BscConnector({
  supportedChainIds: [56, 97],
})
