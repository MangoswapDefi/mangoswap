import { DefaultTheme } from 'styled-components'

export interface ThemedProps {
  theme: DefaultTheme
}

export type Status = 'past' | 'current' | 'future'

export interface StatusProps extends ThemedProps {
  theme: any
  status: Status
}

export interface StepProps {
  dot: React.ReactNode
  status: Status
}
