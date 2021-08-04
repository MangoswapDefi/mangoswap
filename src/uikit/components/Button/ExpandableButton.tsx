import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '../Svg'
import Button from './Button'
import IconButton from './IconButton'

interface Props {
  onClick?: () => void
  expanded?: boolean
}

export const ExpandableButton: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <IconButton aria-label="Hide or show expandable content" onClick={onClick}>
      {children}
      {expanded ? <ChevronUpIcon color="invertedContrast" /> : <ChevronDownIcon color="invertedContrast" />}
    </IconButton>
  )
}
ExpandableButton.defaultProps = {
  expanded: false,
}

export const ExpandableButtonV2: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <IconButton variant="text" aria-label="Hide or show expandable content" onClick={onClick}>
      {children}
      {expanded ? <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.2363 0.674052C5.98176 0.334606 5.47261 0.334607 5.21806 0.674053L0.221824 7.33677C-0.092766 7.75629 0.206575 8.35491 0.730945 8.35491L10.7234 8.35491C11.2478 8.35491 11.5471 7.75629 11.2325 7.33677L6.2363 0.674052Z" fill="#F2F2F2" />
      </svg>
        : <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.57786 8.42436C5.83226 8.76799 6.34639 8.76799 6.60079 8.42436L11.6077 1.66106C11.9186 1.24106 11.6188 0.646059 11.0962 0.646059L1.08242 0.646058C0.559852 0.646058 0.26003 1.24106 0.570958 1.66106L5.57786 8.42436Z" fill="#F2F2F2" />
        </svg>
}
    </IconButton>
  )
}
ExpandableButtonV2.defaultProps = {
  expanded: false,
}

export const ExpandableLabel: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <Button
      style={{ padding: 0, fontSize: '14px' }}
      variant="text"
      aria-label="Hide or show expandable content"
      onClick={onClick}
      endIcon={expanded ? <ChevronUpIcon color="primary" /> : <ChevronDownIcon color="primary" />}
    >
      {children}
    </Button>
  )
}
ExpandableLabel.defaultProps = {
  expanded: false,
}
