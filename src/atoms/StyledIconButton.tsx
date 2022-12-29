import { FC, MouseEvent, useCallback, useMemo } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { GlobalMuiPlacement, GlobalMuiSize } from '../global.interface'
import { useOnHover } from '@/hooks/use-on-hover.hook'

const PRIVATE_FINAL_DEFAULT_SIZE: GlobalMuiSize = `small`

interface Props {
  onClick?: (e?: MouseEvent<HTMLElement>) => any
  jsxElementButton: JSX.Element
  isDisabled?: boolean
  hoverMessage?: {
    title: string
    placement?: GlobalMuiPlacement
  }
  size?: GlobalMuiSize
  disableOnHoverColor?: boolean
}
const StyledIconButtonAtom: FC<Props> = ({
  onClick,
  disableOnHoverColor,
  ...props
}) => {
  const [isOnHover, handleMouseEnter, handleMouseLeave] = useOnHover()

  const buttonColor = useMemo(
    () => (!disableOnHoverColor && isOnHover ? `#a200aa` : undefined),
    [disableOnHoverColor, isOnHover],
  )

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      onClick && onClick(e)
    },
    [onClick],
  )

  return (
    <Tooltip
      title={props.hoverMessage?.title || ``}
      placement={props.hoverMessage?.placement || `bottom`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>
        <IconButton
          size={props.size || PRIVATE_FINAL_DEFAULT_SIZE}
          aria-label="close"
          onClick={handleClick}
          disabled={props.isDisabled}
          disableTouchRipple
          style={{ color: buttonColor }}
        >
          {props.jsxElementButton}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default StyledIconButtonAtom
