import { FC, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { GlobalMuiSize } from '@/global.interface'
import SurfingIcon from '@mui/icons-material/Surfing';

interface Props {
  onClick?: any
  hoverMessage?: string
  buttonColor?: string
  size?: GlobalMuiSize
}

const StyledIconButtonSurfing: FC<Props> = ({ onClick, ...props }) => {
  const handleClickCallback = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <StyledIconButtonAtom
      size={props.size}
      onClick={handleClickCallback}
      jsxElementButton={<CloseIcon fontSize={props.size} />}
    />
  )
}

export default StyledIconButtonSurfing
