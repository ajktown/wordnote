import StyledChip from '@/atoms/StyledChip'
import { FC, useCallback, useState } from 'react'
import DeleteTagIcon from '@mui/icons-material/HighlightOff'

/** Unlike other components, TagButtonDeletable depends on
 * TagButtonModifiableChunk as tags are associated directly to the word itself.
 * And the modification of a tag requires the whole tags of the word to be
 * passed to the API server.
 */
interface Props {
  label: string
  onClick: (label: string) => Promise<any>
}
const TagChipDeletable: FC<Props> = ({ label, onClick }) => {
  const [loading, setLoading] = useState(false)

  const onClickDeleteTag = useCallback(async () => {
    setLoading(true)
    try {
      await onClick(label)
    } finally {
      setLoading(false)
    }
  }, [label, onClick])

  return (
    <StyledChip
      label={`#` + label}
      loading={loading}
      style={{
        variant: `outlined`,
      }}
      onClickRearIcon={onClickDeleteTag}
      RearIcon={<DeleteTagIcon />}
    />
  )
}

export default TagChipDeletable
