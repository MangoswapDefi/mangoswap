import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { Text, Image } from 'uikit'
import { getBalanceNumber } from 'utils/formatBalance'

export interface FarmProps {
  label: string
  pid: number
  image: string
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
    height: 40px;
  }
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ image, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const TranslateString = useI18n()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold>
          {TranslateString(999, 'FARMING')}
        </Text>
      )
    }

    return null
  }

  const leftImage = image.split('-')[0].toUpperCase();
  const rightImage = image.split('-')[1].toUpperCase();

  return (
    <Container>
      {/* <IconImage src={`/images/farms/${image}.svg`} alt="icon" width={40} height={40} mr="8px" /> */}
      <div style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', marginRight: '5px'}}>
          <Image src={`/images/farms/${leftImage}.svg`}  width={20} height={20} />
          <Image src={`/images/farms/${rightImage}.svg`}  width={20} height={20} />
      </div>
      <div>
        {handleRenderFarming()}
        <Text bold>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
