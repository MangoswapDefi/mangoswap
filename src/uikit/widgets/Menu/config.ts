import { LinkStatus } from './types'

export const status = {
  LIVE: <LinkStatus>{
    text: 'LIVE',
    color: 'failure',
  },
  SOON: <LinkStatus>{
    text: 'SOON',
    color: 'warning',
  },
  NEW: <LinkStatus>{
    text: 'NEW',
    color: 'success',
  },
}

export const links = [
  {
    label: 'HeadMine',
    icon: '',
    href: '/headmine',
  },
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.mangoswap.finance',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.mangoswap.finance/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
    status: status.LIVE,
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/syrup',
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
  },
  {
    label: 'NFT',
    icon: 'NftIcon',
    href: '/nft',
  },
  {
    label: 'Team Battle',
    icon: 'TeamBattleIcon',
    href: '/competition',
    status: status.SOON,
  },
  {
    label: 'Profile & Teams',
    icon: 'GroupsIcon',
    status: status.LIVE,
    items: [
      {
        label: 'Leaderboard',
        href: '/teams',
        status: status.NEW,
      },
      {
        label: 'YourProfile',
        href: '/',
      },
    ],
    calloutClass: 'rainbow',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://mangoswap.info',
      },
      {
        label: 'Tokens',
        href: 'https://mangoswap.info/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://mangoswap.info/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://mangoswap.info/accounts',
      },
    ],
  },
  {
    label: 'IFO',
    icon: 'IfoIcon',
    items: [
      {
        label: 'Next',
        href: '/ifo',
      },
      {
        label: 'History',
        href: '/ifo/history',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Voting',
        href: 'https://voting.mangoswap.finance',
      },
      {
        label: 'Github',
        href: 'https://github.com/mangoswap',
      },
      {
        label: 'Docs',
        href: 'https://docs.mangoswap.finance',
      },
      {
        label: 'Blog',
        href: 'https://mangoswap.medium.com',
      },
    ],
  },
]
interface SocialsType {
  label: string
  icon: string
  href?: string
  items?: SocialsType[]
}
export const socials: SocialsType[] = [
  // {
  //   label: 'Telegram',
  //   icon: 'TelegramIcon',
  //   href: 'https://t.me/mangoswap',
  //   // items: [
  //   //   {
  //   //     label: "English",
  //   //     href: "https://t.me/mangoswap",
  //   //   },
  //   //   {
  //   //     label: "Bahasa Indonesia",
  //   //     href: "https://t.me/PancakeSwapIndonesia",
  //   //   },
  //   //   {
  //   //     label: "中文",
  //   //     href: "https://t.me/PancakeSwap_CN",
  //   //   },
  //   //   {
  //   //     label: "Tiếng Việt",
  //   //     href: "https://t.me/PancakeSwapVN",
  //   //   },
  //   //   {
  //   //     label: "Italiano",
  //   //     href: "https://t.me/mangoswap_ita",
  //   //   },
  //   //   {
  //   //     label: "русский",
  //   //     href: "https://t.me/mangoswap_ru",
  //   //   },
  //   //   {
  //   //     label: "Türkiye",
  //   //     href: "https://t.me/mangoswapturkiye",
  //   //   },
  //   //   {
  //   //     label: "Português",
  //   //     href: "https://t.me/PancakeSwapPortuguese",
  //   //   },
  //   //   {
  //   //     label: "Español",
  //   //     href: "https://t.me/PancakeswapEs",
  //   //   },
  //   //   {
  //   //     label: "日本語",
  //   //     href: "https://t.me/mangoswapjp",
  //   //   },
  //   //   {
  //   //     label: "Français",
  //   //     href: "https://t.me/mangoswapfr",
  //   //   },
  //   //   {
  //   //     label: "Announcements",
  //   //     href: "https://t.me/PancakeSwapAnn",
  //   //   },
  //   //   {
  //   //     label: "Whale Alert",
  //   //     href: "https://t.me/PancakeSwapWhales",
  //   //   },
  //   // ],
  // },
  // {
  //   label: 'Twitter',
  //   icon: 'TwitterIcon',
  //   href: 'https://twitter.com/mangoswap',
  // },
]

export const MENU_HEIGHT = 64
export const MENU_ENTRY_HEIGHT = 48
export const SIDEBAR_WIDTH_FULL = 230
export const SIDEBAR_WIDTH_REDUCED = 56
export const MENUOPACITY = 0.8
export const MENU_ICONSIZE = 27
export const NOT_MENU_LIST = []
export const NOT_ALL_MENU_LIST = []
