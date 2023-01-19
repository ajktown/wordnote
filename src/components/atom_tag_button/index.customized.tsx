import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { selectedTagFamily } from '@/recoil/tags.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  label: string
}
const TagButtonCustomized: FC<Props> = ({ label }) => {
  const [isTagSelected, setTagSelected] = useRecoilState(
    selectedTagFamily(label),
  )

  const variant: GlobalMuiTagVariant = useMemo(() => {
    return isTagSelected ? `filled` : `outlined`
  }, [isTagSelected])

  const onClick = useCallback(() => {
    setTagSelected(!isTagSelected)
  }, [isTagSelected, setTagSelected])

  return (
    <StyledTagButtonAtom
      label={`#` + label}
      style={{
        variant,
      }}
      onClick={onClick}
    />
  )
}

export default TagButtonCustomized
