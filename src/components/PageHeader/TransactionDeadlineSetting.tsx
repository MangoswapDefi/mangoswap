import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Text, Flex, Box } from 'uikit'
import { useUserDeadline } from 'state/user/hooks'
import useIntl from 'hooks/useIntl'
import QuestionHelper from '../QuestionHelper'

const Field = styled.div`
  align-items: center;
  display: inline-flex;

  & > ${Input} {
    max-width: 100px;
  }
`

type TransactionDeadlineSettingModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const TransactionDeadlineSetting = ({ translateString }: TransactionDeadlineSettingModalProps) => {
  const [deadline, setDeadline] = useUserDeadline()
  const [value, setValue] = useState(deadline / 60) // deadline in minutes
  const [error, setError] = useState<string | null>(null)
  const intl = useIntl()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue)
        setError(null)
      } else {
        setError('swap.transactionDeadlineNotInput')
      }
    } catch {
      setError('swap.transactionDeadlineNotInput')
    }
  }, [value, setError, setDeadline, translateString])

  return (
    <Box mb="16px">
      <Flex alignItems="center" mb="8px">
        <Text bold>{intl('swap.transactionDeadline')}</Text>
        <QuestionHelper
          text={intl('swap.transactionDeadlineHint')}
        />
      </Flex>
      <Field>
        <Input type="number" step="1" min="1" value={value} onChange={handleChange} style={{backgroundColor: '#F2F2F2', height: '38px'}} />
        <Text fontSize="14px" ml="8px">
          {intl('swap.minutes')}
        </Text>
      </Field>
      {error && (
        <Text mt="8px" color="failure">
          {intl(error)}
        </Text>
      )}
    </Box>
  )
}

export default TransactionDeadlineSetting
