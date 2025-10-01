import { AppConfig } from 'config/types';
import IconBSCLogo from 'assets/logos/bsclogo.svg'; // You'll need to add this logo

const addresses = {
  BNB: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // Native BNB
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // Wrapped BNB
  USDT: '0x55d398326f99059fF775485246999027B3197955',
  USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  BTCB: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  ZERO: '0x0000000000000000000000000000000000000000',
};

const popularTokens = [
  addresses.BNB,
  addresses.WBNB,
  addresses.USDT,
  addresses.USDC,
  addresses.ETH,
  addresses.BTCB,
];

export const commonConfig: AppConfig = {
  mode: 'development',
  appName: 'BSC - Carbon DeFi',
  appUrl: 'https://carbon-app-4qox9.ondigitalocean.app',
  carbonApi: 'https://159.65.50.90.sslip.io/v1/',
  selectedConnectors: ['MetaMask', 'WalletConnect', 'Coinbase Wallet', 'Safe'],
  blockedConnectors: ['Tailwind', 'Compass Wallet', 'Seif'],
  walletConnectProjectId: 'YOUR_WALLET_CONNECT_PROJECT_ID', // Add your project ID
  policiesLastUpdated: '27 Sep, 2025',
  network: {
    name: 'BSC',
    logoUrl: IconBSCLogo,
    chainId: 56, // BSC Mainnet chain ID
    blockExplorer: {
      name: 'BscScan',
      url: 'https://bscscan.com',
    },
    rpc: {
      url:
        import.meta.env.VITE_CHAIN_RPC_URL ??
        'https://bsc-dataseed.binance.org/',
      headers: {},
    },
    defaultLimitedApproval: true,
    gasToken: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
      address: addresses.BNB,
      logoURI:
        'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    },
  },
  sdk: {
    cacheTTL: 0,
    pairBatchSize: 100,
    blockRangeSize: 5000,
    refreshInterval: 30000,
  },
  defaultTokenPair: [addresses.BNB, addresses.USDT],
  popularPairs: [
    [addresses.BNB, addresses.USDT],
    [addresses.BNB, addresses.USDC],
    [addresses.WBNB, addresses.USDT],
    [addresses.WBNB, addresses.USDC],
    [addresses.ETH, addresses.USDT],
    [addresses.BTCB, addresses.USDT],
  ],
  popularTokens: {
    base: popularTokens,
    quote: popularTokens,
  },
  addresses: {
    tokens: addresses,
    carbon: {
      carbonController: '0xafc43faE32302D725fC4d448525c44c522a9a1B9',
      voucher: '0x94A62c18786Bc7e808a26285602296E438FF4B5c',
      batcher: '0xEa9dFe485a700229068D9419488103f6ee95f48B',
    },
  },
  utils: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 15921452,
    },
  },
  tokenListOverride: [
    {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
      address: addresses.BNB,
      logoURI:
        'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    },
    {
      name: 'Wrapped BNB',
      symbol: 'WBNB',
      decimals: 18,
      address: addresses.WBNB,
      logoURI:
        'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    },
  ],
  tokenLists: [
    {
      uri: 'https://tokens.coingecko.com/binance-smart-chain/all.json',
    },
  ],
  tenderly: {
    faucetTokens: [
      {
        decimals: 18,
        tokenContract: addresses.WBNB,
        donorAccount: '0x0000000000000000000000000000000000001234', // Example donor
        symbol: 'WBNB',
      },
      {
        decimals: 18,
        tokenContract: addresses.USDT,
        donorAccount: '0x0000000000000000000000000000000000001234',
        symbol: 'USDT',
      },
    ],
  },
  ui: {
    showSimulator: true,
    priceChart: 'tradingView',
    useGradientBranding: false,
    tradeCount: true,
    currencyMenu: true,
    showTerms: false,
    showPrivacy: false,
    showCart: false, // Set to true if batcher is deployed
  },
};
