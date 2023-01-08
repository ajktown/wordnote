import { FC, ReactElement } from 'react'
import { Chip } from '@mui/material'

type Variant = 'filled' | 'outlined'
const PRIVATE_DEFAULT_VARIANT: Variant = "outlined"

interface Props {
  label: string
  style?: {
    variant?: Variant // Default: PRIVATE_DEFAULT_VARIANT
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
