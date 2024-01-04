import { FC, MouseEvent, useCallback, useMemo, JSX } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { GlobalMuiPlacement, GlobalMuiSize } from '../global.interface'
import { useOnHover } from '@/hooks/use-on-hover.hook'

const PRIVATE_FINAL_DEFAULT_SIZE: GlobalMuiSize = `small`

export interface PropsStyledIconButtonAtom {
  onClick?: (e?: MouseEvent<HTMLElement>) => any
  jsxElementButton: JSX.Element
  isDisabled?: boolean
  hoverMessage?: {
    title: string
    placement?: GlobalMuiPlacement
  }
  size?: GlobalMuiSize
  enableRipple?: boolean
  disableOnHoverColor?: boolean // disabled icons won't show the hover color regardless of the given disableOnHoverColor
}
const StyledIconButtonAtom: FC<PropsStyledIconButtonAtom> = ({
  onClick,
  disableOnHoverColor,
  isDisabled,
  ...props
}) => {
  const [isOnHover, handleMouseEnter, handleMouseLeave] = useOnHover()

  const buttonColor: undefined | string = useMemo(() => {
    if (isDisabled) return undefined
    return !disableOnHoverColor && isOnHover ? `#a200aa` : undefined
  }, [isDisabled, disableOnHoverColor, isOnHover])

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (onClick) onClick(e)
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
          disabled={isDisabled}
          style={{
            cursor:
              isDisabled && props.hoverMessage?.title ? `help` : undefined,
          }}
          disableRipple={!props.enableRipple}
        >
          {props.jsxElementButton}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default StyledIconButtonAtom
