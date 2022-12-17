import { FC, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'

interface Props {
  onClickCallback?: any
  hoverMessage?: string
  buttonColor?: string
  size?: 'small' | 'medium' | 'large'
}

const XButton: FC<Props> = ({onClickCallback, ...props}) => {
  const handleClickCallback = useCallback(() => {
    if (!onClickCallback) return
    onClickCallback()
  }, [onClickCallback])

  return (
    <StyledIconButtonAtom
      size={props.size}
      onClickCallback={handleClickCallback}
      jsxElementButton={<CloseIcon fontSize={props.size} />}
    />
  )
}

export default XButton
