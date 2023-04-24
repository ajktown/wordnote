import StyledUserAvatar from '@/atoms/StyledUserAvatar'
import { PageConst } from '@/constants/pages.constant'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'

const EndUserAvatar: FC = () => {
  const router = useRouter()
  const onClick = useCallback(() => {
    router.push(PageConst.SignIn)
  }, [router])

  return <StyledUserAvatar onClick={onClick} />
}

export default EndUserAvatar
