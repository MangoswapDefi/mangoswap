import { WETH } from '@mangoswap-libs/sdk'

// Pools tokens
const tokens = {
  okt: {
    symbol: 'OKT',
    address: {
      56: '',
      65: WETH[65].address,
      66: WETH[66].address,
    },
    decimals: 18,
    projectLink: '',
  },
  okb: {
    symbol: 'OKB',
    address: {
      56: '',
      65: '0xDa9d14072Ef2262c64240Da3A93fea2279253611',
    },
    decimals: 18,
    projectLink: '',
  },
  mgs: {
    symbol: 'MGS',
    address: {
      65: '',
      66: '0x2B00651d5E77f7178f14dc0dF3083bB8003F03F0',
    },
    decimals: 18,
    projectLink: '',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      65: '',
      66: '0x4bDccd988994816163dF2bC48A34244e6e5315EC',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
  },
  // TODO   contract?.methods?.balanc
  // src\state\hooks.ts
  kns: {
    symbol: 'KNS',
    address: {
      65: '0x14d768a9fC75A089Fe97A0aC9b0e26D9865c36D8',
      66: '0x2B00651d5E77f7178f14dc0dF3083bB8003F03F0',
      56: '',
    },
    decimals: 18,
    projectLink: '',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      65: '0x3e33590013B24bf21D4cCca3a965eA10e570D5B2',
      56: '',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
  },
  usdk: {
    symbol: 'USDK',
    address: {
      65: '0x533367b864D9b9AA59D0DCB6554DF0C89feEF1fF',
      56: '',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
  },
  btck: {
    symbol: 'BTCK',
    address: {
      65: '0x09973e7e3914EB5BA69C7c025F30ab9446e3e4e0',
      56: '',
    },
    decimals: 18,
    projectLink: '',
  },
  ethk: {
    symbol: 'ETHK',
    address: {
      65: '0xDF950cEcF33E64176ada5dD733E170a56d11478E',
      56: '',
    },
    decimals: 18,
    projectLink: '',
  },
  dotk: {
    symbol: 'DOTK',
    address: {
      65: '0x72f8fa5da80dc6e20e00d02724cf05ebd302c35f',
      56: '',
    },
    decimals: 18,
    projectLink: '',
  },
  filk: {
    symbol: 'FILK',
    address: {
      65: '0xf6a0Dc1fD1d2c0122ab075d7ef93aD79F02CcB93',
      56: '',
    },
    decimals: 18,
    projectLink: '',
  },
  ltck: {
    symbol: 'LTCK',
    address: {
      65: '0xd616388f6533B6f1c31968a305FbEE1727F55850',
      56: '',
    },
    decimals: 18,
    projectLink: '',
  },
  wokt: {
    symbol: 'WOKT',
    address: {
      65: '0x70c1c53E991F31981d592C2d865383AC0d212225',
      56: '',
    },
    decimals: 18,
    projectLink: '',
  },
  cake: {
    symbol: 'CAKE',
    address: {
      65: '0x70c1c53E991F31981d592C2d865383AC0d212225',
      56: '',
    },
    decimals: 18,
    projectLink: '',
  },
}

export default tokens
