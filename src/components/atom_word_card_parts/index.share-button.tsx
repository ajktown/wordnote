import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import ShareIcon from '@mui/icons-material/Share'
import { useSharedResource } from '@/hooks/shared-resources/use-shared-resource.hook'
import { sharedWordIdState } from '@/states/shared-resource/shared-resource.state'
import { useAtom } from 'jotai'
interface Props {
  wordId: string
}
const WordCardShareButtonPart: FC<Props> = ({ wordId }) => {
  const onGetSharedResource = useSharedResource(wordId)
  const [, setSharedWordId] = useAtom(sharedWordIdState)

  const onClick = useCallback(() => {
    ;(async () => {
      setSharedWordId(wordId)
      await onGetSharedResource()
    })()
  }, [wordId, onGetSharedResource, setSharedWordId])

  return (
    <StyledIconButtonAtom onClick={onClick} jsxElementButton={<ShareIcon />} />
  )
}

export default WordCardShareButtonPart
