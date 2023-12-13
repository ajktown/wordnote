import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import ShareIcon from '@mui/icons-material/Share'
import { useRecoilCallback } from 'recoil'
import {
  sharedWordFamily,
  sharedWordIdState,
} from '@/recoil/shared-resource/shared-resource.state'
import { getSharedResourceApi } from '@/api/shared-resources/get-shared-resource.api'
interface Props {
  wordId: string
}
const WordCardShareButtonPart: FC<Props> = ({ wordId }) => {
  // TODO: write a hook
  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(sharedWordIdState, wordId)
        try {
          const [data] = await getSharedResourceApi({
            id: undefined,
            wordId,
          })
          set(sharedWordFamily(wordId), data.word)
        } catch {
          set(sharedWordFamily(wordId), null)
        }
      },
    [wordId],
  )

  return (
    <StyledIconButtonAtom onClick={onClick} jsxElementButton={<ShareIcon />} />
  )
}

export default WordCardShareButtonPart
