import { FC, ReactElement, ReactNode, useMemo } from 'react'
import { Chip } from '@mui/material'
import { GlobalMuiTagVariant } from '@/global.interface'

const PRIVATE_DEFAULT_VARIANT: GlobalMuiTagVariant = `outlined`

interface Props {
  label: string | ReactNode
  style?: {
    variant?: GlobalMuiTagVariant // Default: PRIVATE_DEFAULT_VARIANT
  }
  loading?: boolean
  clickDisabled?: boolean // Default: false
  onClick?: () => any
  FrontIcon?: ReactElement // Front Icon does not have onClickFontIcon
  RearIcon?: ReactElement
  onClickRearIcon?: () => any
}

const StyledChip: FC<Props> = ({
  RearIcon,
  onClick,
  clickDisabled,
  ...props
}) => {
  const handleClick = useMemo(() => {
    if (clickDisabled) return undefined
    return onClick
  }, [clickDisabled, onClick])

  return (
    <Chip
      label={props.label}
      disabled={props.loading}
      onClick={handleClick}
      onDelete={props.onClickRearIcon}
      icon={props.FrontIcon}
      deleteIcon={RearIcon}
      size="small"
      variant={props.style?.variant || PRIVATE_DEFAULT_VARIANT}
    />
  )
}

export default StyledChip
