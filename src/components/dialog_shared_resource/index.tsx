import { FC, useState } from 'react'
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  sharedWordFamily,
  sharedWordIdState,
} from '@/recoil/shared-resource/shared-resource.state'
import StyledDialogLoading from '@/organisms/StyledDialogLoading'
import StyledDialog from '@/organisms/StyledDialog'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { postSharedResourceApi } from '@/api/shared-resources/post-shared-resource.api'
import WordCardShared from '../molecule_word_card/index.shared'

const SharedResourceDialog: FC = () => {
  const sharedWordId = useRecoilValue(sharedWordIdState)
  const sharedWord = useRecoilValue(sharedWordFamily(sharedWordId))
  const onClose = useResetRecoilState(sharedWordIdState)
  const [posting, setPosting] = useState(false)

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        setPosting(true)
        set(sharedWordIdState, sharedWordId)
        try {
          const [data] = await postSharedResourceApi({
            wordId: sharedWordId,
            expireAfterSecs: 240,
          })
          set(sharedWordFamily(sharedWordId), data.word)
        } catch {
          set(sharedWordFamily(sharedWordId), null)
        } finally {
          setPosting(false)
        }
      },
    [sharedWordId],
  )

  if (!sharedWordId) return null

  if (sharedWord === undefined) return <StyledDialogLoading />

  if (sharedWord === null)
    return (
      <StyledDialog onClose={onClose}>
        <StyledTextButtonAtom
          title={`Wanna create new one?`}
          onClick={onClick}
          isLoading={posting}
        />
      </StyledDialog>
    )

  return (
    <StyledDialog onClose={onClose}>
      <WordCardShared wordId={sharedWordId} />
    </StyledDialog>
  )
}

export default SharedResourceDialog
