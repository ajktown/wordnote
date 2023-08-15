import { FC, useState, useCallback, Fragment, MouseEvent } from 'react'
import StyledIconButtonAtom, {
  PropsStyledIconButtonAtom,
} from './StyledIconButton'
import { Menu, MenuItem } from '@mui/material'

export interface PropsMenuItem {
  onClick: () => any
  title: string
  isDisabled?: boolean
}
interface Props extends Exclude<PropsStyledIconButtonAtom, 'onClick'> {
  menus: PropsMenuItem[]
}

/**
 * StyledIconButtonWithMenuAtom is an styled atom component that draws IconButton for you with given size.
 * As the name suggests, it generally expects one or more menu items to show when the user clicks on it.
 * It does not have a logic stored with no menus given, so please provide at least one menu item.
 */
const StyledIconButtonWithMenuAtom: FC<Props> = ({ menus, ...props }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const onClose = useCallback(() => setAnchorEl(null), [])

  const onClick = useCallback(
    (event: undefined | MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
      if (menus.length === 0) return

      setAnchorEl(event?.currentTarget ?? null)
    },
    [menus],
  )

  return (
    <Fragment>
      <StyledIconButtonAtom {...props} onClick={onClick} />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: `top`,
          horizontal: `right`,
        }}
        keepMounted
        transformOrigin={{
          vertical: `top`,
          horizontal: `right`,
        }}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {menus.map((menu) => (
          <MenuItem
            key={menu.title}
            onClick={menu.onClick}
            disabled={menu.isDisabled}
          >
            {menu.title}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}

export default StyledIconButtonWithMenuAtom
