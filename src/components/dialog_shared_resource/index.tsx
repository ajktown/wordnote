import { FC } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { sharedWordIdState } from '@/recoil/shared-resource/shared-resource.state'
import StyledDialogLoading from '@/organisms/StyledDialogLoading'

const SharedResourceDialog: FC = () => {
  const sharedWordId = useRecoilValue(sharedWordIdState)
  const onClose = useResetRecoilState(sharedWordIdState)

  if (!sharedWordId) return null

  return <StyledDialogLoading visuals={{ maxWidth: `xs` }} onClose={onClose} />
}

export default SharedResourceDialog
