import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    // uri: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange',
    uri: 'https://graphql.aiswap.com/subgraphs/name/davekaj/uniswap',
  }),
  cache: new InMemoryCache(),
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/index-node/graphql',
  }),
  cache: new InMemoryCache(),
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    // uri: 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks',
    // uri: 'https://api1.ccian.cc/subgraphs/name/davekaj/blocks',
    // uri: 'http://13.229.243.85:8000/subgraphs/name/oktest/blocks',
    uri: 'https://graphql.aiswap.com/subgraphs/name/blocklytics/ethereum-blocks',
  }),
  cache: new InMemoryCache(),
})