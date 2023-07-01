import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { FC, useCallback, useState } from 'react'
import DeleteTagIcon from '@mui/icons-material/HighlightOff'

/** Unlike other components, TagButtonDeletable depends on
 * TagButtonModifiableChunk as tags are associated directly to the word itself.
 * And the modification of a tag requires the whole tags of the word to be
 * passed to the API server.
 */
interface Props {
  label: string
  onClickDelete: (label: string) => Promise<any>
}
const TagButtonDeletable: FC<Props> = ({ label, onClickDelete }) => {
  const [loading, setLoading] = useState(false)

  const onClick = useCallback(async () => {
    setLoading(true)
    try {
      await onClickDelete(label)
    } finally {
      setLoading(false)
    }
  }, [label, onClickDelete])

  return (
    <StyledTagButtonAtom
      label={`#` + label}
      loading={loading}
      style={{
        variant: `outlined`,
      }}
      onClickRearIcon={onClick}
      RearIcon={<DeleteTagIcon />}
    />
  )
}

export default TagButtonDeletable
