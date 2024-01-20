import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import ShareIcon from '@mui/icons-material/Share'
import { useSharedResource } from '@/hooks/shared-resources/use-shared-resource.hook'
import { useRecoilCallback } from 'recoil'
import { sharedWordIdState } from '@/recoil/shared-resource/shared-resource.state'
interface Props {
  wordId: string
}
const WordCardShareButtonPart: FC<Props> = ({ wordId }) => {
  const onGetSharedResource = useSharedResource(wordId)

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(sharedWordIdState, wordId)
        await onGetSharedResource()
      },
    [wordId, onGetSharedResource],
  )

  return (
    <StyledIconButtonAtom onClick={onClick} jsxElementButton={<ShareIcon />} />
  )
}

export default WordCardShareButtonPart
