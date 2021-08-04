import { ChainId, WETH } from '@mangoswap-libs/sdk'
import { useEffect, useState } from 'react'

type ApiResponse = {
  updated_at: string
  data: {
    [key: string]: {
      name: string
      symbol: string
      price: string
      // price_BNB: string
      price_OKT: string
    }
  }
}

const api = 'https://api.pancakeswap.info/api/tokens'
// const api = `https://static.kswap.finance/tokenlist/kswap-hosted-list.json`

const useGetPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const res: ApiResponse = await response.json()

        res.data[WETH[ChainId.MAINNET].address] = {
          name: 'OKT',
          symbol: '$RICH',
          price: 'price_OKT',
          price_OKT: '0.000001279153502953552281345982059418514',
          // price_BNB: '0.000001279153502953552281345982059418514'
        }
        // console.log('--useGetPriceData--', res)

        setData(res)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetPriceData
