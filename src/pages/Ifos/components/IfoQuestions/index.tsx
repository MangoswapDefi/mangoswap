import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Card, CardHeader, CardBody } from 'uikit'
import useI18n from 'hooks/useI18n'
import FoldableText from 'components/FoldableText'
import useIntl from 'hooks/useIntl'
import config from './config'

const DetailsWrapper = styled.div`
  margin: 40px auto;
`

const IfoQuestions = () => {
  const TranslateString = useI18n()
  const intl = useIntl()

  return (
    <DetailsWrapper>
      <Card style={{ maxWidth: 680, width: '100%', margin: '0 auto' }}>
        <CardHeader>
          <Heading color="#FFFFFF">{intl('farms.details')}</Heading>
        </CardHeader>
        <CardBody>
          {config.map(({ title, description }) => (
            <FoldableText
              key={title.fallback}
              id={title.fallback}
              mb="24px"
              title={intl(title.id)}
            >
              {description.map(({ id, fallback }) => {
                return (
                  <Text key={fallback} color="textSubtle" fontSize="14px" as="p">
                    {intl(id)}
                  </Text>
                )
              })}
            </FoldableText>
          ))}
        </CardBody>
      </Card>
    </DetailsWrapper>
  )
}

export default IfoQuestions
