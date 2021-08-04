import { MenuEntry } from 'uikit'

const config: MenuEntry[] = [
  // {
  //   label: 'Home',
  //   icon: 'HomeIcon',
  //   href: '/home',
  // },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    // status: {
    //   text: 'MIGRATE',
    //   color: 'warning',
    // },
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    // href: '/farms',
    href: '#',
    comming: true
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    // href: '/pools',
    href: '#',
    comming: true
  },

  {
    label: 'Info',
    icon: 'InfoIcon',
    comming: true,
    items: [
      {
        label: 'Overview',
        href: '#',
        // href: 'https://info.mangoswap.exchange',
        // target: '_blank'
      },
      {
        label: 'Tokens',
        href: '#',
        // href: 'https://info.mangoswap.exchange/tokens',
        // target: '_blank'
      },
      {
        label: 'Pairs',
        href: '#',
        // href: 'https://info.mangoswap.exchange/pairs',
        // target: '_blank'
      },
      {
        label: 'Accounts',
        href: '#',
        // href: 'https://info.mangoswap.exchange/accounts',
        // target: '_blank'
      },
    ],
  },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  // } ,
  {
    label: 'More',
    icon: 'MoreIcon',
    items:[
      {
        label: 'Github',
        href: 'https://github.com/MangoswapDefi/mangoswap', 
        target: '_blank'
      },
      {
        label: 'Twitter',
        href: 'https://twitter.com/MangoSwap_1',
        target: '_blank'
      },
      {
        label: 'Telegram',
        href: 'https://t.me/MangoSwapOfficial',
        target: '_blank'
      },
      {
        label: 'Medium',
        href: 'https://medium.com/@MangoSwap_1',
        target: '_blank'
      },
      // {
      //   label: 'Docs',
      //   href: 'https://github.com/mangoswap/swap/blob/dev/docs/KeyneSwepDocs.pdf',
      //   target: '_blank'
      // },
      // {
      //   label: 'Blog',
      //   href: 'https://github.com/mangoswap/swap',
      //   target: '_blank'
      // }
    ]
  } 
]

export default config
