import { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'

// TODO: Move this file to src/atoms, as it does not contain any business info
interface XButtonProps {
  handleClick?: any
  hoverMessage?: string
  buttonColor?: string
  size?: 'small' | 'medium' | 'large'
}
const XButton: FC<XButtonProps> = (props) => {
  const handleClick = () => {
    if (!props.handleClick) return
    props.handleClick()
  }

  return (
    <StyledIconButtonAtom
      size={props.size}
      handleClick={() => handleClick()}
      jsxElementButton={<CloseIcon fontSize={props.size} />}
    />
  )
}

export default XButton
