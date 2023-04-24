import { FC } from 'react'
import { Avatar } from '@mui/material'

type PrivateIconSize =
  | 'xs' // 24
  | 'sm' // 32
  | undefined // 40 (default, md)
  | 'md' // 40
  | 'lg' // 48
  | 'xl' // 56

interface Props {
  size?: PrivateIconSize
  imageUrl?: string
  imageName?: string
}

const privateGetWidth = (
  size: PrivateIconSize,
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
const StyledUserAvatar: FC<Props> = ({ size, imageName, imageUrl }) => {
  return <Avatar alt={imageName} src={imageUrl} sx={privateGetWidth(size)} />
}

export default StyledUserAvatar
