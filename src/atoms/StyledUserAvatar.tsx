import { FC } from 'react'
import { Avatar } from '@mui/material'
import StyledIconButtonAtom from './StyledIconButton'

type PrivateIconSize =
  | undefined // uses default of PRIVATE_DEFAULT_ICON_SIZE
  | 'xs' // 24
  | 'sm' // 32
  | 'md' // 40
  | 'lg' // 48
  | 'xl' // 56

const PRIVATE_DEFAULT_ICON_SIZE: PrivateIconSize = `sm`

interface Props {
  size?: PrivateIconSize
  imageUrl?: string
  imageName?: string
  onClick?: () => any
}

const privateGetWidth = (
  size: PrivateIconSize = PRIVATE_DEFAULT_ICON_SIZE,
): { width: number; height: number } => {
  switch (size) {
    case `xs`:
      return { width: 24, height: 24 }
    case `sm`:
      return { width: 32, height: 32 }
    case `lg`:
      return { width: 48, height: 48 }
    case `xl`:
      return { width: 56, height: 56 }
    case `md`:
    default:
      return { width: 40, height: 40 }
  }
}

const StyledUserAvatarBody: FC<Props> = ({ imageName, imageUrl, size }) => {
  return <Avatar alt={imageName} src={imageUrl} sx={privateGetWidth(size)} />
}

const StyledUserAvatar: FC<Props> = (props) => {
  if (!props.onClick) return <StyledUserAvatarBody {...props} />

  return (
    <StyledIconButtonAtom
      onClick={props.onClick}
      jsxElementButton={<StyledUserAvatarBody {...props} />}
    />
  )
}

export default StyledUserAvatar
