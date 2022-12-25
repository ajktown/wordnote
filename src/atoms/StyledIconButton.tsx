import { FC, MouseEvent, useCallback, useMemo } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { GlobalMuiPlacement } from '../global.interface'
import { useOnHover } from '@/hooks/use-on-hover.hook'

const PRIVATE_FINAL_DEFAULT_SIZE = `small`

interface Props {
  onClickCallback?: (e?: MouseEvent<HTMLElement>) => any
  jsxElementButton: JSX.Element
  isDisabled?: boolean
  hoverMessage?: {
    title: string
    placement?: GlobalMuiPlacement
  }
  size?: 'small' | 'medium' | 'large'
  disableOnHoverColor?: boolean
}
const StyledIconButtonAtom: FC<Props> = ({
  onClickCallback,
  disableOnHoverColor,
  ...props
}) => {
  const [isOnHover, handleMouseEnter, handleMouseLeave] = useOnHover()

  const buttonColor = useMemo(
    () => (!disableOnHoverColor && isOnHover ? `#a200aa` : undefined),
    [disableOnHoverColor, isOnHover],
  )

  const handleClickInternally = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!onClickCallback) return
      onClickCallback(e)
    },
    [onClickCallback],
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
          onClick={handleClickInternally}
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
