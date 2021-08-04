import React from 'react'
import { SvgProps } from '../../../components/Svg'
import Text from '../../../components/Text/Text'
import Dropdown from '../../../components/Dropdown/Dropdown'
import Button from '../../../components/Button/Button'
import * as IconModule from '../icons'
import { LangType } from '../types'
import MenuButton from './MenuButton'

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> }
const { LanguageIcon } = Icons

interface Props {
  currentLang: string
  langs: LangType[]
  setLang: (lang: string) => void
}

const LangSelector: React.FC<Props> = ({ currentLang, langs, setLang }) => {
  const handleSetLang = (lang: LangType) => {
    setLang(lang.code)
  }
  return (
    <Dropdown
      position="bottom-left"
      target={
        <Button variant="text" startIcon={<LanguageIcon color="textSubtle" width="24px" />}>
          <Text color="textSubtle">{langs.filter((lang) => lang.code === currentLang)[0]?.language || 'UNKNOW'}</Text>
        </Button>
      }
    >
      {langs.map((lang) => (
        <MenuButton key={lang.code} fullWidth onClick={() => handleSetLang(lang)}>
          {lang.language}
        </MenuButton>
      ))}
    </Dropdown>
  )
}

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang)
