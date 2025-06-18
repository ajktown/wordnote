import { PropsMenuItem } from '@/atoms/StyledIconButtonWithMenu'
import StyledUserAvatar from '@/atoms/StyledUserAvatar'
import { useOnSignOutApp } from '@/hooks/app/use-on-sign-out-app.hook'
import { authPrepState } from '@/states/app/app.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

/** Avatar for the current user that is using the application. This should not be used
 * for other users.
 */
const EndUserAvatar: FC = () => {
  const authPrep = useRecoilValue(authPrepState)
  const onSignOutApp = useOnSignOutApp()

  const onClickBuyMeCoffee = useCallback(() => {
    const url = `https://www.buymeacoffee.com/mlajkim`
    window.open(url, `_blank`)
  }, [])

  const menuItems: PropsMenuItem[] = useMemo(
    () => [
      {
        title: `Buy me coffee!`,
        onClick: onClickBuyMeCoffee,
      },
      {
        title: `Sign out`,
        onClick: onSignOutApp,
      },
    ],
    [onSignOutApp, onClickBuyMeCoffee],
  )

  return (
    <StyledUserAvatar
      imageUrl={authPrep?.signedInUserInfo?.profileImageUrl ?? undefined}
      menuItems={menuItems}
    />
  )
}

export default EndUserAvatar
