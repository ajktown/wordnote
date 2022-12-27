import { FC, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'

interface Props {
  onClick?: any
  hoverMessage?: string
  buttonColor?: string
  size?: 'small' | 'medium' | 'large'
}

const XButton: FC<Props> = ({ onClick, ...props }) => {
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

export default XButton
