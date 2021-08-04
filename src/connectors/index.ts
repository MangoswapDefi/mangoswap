// import { ConnectorNames } from 'uikit'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { NetworkConnector } from './NetworkConnector'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '66')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary (): Web3Provider {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [66, 65],
})

export const bscConnector = new BscConnector({ supportedChainIds: [66, 65] })

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
})

const ConnectorNames = {
  Injected: "injected",
  WalletConnect: "walletconnect",
  BSC: "bsc"
}

export const connectorsByName: { [connectorName: string]: any } = {
  [ConnectorNames?.Injected]: injected,
  [ConnectorNames?.WalletConnect]: walletconnect,
  [ConnectorNames?.BSC]: bscConnector
}

// TODO  chainId 没连接钱包获取不到
export const ConnectToChain = async (chainId: number, isFirst = false) => {
  const {ethereum} = window as any;

  if (typeof ethereum === "undefined") {
    console.log("MetaMask is not installed!")
  }
  if (isFirst === false && (chainId === 65 || chainId === 66)) {
    return
  }

  const ChainInfo = [
    {
      chainId: `0x${NETWORK_CHAIN_ID.toString(16)}`,
      chainName: NETWORK_CHAIN_ID === 65 ? "OKT Test Chain" : "OKT Chain Mainnet",
      nativeCurrency: {
        name: "OKT",
        symbol: "OKT",
        decimals: 18,
      },
      rpcUrls: [NETWORK_CHAIN_ID === 65 ? 'https://exchaintestrpc.okex.org' : 'https://exchainrpc.okex.org'],
      blockExplorerUrls: [NETWORK_CHAIN_ID === 65 ? 'https://www.oklink.com/okexchain/' : 'https://www.oklink.com/okexchain'],
    },
  ]

  console.log(ChainInfo)
  const result = await ethereum?.request({ method: 'wallet_addEthereumChain', params: ChainInfo })
  // window.location.reload()

  if (result) {
    console.log(result)
  }
}