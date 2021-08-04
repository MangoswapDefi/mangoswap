---
---

## --------CINFIG---------

# Okt Network/chainID Config

- SDK
  `src\constants.ts`
- MangoswapInterface
  `**/tokens/index.ts`
  `/.env.development`
  `/.env.production`
  `src\constants\multicall\index.ts --> MULTICALL_NETWORKS`
  `src\connectors\index.ts` ---> supportedChainIds

# Mangoswap interface Config

- .env.development
- .env.production

# Contract Address Config

## Swap Base Contract Address

- INIT_CODE_HASH
  `sdk: src\constants.ts`
- FACTORY_ADDRESS
  `sdk: src\constants.ts`

- ROUTER_ADDRESS
  `swap interface src\constants\index.ts`

- WOKT
  SDK: src\entities\token.ts
  src\utils\tokenList.json
  src\constants\token\Mangoswap.json

## Mangoswap interface Pages config

- Pools
  Token Address：`src/config/constants/tokens` (Publisher: William Liu)
  Contract Address `src/config/constants/contracts` (Publisher: William Liu)
- Farms
  Token Address：`src/config/constants/farmTokens.ts` (Publisher: Winless)
  LP Address `src/config/constants/farms` (Publisher: Winless)
  Contract Address `src/config/constants/contracts` (Publisher: William Liu)
- Ifo
  Lp and Contract Address `src\config\constants\ifo.ts`
- Trade(Swap)
  Token Address：`src\constants\token\mangoswap.json` (Publisher: Daniel)
  Contract Address: ``

- PreMiner
  Contract Address `src/config/constants/contracts` (Publisher: William Liu)
  Token Address：`src/config/constants/tokens` (Publisher: William Liu)

# 注：

farm OKB 和其他地方的不一样，暂时无法统一，所以 farm 的 token 单独一个文件；
mangoswap.json 放的是默认的代币列表，所以和上面其他的也不一样；

WOKT 被引用的地方：
src\config\constants\tokens.ts;
src\constants\index.ts;
src\constants\multicall\index.ts;
src\hooks\useGetPriceData.ts;

工厂合约：0x699dD15397fE19d946f44B12DD4767a49a7d73c6
路由合约：0xFe66B0B4237D1804393C0390c1f09257d6Cb3795
wokt：0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15
initcode：4dc202e7102add782883956e91a59c07bb328b95aec453c5c484ecbc49f225bf
farms lp 池 0x9aF356e9B40A1732e88fc43baB0E864dB61Ec1BA  
USDT-MGS 0xBBdEd711b4Fe8068Aa33285A91B44E092D1E0c81
pool 单币池 0x4D4D900ca38236C0133b80c7ad2f9006cD027428 目前只添加 usdt
MGStoken 0x2B00651d5E77f7178f14dc0dF3083bB8003F03F0
USDT 代币 0x4bDccd988994816163dF2bC48A34244e6e5315EC
USDC 代币 0x51FEf093EDA4f628DB2b84ca4377dC5fe048A799
