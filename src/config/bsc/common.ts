import { AppConfig } from 'config/types';
import IconBSCLogo from 'assets/logos/bsclogo.svg'; // You'll need to add this logo

const addresses = {
  BNB: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // Native BNB
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // Wrapped BNB
  USDT: '0x55d398326f99059fF775485246999027B3197955',
  USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  WETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  BTCB: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  ZERO: '0x0000000000000000000000000000000000000000',
  LINK: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
  UNI: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
  AAVE: '0xfb6115445bff7b52feb98650c87f44907e58f802',
  COMP: '0x52ce071bd9b1c4b00a0b92d298c512478cad67e8',
  SUSHI: '0x947950bcc74888a40ffa2593c5798f11fc9124c4',
  USD1: '0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d',
};

const popularTokens = [
  addresses.BNB,
  addresses.WBNB,
  addresses.USDT,
  addresses.USDC,
  addresses.WETH,
  addresses.BTCB,
  addresses.LINK,
  addresses.UNI,
  addresses.AAVE,
  addresses.COMP,
  addresses.SUSHI,
  addresses.USD1,
];

export const commonConfig: AppConfig = {
  mode: 'development',
  appName: 'BSC - DNA DeFi',
  appUrl: 'https://carbon-app-4qox9.ondigitalocean.app',
  carbonApi: 'https://159.65.50.90.sslip.io/v1/',
  selectedConnectors: ['MetaMask', 'Coinbase Wallet', 'Safe'],
  blockedConnectors: ['Tailwind', 'Compass Wallet', 'Seif'],
  walletConnectProjectId: 'YOUR_WALLET_CONNECT_PROJECT_ID', // Add your project ID
  policiesLastUpdated: '27 Sep, 2025',
  externalLinks: {
    duneDashboard:
      'https://dune.com/dnatrading/dnax/b8b91a92-88fd-48fc-bde3-f3791b084e68',
  },
  network: {
    name: 'BNB Smart Chain Mainnet',
    logoUrl: IconBSCLogo,
    chainId: 56, // BSC Mainnet chain ID
    blockExplorer: {
      name: 'BscScan',
      url: 'https://bscscan.com',
    },
    rpc: {
      url: 'https://bsc-dataseed1.defibit.io',
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
    [addresses.WETH, addresses.USDT],
    [addresses.WETH, addresses.USDC],
    [addresses.BTCB, addresses.USDT],
    [addresses.BTCB, addresses.USDC],
    [addresses.LINK, addresses.USDT],
    [addresses.LINK, addresses.USDC],
    [addresses.UNI, addresses.USDT],
    [addresses.UNI, addresses.USDC],
    [addresses.AAVE, addresses.USDT],
    [addresses.AAVE, addresses.USDC],
    [addresses.COMP, addresses.USDT],
    [addresses.COMP, addresses.USDC],
    [addresses.SUSHI, addresses.USDT],
    [addresses.SUSHI, addresses.USDC],
    [addresses.USD1, addresses.USDT],
    [addresses.USD1, addresses.USDC],
    [addresses.USDT, addresses.USDC],
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
    priceChart: 'native',
    useGradientBranding: false,
    tradeCount: true,
    currencyMenu: true,
    showTerms: false,
    showPrivacy: false,
    showCart: false, // Set to true if batcher is deployed
  },
};
