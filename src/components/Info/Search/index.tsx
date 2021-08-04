import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { Search as SearchIcon, X } from 'react-feather'
import { useMedia } from 'react-use'
import useIntl from 'hooks/useIntl'
import { transparentize } from 'polished'
import { HOMEPADDING } from 'pages/Home/constant'
import { LINK_INFO_BASE_URL } from 'utils/config'
import Row, { RowFixed } from '../../Row'
// import TokenLogo from '../TokenLogo'

import { useAllTokenData, useTokenData } from '../contexts/TokenData'
import { useAllPairData, usePairData } from '../contexts/PairData'
import DoubleTokenLogo from '../../DoubleLogo'
import { useAllPairsInUniswap, useAllTokensInUniswap } from '../contexts/GlobalData'
// import { OVERVIEW_TOKEN_BLACKLIST, PAIR_BLACKLIST } from '../../../constants'

import { client } from '../../../apollo/client'
import { PAIR_SEARCH, TOKEN_SEARCH } from '../../../apollo/queries'
import FormattedName from '../FormattedName'
import { TYPE } from '../Theme'
import updateNameData from '../utils/data'

const Body = TYPE.body

const OVERVIEW_TOKEN_BLACKLIST: Array<string> = []
const PAIR_BLACKLIST = []

const BasicLink = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
  }
`


const Container = styled.div<{ small?: boolean}>`
  height: 48px;
  z-index: 30;
  position: relative;

  margin: ${HOMEPADDING};
  margin-bottom: 40px;
  /* @media screen and (max-width: 600px) {
    width: 100%;
  } */
`

  // background: ${({ theme, small, open }) => small ? (open ? transparentize(0.4, theme.bg1) : 'none') : transparentize(0.4, theme.bg6)};
  // box-shadow: ${({ open, small }) =>
  //   !open && !small
  //     ? '0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04) '
  //     : 'none'};

  // background: ${({ theme }) => transparentize(0.4, theme.bg1)};
  // box-shadow: ${({ open }) =>
  // !open
  //   ? '0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04) '
  //   : 'none'};

const Wrapper = styled.div<{ small: boolean; open: boolean; shadow?: boolean}>`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 16px;
  border-radius: 12px;
  /* background: #fff; */
  box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
  border-bottom-right-radius: ${({ open }) => (open ? '0px' : '12px')};
  border-bottom-left-radius: ${({ open }) => (open ? '0px' : '12px')};
  z-index: 9999;
  width: 100%;
  min-width: 300px;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
  }
`
const Input = styled.input<{ large: boolean; ref: any}>`
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text1};
  font-size: ${({ large }) => (large ? '20px' : '14px')};

  ::placeholder {
    color: ${({ theme }) => theme.text3};
    font-size: 16px;
  }

  @media screen and (max-width: 640px) {
    ::placeholder {
      font-size: 1rem;
    }
  }
`

const SearchIconLarge = styled(SearchIcon)`
  height: 20px;
  width: 20px;
  margin-right: 0.5rem;
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: ${({ theme }) => theme.text3};
`

const CloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  margin-right: 0.5rem;
  position: absolute;
  right: 10px;
  color: ${({ theme }) => theme.text3};
  :hover {
    cursor: pointer;
  }
`

const Menu = styled.div<{ hide: boolean; ref: any}>`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 9999;
  width: 100%;
  top: 50px;
  max-height: 540px;
  overflow: auto;
  left: 0;
  padding-bottom: 20px;
  background: ${({ theme }) => theme.bg6};
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.04);
  display: ${({ hide }) => hide && 'none'};
`

const MenuItem = styled(Row)`
  padding: 1rem;
  font-size: 0.85rem;
  & > * {
    margin-right: 6px;
  }
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.bg2};
  }
`

const Heading = styled(Row)<{hide?: boolean}>`
  padding: 1rem;
  display: ${({ hide = false }) => hide && 'none'};
`

const Gray = styled.span`
  color: #888d9b;
`

const Blue = styled.span`
  color: #2172e5;
  :hover {
    cursor: pointer;
  }
`

export const Search = ({ small = false }) => {
  let allTokens = useAllTokensInUniswap()
  const allTokenData = useAllTokenData()

  // console.log('---allTokenData', allTokenData)

  let allPairs = useAllPairsInUniswap()
  const allPairData = useAllPairData()

  const [showMenu, toggleMenu] = useState(false)
  const [value, setValue] = useState('')
  const [, toggleShadow] = useState(false)
  const [, toggleBottomShadow] = useState(false)
  const intl = useIntl()

  // fetch new data on tokens and pairs if needed
  useTokenData(value)
  usePairData(value)

  const below700 = useMedia('(max-width: 700px)')
  const below470 = useMedia('(max-width: 470px)')
  const below410 = useMedia('(max-width: 410px)')

  useEffect(() => {
    if (value !== '') {
      toggleMenu(true)
    } else {
      toggleMenu(false)
    }
  }, [value])

  const [searchedTokens, setSearchedTokens] = useState([])
  const [searchedPairs, setSearchedPairs] = useState([])

  useEffect(() => {
    async function fetchData () {
      try {
        if (value?.length > 0) {
          const tokens = await client.query({
            query: TOKEN_SEARCH,
            variables: {
              value: value ? value.toUpperCase() : '',
              id: value,
            },
          })

          const pairs = await client.query({
            query: PAIR_SEARCH,
            variables: {
              tokens: tokens.data.asSymbol?.map((t) => t.id),
              id: value,
            },
          })

          setSearchedPairs(
            (updateNameData as any)(pairs.data.as0)
              .concat(updateNameData(pairs.data.as1))
              .concat(updateNameData(pairs.data.asAddress))
          )
          const foundTokens = tokens.data.asSymbol.concat(tokens.data.asAddress).concat(tokens.data.asName)
          setSearchedTokens(foundTokens)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [value])

  function escapeRegExp (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }

  // add the searched tokens to the list if not found yet
  allTokens = allTokens.concat(
    searchedTokens.filter((searchedToken) => {
      let included = false
      // updateNameData()
      allTokens.map((token) => {
        if (token.id === searchedToken.id) {
          included = true
        }
        return true
      })
      return !included
    })
  )

  // eslint-disable-next-line
  const uniqueTokens = []
  const found = {}
  if(allTokens)
    allTokens.map((token) => {
      if (!found[token.id]) {
        found[token.id] = true
        uniqueTokens.push(token)
      }
      return true
    })

  allPairs = allPairs.concat(
    searchedPairs.filter((searchedPair) => {
      let included = false
      allPairs.map((pair) => {
        if (pair.id === searchedPair.id) {
          included = true
        }
        return true
      })
      return !included
    })
  )

  // eslint-disable-next-line
  const uniquePairs = []
  
  const pairsFound = {}
  if (allPairs)
    allPairs.map((pair) => {
      if (!pairsFound[pair.id]) {
        pairsFound[pair.id] = true
        uniquePairs.push(pair)
      }
      return true
    })

  const filteredTokenList = useMemo(() => {
    return uniqueTokens
      ? uniqueTokens
        .sort((a, b) => {
          if (OVERVIEW_TOKEN_BLACKLIST.includes(a.id)) {
            return 1
          }
          if (OVERVIEW_TOKEN_BLACKLIST.includes(b.id)) {
            return -1
          }
          const tokenA = allTokenData[a.id]
          const tokenB = allTokenData[b.id]
          if (tokenA?.oneDayVolumeUSD && tokenB?.oneDayVolumeUSD) {
            return tokenA.oneDayVolumeUSD > tokenB.oneDayVolumeUSD ? -1 : 1
          }
          if (tokenA?.oneDayVolumeUSD && !tokenB?.oneDayVolumeUSD) {
            return -1
          }
          if (!tokenA?.oneDayVolumeUSD && tokenB?.oneDayVolumeUSD) {
            return tokenA?.totalLiquidity > tokenB?.totalLiquidity ? -1 : 1
          }
          return 1
        })
        .filter((token) => {
          if (OVERVIEW_TOKEN_BLACKLIST.includes(token.id)) {
            return false
          }
          const regexMatches = Object.keys(token).map((tokenEntryKey) => {
            const isAddress = value.slice(0, 2) === '0x'
            if (tokenEntryKey === 'id' && isAddress) {
              return token[tokenEntryKey].match(new RegExp(escapeRegExp(value), 'i'))
            }
            if (tokenEntryKey === 'symbol' && !isAddress) {
              return token[tokenEntryKey].match(new RegExp(escapeRegExp(value), 'i'))
            }
            if (tokenEntryKey === 'name' && !isAddress) {
              return token[tokenEntryKey].match(new RegExp(escapeRegExp(value), 'i'))
            }
            return false
          })
          return regexMatches.some((m) => m)
        })
      : []
  }, [allTokenData, uniqueTokens, value])

  const filteredPairList = useMemo(() => {
    return uniquePairs
      ? uniquePairs
        .sort((a, b) => {
          const pairA = allPairData[a.id]
          const pairB = allPairData[b.id]
          if (pairA?.trackedReserveETH && pairB?.trackedReserveETH) {
            return parseFloat(pairA.trackedReserveETH) > parseFloat(pairB.trackedReserveETH) ? -1 : 1
          }
          if (pairA?.trackedReserveETH && !pairB?.trackedReserveETH) {
            return -1
          }
          if (!pairA?.trackedReserveETH && pairB?.trackedReserveETH) {
            return 1
          }
          return 0
        })
        .filter((pair) => {
          if (PAIR_BLACKLIST.includes(pair.id)) {
            return false
          }
          if (value && value.includes(' ')) {
            const pairA = value.split(' ')[0]?.toUpperCase()
            const pairB = value.split(' ')[1]?.toUpperCase()
            return (
              (pair.token0.symbol.includes(pairA) || pair.token0.symbol.includes(pairB)) &&
              (pair.token1.symbol.includes(pairA) || pair.token1.symbol.includes(pairB))
            )
          }
          if (value && value.includes('-')) {
            const pairA = value.split('-')[0]?.toUpperCase()
            const pairB = value.split('-')[1]?.toUpperCase()
            return (
              (pair.token0.symbol.includes(pairA) || pair.token0.symbol.includes(pairB)) &&
              (pair.token1.symbol.includes(pairA) || pair.token1.symbol.includes(pairB))
            )
          }
          const regexMatches = Object.keys(pair).map((field) => {
            const isAddress = value.slice(0, 2) === '0x'
            if (field === 'id' && isAddress) {
              return pair[field].match(new RegExp(escapeRegExp(value), 'i'))
            }
            if (field === 'token0') {
              return (
                pair[field].symbol.match(new RegExp(escapeRegExp(value), 'i')) ||
                pair[field].name.match(new RegExp(escapeRegExp(value), 'i'))
              )
            }
            if (field === 'token1') {
              return (
                pair[field].symbol.match(new RegExp(escapeRegExp(value), 'i')) ||
                pair[field].name.match(new RegExp(escapeRegExp(value), 'i'))
              )
            }
            return false
          })
          return regexMatches.some((m) => m)
        })
      : []
  }, [allPairData, uniquePairs, value])

  useEffect(() => {
    if (Object.keys(filteredTokenList).length > 2) {
      toggleShadow(true)
    } else {
      toggleShadow(false)
    }
  }, [filteredTokenList])

  useEffect(() => {
    if (Object.keys(filteredPairList).length > 2) {
      toggleBottomShadow(true)
    } else {
      toggleBottomShadow(false)
    }
  }, [filteredPairList])

  const [tokensShown, setTokensShown] = useState(3)
  const [pairsShown, setPairsShown] = useState(3)

  function onDismiss () {
    setPairsShown(3)
    setTokensShown(3)
    toggleMenu(false)
    setValue('')
  }

  // refs to detect clicks outside modal
  const wrapperRef = useRef<React.ReactElement>()
  const menuRef = useRef<React.ReactElement>()

  const handleClick = (e) => {
    if (
      !(menuRef.current && (menuRef.current as any).contains(e.target)) &&
      !(wrapperRef.current && (wrapperRef.current as any).contains(e.target))
    ) {
      setPairsShown(3)
      setTokensShown(3)
      toggleMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return (
    <Container small={small}>
      <Wrapper open={showMenu} shadow small={small}>
        <Input
          large={!small}
          type='text'
          ref={wrapperRef}
          placeholder={
            small
              ? ''
              : below410
                ? `${intl('home.Search', 'Search')}...`
                : below470
                  ? `${intl('home.SearchMangoSwap', 'Search MangoSwap')}...`
                  : below700
                    ? `${intl('home.SearchPairsAndTokens', 'Search pairs and tokens...')}`
                    : `${intl('home.SearchMangoSwapPairsAndTokens', 'Search MangoSwap pairs and tokens...')}`
          }
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onFocus={() => {
            if (!showMenu) {
              toggleMenu(true)
            }
          }}
        />
        {!showMenu ? <SearchIconLarge /> : <CloseIcon onClick={() => toggleMenu(false)} />}
      </Wrapper>
      <Menu hide={!showMenu} ref={menuRef}>
        <Heading>
          <Gray>{intl('home.pairs')}</Gray>
        </Heading>
        <div>
          {filteredPairList && Object.keys(filteredPairList).length === 0 && (
            <MenuItem>
              <Body>{intl('home.noResults')}...</Body>
            </MenuItem>
          )}
          {filteredPairList &&
            filteredPairList.slice(0, pairsShown).map((pair) => {
              // format incorrect names
              updateNameData(pair)
              return (
                <BasicLink target="_blank" href={`${LINK_INFO_BASE_URL}/pair/${pair.id}`} key={pair.id} onClick={onDismiss}>
                  <MenuItem>
                    {/* a0={pair?.token0?.id} a1={pair?.token1?.id} */}
                    <DoubleTokenLogo margin />
                    <Body style={{ marginLeft: '10px' }}>
                      {`${pair.token0.symbol}-${pair.token1.symbol}`} {intl('home.pairs')}
                    </Body>
                  </MenuItem>
                </BasicLink>
              )
            })}
          <Heading
            hide={!(Object.keys(filteredPairList).length > 3 && Object.keys(filteredPairList).length >= pairsShown)}
          >
            <Blue
              onClick={() => {
                setPairsShown(pairsShown + 5)
              }}
            >
              {intl('home.seeMore')}
            </Blue>
          </Heading>
        </div>
        <Heading>
          <Gray>{intl('home.tokens')}</Gray>
        </Heading>
        <div>
          {Object.keys(filteredTokenList).length === 0 && (
            <MenuItem>
              <Body>{intl('home.noResults')}</Body>
            </MenuItem>
          )}
          {filteredTokenList.slice(0, tokensShown).map((token) => {
            // update displayed names
            updateNameData({ token0: token })
            return (
              <BasicLink target="_blank" href={`${LINK_INFO_BASE_URL}${/token/}${token.id}`} key={token.id} onClick={onDismiss}>
                <MenuItem>
                  <RowFixed>
                    {/* <TokenLogo address={token.id} style={{ marginRight: '10px' }} /> */}
                    <div>logo</div>
                    <FormattedName text={token.name} maxCharacters={20} style={{ marginRight: '6px' }} />
                    (<FormattedName text={token.symbol} maxCharacters={6} />)
                  </RowFixed>
                </MenuItem>
              </BasicLink>
            )
          })}

          <Heading
            hide={!(Object.keys(filteredTokenList).length > 3 && Object.keys(filteredTokenList).length >= tokensShown)}
          >
            <Blue
              onClick={() => {
                setTokensShown(tokensShown + 5)
              }}
            >
              {intl('home.seeMore')}...
            </Blue>
          </Heading>
        </div>
      </Menu>
    </Container>
  )
}

export default Search
