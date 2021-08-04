import { ContentHeader, Section, Wrapper as HelperWrapper } from "components/TransactionConfirmationModal/helpers"
import React, { useState } from "react"
import Modal from 'components/Modal'
import { baseColors } from "uikit/theme/colors"
import { RowBetween } from "components/Row"
import styled from "styled-components"
import { Button, Flex, Input, Text } from "uikit"
import { calcInputRange } from "utils"

interface NumberSelectProps {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: (value: string) => void;
  titleText?: string;
  CoinType: string;
  tipsBalance: string;
  Footer?: () => JSX.Element;
}
let inputValue = ''
const NumberSelect = ({ isOpen, titleText, CoinType, tipsBalance, onDismiss, onConfirm, Footer }: NumberSelectProps) => {
  const [jsxInputValue, setJsxInputValue] = useState('')
  const confirmDisabled = calcInputRange({ value: jsxInputValue, max: tipsBalance })
  const onInputChange = (v: { target: { value: string } }) => {
    inputValue = v.target.value
    setJsxInputValue(inputValue)
  }
  const onMax = () => {
    inputValue = tipsBalance
    setJsxInputValue(inputValue)
  }
  const _onConfirm = () => {
    if (confirmDisabled) {
      return
    }
    onConfirm(inputValue)
  }
  return (<Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={200}>
    <HelperWrapper>
      <Section>
        <ContentHeader color={baseColors.title} onDismiss={onDismiss}>
          {titleText ?? `Waiting for confirmation`}
        </ContentHeader>
        <RowBetween>
          <span />
          <AvailbleText>{tipsBalance} {CoinType} Availble</AvailbleText>
        </RowBetween>
        <PriceInputRow className="flex flex-center-y">
          <RowBetween>
            <Input placeholder="input" value={jsxInputValue} onChange={onInputChange} />
            <Flex>
              <RightMaxHandle className="flex flex-center-y">
                <Text>{CoinType}</Text>
                <Button onClick={onMax} size="sm">MAX</Button>
              </RightMaxHandle>
            </Flex>
          </RowBetween>
        </PriceInputRow>
        <Flex>
          <RowBetween>
            <Button variant="secondary" onClick={onDismiss}>Cancel</Button>
            <Button disabled={confirmDisabled} width={250} variant="gradual" type="submit" onClick={_onConfirm}>Confirm</Button>
          </RowBetween>
        </Flex>
        {Footer && <Footer />}
      </Section>
    </HelperWrapper>
  </Modal>)
}
export default NumberSelect


const AvailbleText = styled.span`
  color: ${({ theme }) => theme.colors.unimportant};
  font-size: 12px;
  margin-top: 30px;
`


const Info = styled.div`
  margin-top: 20px;
`
const RightMaxHandle = styled.div`
  margin-left: 20px;
  white-space: nowrap;
  button {
    zoom: 0.7;
    margin-left: 8px;
    border-radius: 25px;
  }
`

const PriceInputRow = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
  input {
    background-color: ${({ theme }) => theme.colors.inputBackground}!important;
    border-width: 0px !important;
    &:focus:not(:disabled) {
    }
  }
`
