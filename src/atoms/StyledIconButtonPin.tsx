import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import { GlobalMuiSize } from '@/global.interface'
import PushPinIcon from '@mui/icons-material/PushPin'

interface Props {
  isClicked: boolean
  onClick?: () => any
  size?: GlobalMuiSize
}
const StyledIconButtonPin: FC<Props> = ({ isClicked, onClick, size }) => {
  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={
        <PushPinIcon
          style={{
            color: isClicked ? /* Orange */ `ffa31a` : undefined,
            fontSize: size,
          }}
        />
      }
    />
  )
}

export default StyledIconButtonPin
