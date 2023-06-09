import StyledUserAvatar from '@/atoms/StyledUserAvatar'
import { authPrepState } from '@/recoil/app/app.state'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

const EndUserAvatar: FC = () => {
  const authPrep = useRecoilValue(authPrepState)

  return (
    <StyledUserAvatar imageUrl={authPrep?.profilePictureUrl || undefined} />
  )
}

export default EndUserAvatar
