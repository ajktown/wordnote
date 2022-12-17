import { FC, MouseEvent, useCallback, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { GlobalMuiPlacement } from '../global.interface'

const DEFAULT_SIZE = `small`

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
const StyledIconButtonAtom: FC<Props> = ({onClickCallback, ...props}) => {
  const [onHover, setHover] = useState(false)

  const buttonColor =
    !props.disableOnHoverColor && onHover ? `#a200aa` : undefined

  const handleClickInternally = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!onClickCallback) return
    onClickCallback(e)
  }, [onClickCallback])

  return (
    <Tooltip
      title={props.hoverMessage?.title || ``}
      placement={props.hoverMessage?.placement || `bottom`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span>
        <IconButton
          size={props.size || DEFAULT_SIZE}
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
