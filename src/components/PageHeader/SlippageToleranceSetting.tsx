import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Flex, Input, Text } from 'uikit'
import { useUserSlippageTolerance } from 'state/user/hooks'
import useIntl from 'hooks/useIntl'
import QuestionHelper from '../QuestionHelper'

const MAX_SLIPPAGE = 5000
const RISKY_SLIPPAGE_LOW = 50
const RISKY_SLIPPAGE_HIGH = 500

const Option = styled.div`
  padding: 0 4px;
`

const Options = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  ${Option}:first-child {
    padding-left: 0;
  }

  ${Option}:last-child {
    padding-right: 0;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const predefinedValues = [
  { label: '0.1%', value: 0.1 },
  { label: '0.5%', value: 0.5 },
  { label: '1%', value: 1 },
]

type SlippageToleranceSettingsModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const SlippageToleranceSettings = ({ translateString }: SlippageToleranceSettingsModalProps) => {
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [value, setValue] = useState(userSlippageTolerance / 100)
  const [error, setError] = useState<string | null>(null)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseFloat(inputValue))
  }
  const intl = useIntl()

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 100
      if (!Number.isNaN(rawValue) && rawValue > 0 && rawValue < MAX_SLIPPAGE) {
        setUserslippageTolerance(rawValue)
        setError(null)
      } else {
        setError('swap.slippageToleranceNotInput')
      }
    } catch {
      setError('swap.slippageToleranceNotInput')
    }
  }, [value, setError, setUserslippageTolerance, translateString])

  // Notify user if slippage is risky
  useEffect(() => {
    if (userSlippageTolerance < RISKY_SLIPPAGE_LOW) {
      setError('swap.slippageToleranceZero1')
    } else if (userSlippageTolerance > RISKY_SLIPPAGE_HIGH) {
      setError('swap.slippageToleranceError')
    }
  }, [userSlippageTolerance, setError, translateString])

  return (
    <Box mb="16px">
      <Flex alignItems="center" mb="8px">
        <Text bold>{intl('swap.slippageTolerance', 'Slippage tolerance')}</Text>
        <QuestionHelper
          text={intl(
            'swap.slippageHint',
            'Your transaction will revert if the price changes unfavorably by more than this percentage.'
          )}
        />
      </Flex>
      <Options>
        <Flex mb={['8px', '8px', 0]} mr={[0, 0, '8px']}>
          {predefinedValues.map(({ label, value: predefinedValue }) => {
            const handleClick = () => setValue(predefinedValue)

            return (
              <Option key={predefinedValue}>
                <Button variant={value === predefinedValue ? 'primary' : 'tertiary'} onClick={handleClick} style={{height: '38px'}}>
                  {label}
                </Button>
              </Option>
            )
          })}
        </Flex>
        <Flex alignItems="center">
          <Option>
            <Input
              type="number"
              scale="lg"
              step={0.1}
              min={0.1}
              placeholder="5%"
              value={value}
              onChange={handleChange}
              isWarning={error !== null}
              style={{backgroundColor: '#F2F2F2', height: '38px'}}
            />
          </Option>
          <Option>
            <Text fontSize="18px">%</Text>
          </Option>
        </Flex>
      </Options>
      {error && (
        <Text mt="8px" color="failure">
          {intl(error)}
        </Text>
      )}
    </Box>
  )
}

export default SlippageToleranceSettings
