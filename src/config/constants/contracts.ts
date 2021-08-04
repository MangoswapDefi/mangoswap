import { MULTICALL_NETWORKS } from 'constants/multicall'
import { getAddress } from 'utils/addressHelpers'

const address = {
  multiCall: MULTICALL_NETWORKS,

  oktHeadMine: {
    // pool
    65: '0x862f9fa6060c739ceccd1ea0f2c28290cae4e0c7',
    56: '',
  },
  okbHeadMine: {
    // pool
    65: '0xfA27d13427C6175dE45Fc3fF81a4D5eb561E7774',
    56: '',
  },
  // USTD 单币池 2021/08
  KNSPOOL: {
    65: '0x2993912F49F6E7267d454D525F2Ab2919077d788',
    // TODO
    66: '0x4D4D900ca38236C0133b80c7ad2f9006cD027428',
  },

  // farm
  masterChef: {
    65: '0xfFc163527cbb3B5cE03afc81fa9E3b2145F7Bc6F',
    66: '0x9aF356e9B40A1732e88fc43baB0E864dB61Ec1BA',
    56: '',
  },
  pointCenterIfo: {
    56: '',
    65: '0x14310fee9400db6b6b0e791ff5e43488bf3dee66',
  },

  /** OKT 测试网合约地址 Farms */
  oktChef: {
    65: '0xfFc163527cbb3B5cE03afc81fa9E3b2145F7Bc6F',
    66: '0x9aF356e9B40A1732e88fc43baB0E864dB61Ec1BA',
    56: '',
  },
}
export const KNS_ADDRESS = () => ({
  OKT: getAddress(address.oktHeadMine),
  OKB: getAddress(address.okbHeadMine),
})
export default address
