import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from 'uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import { HEAD_NAV_HEIGHT } from 'utils/config'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  font-size: 12px;
  border-radius: 10px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  tokenSymbol,
}) => {
  const leftImage = farmImage.split('-')[0].toUpperCase();
  const rightImage = farmImage.split('-')[1].toUpperCase();
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <div style={{ width: `${HEAD_NAV_HEIGHT}px`, height: `${HEAD_NAV_HEIGHT}px`, display: 'flex', position: 'relative' }}>
        <Image src={`/images/farms/${leftImage}.svg`} alt={leftImage} width={32} height={32} />
        <div style={{ position: 'absolute', right: '10px', bottom: '20px', height: '32px', width: '32px' }}>
          <Image src={`/images/farms/${rightImage}.svg`} alt={rightImage} width={32} height={32} />
        </div>

      </div>
      {/* <Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={64} height={64} /> */}
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag variant="primary">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
