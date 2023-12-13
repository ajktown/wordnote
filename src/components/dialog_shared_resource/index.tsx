import { FC } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import {
  sharedWordFamily,
  sharedWordIdState,
} from '@/recoil/shared-resource/shared-resource.state'
import StyledDialogLoading from '@/organisms/StyledDialogLoading'

const SharedResourceDialog: FC = () => {
  const sharedWordId = useRecoilValue(sharedWordIdState)
  const onClose = useResetRecoilState(sharedWordIdState)
  const sharedWord = useRecoilValue(sharedWordFamily(sharedWordId))

  if (!sharedWordId) return null
  if (sharedWord === undefined)
    return (
      <StyledDialogLoading visuals={{ maxWidth: `xs` }} onClose={onClose} />
    )
  if (sharedWord === null) return <h2> Wanna create a new shared word?</h2>
  return <h2>Shared Word Card Status</h2>
}

export default SharedResourceDialog
