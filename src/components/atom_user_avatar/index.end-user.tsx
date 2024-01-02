import { PropsMenuItem } from '@/atoms/StyledIconButtonWithMenu'
import StyledUserAvatar from '@/atoms/StyledUserAvatar'
import { useOnSignOutApp } from '@/hooks/app/use-on-sign-out-app.hook'
import { authPrepState } from '@/recoil/app/app.state'
import { FC, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

/** Avatar for the current user that is using the application. This should not be used
 * for other users.
 */
const EndUserAvatar: FC = () => {
  const authPrep = useRecoilValue(authPrepState)
  const onSignOutApp = useOnSignOutApp()

  const menuItems: PropsMenuItem[] = useMemo(
    () => [
      {
        title: `Sign out`,
        onClick: onSignOutApp,
      },
    ],
    [onSignOutApp],
  )

  return (
    <StyledUserAvatar
      imageUrl={authPrep?.signedInUserInfo?.profileImageUrl ?? undefined}
      menuItems={menuItems}
    />
  )
}

export default EndUserAvatar
