import { FC, useState } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import {
  sharedWordFamily,
  sharedWordIdState,
} from '@/states/shared-resource/shared-resource.state'
import StyledDialogLoading from '@/organisms/StyledDialogLoading'
import StyledDialog from '@/organisms/StyledDialog'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { postSharedResourceApi } from '@/api/shared-resources/post-shared-resource.api'
import WordCardShared from '../molecule_word_card/index.shared'
import { DialogContent, DialogTitle } from '@mui/material'
import WordCardShareReview from '../molecule_word_card/index.share-review'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'

const SharedResourceDialog: FC = () => {
  const [sharedWordId, setSharedWordIdState] = useAtom(sharedWordIdState)
  const sharedWord = useRecoilValue(sharedWordFamily(sharedWordId))
  const onClose = useResetAtom(sharedWordIdState)

  const [posting, setPosting] = useState(false)

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        setPosting(true)
        setSharedWordIdState(sharedWordId)
        try {
          const [data] = await postSharedResourceApi({
            wordId: sharedWordId,
            expireAfterSecs: 60 * 60 * 24, // a day
          })
          set(sharedWordFamily(sharedWordId), data)
        } catch {
          set(sharedWordFamily(sharedWordId), null)
        } finally {
          setPosting(false)
        }
      },
    [sharedWordId, setSharedWordIdState],
  )

  if (!sharedWordId) return null

  if (sharedWord === undefined) return <StyledDialogLoading />

  if (sharedWord === null)
    return (
      <StyledDialog onClose={onClose}>
        <DialogTitle>{`Beta Feature: Share Word Card?`}</DialogTitle>
        <DialogContent>
          <StyledTextButtonAtom
            title={`Share the word card below`}
            onClick={onClick}
            isLoading={posting}
          />
          <WordCardShareReview wordId={sharedWordId} />
        </DialogContent>
      </StyledDialog>
    )

  return (
    <StyledDialog onClose={onClose}>
      <WordCardShared wordId={sharedWordId} />
    </StyledDialog>
  )
}

export default SharedResourceDialog
