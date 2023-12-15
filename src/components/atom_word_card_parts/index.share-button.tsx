import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import ShareIcon from '@mui/icons-material/Share'
import { useSharedResource } from '@/hooks/shared-resources/use-shared-resource.hook'
interface Props {
  wordId: string
}
const WordCardShareButtonPart: FC<Props> = ({ wordId }) => {
  const onGetSharedResource = useSharedResource(wordId)

  return (
    <StyledIconButtonAtom
      onClick={onGetSharedResource}
      jsxElementButton={<ShareIcon />}
    />
  )
}

export default WordCardShareButtonPart
