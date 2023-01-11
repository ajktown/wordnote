import { FC, ReactElement } from 'react'
import { Chip } from '@mui/material'
import { GlobalMuiTagVariant } from '@/global.interface'

const PRIVATE_DEFAULT_VARIANT: GlobalMuiTagVariant = `outlined`

interface Props {
  label: string
  style?: {
    variant?: GlobalMuiTagVariant // Default: PRIVATE_DEFAULT_VARIANT
  }
  onClick?: () => any
  FrontIcon?: ReactElement // Front Icon does not have onClickFontIcon
  RearIcon?: ReactElement
  onClickRearIcon?: () => any
}

const StyledTagButtonAtom: FC<Props> = ({ RearIcon, ...props }) => {
  return (
    <Chip
      label={props.label}
      onClick={props.onClick}
      onDelete={props.onClickRearIcon}
      icon={props.FrontIcon}
      deleteIcon={RearIcon}
      size="small"
      variant={props.style?.variant || PRIVATE_DEFAULT_VARIANT}
    />
  )
}

export default StyledTagButtonAtom
