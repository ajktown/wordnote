import { FC } from 'react'
import { Avatar } from '@mui/material'
import StyledIconButtonAtom from './StyledIconButton'
import StyledIconButtonWithMenuAtom, {
  PropsMenuItem,
} from './StyledIconButtonWithMenu'

type PrivateIconSize =
  | undefined // uses default of PRIVATE_DEFAULT_ICON_SIZE
  | 'xs' // 24
  | 'sm' // 32
  | 'md' // 40
  | 'lg' // 48
  | 'xl' // 56

const PRIVATE_DEFAULT_ICON_SIZE: PrivateIconSize = `sm`

interface Props {
  menuItems?: PropsMenuItem[]
  size?: PrivateIconSize
  imageUrl?: string
  imageName?: string
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

/**
 * StyledUserAvatar is an styled atom component that draws Avatar for you with given size.
 * You can also give it a menu to show when the user clicks on it.
 * If no menu is given, it will just be an unclickable avatar.
 */
const StyledUserAvatar: FC<Props> = (props) => {
  if (props.menuItems && props.menuItems.length > 0) {
    return (
      <StyledIconButtonWithMenuAtom
        jsxElementButton={<StyledUserAvatarBody {...props} />}
        menus={props.menuItems}
      />
    )
  }
  return (
    <StyledIconButtonAtom
      jsxElementButton={<StyledUserAvatarBody {...props} />}
      // User avatar with no menus should not be clickable and therefore isDisabled is passed
      isDisabled
    />
  )
}

export default StyledUserAvatar
