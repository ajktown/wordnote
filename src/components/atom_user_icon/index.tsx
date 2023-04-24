import { FC } from 'react'
import { Avatar } from '@mui/material'

type PrivateIconSize =
  | 'xs' // 24
  | 'sm' // 32
  | undefined // 40 (default, md)
  | 'md' // 40
  | 'lg' // 48
  | 'xl' // 56

const IMAGE_NAME = `AJ Kim`
const IMAGE_URL = ``

interface Props {
  size?: PrivateIconSize
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
const UserIcon: FC<Props> = ({ size }) => {
  return <Avatar alt={IMAGE_NAME} src={IMAGE_URL} sx={privateGetWidth(size)} />
}

export default UserIcon
