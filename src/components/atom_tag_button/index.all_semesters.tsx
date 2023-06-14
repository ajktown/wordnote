import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { selectedSemesterSelector } from '@/recoil/words/tags.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

/** This component is not used, but saved for reference only. */
const TagButtonAllSemesters: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)
  const variant: GlobalMuiTagVariant = useMemo(
    () => (selectedSemester === undefined ? `filled` : `outlined`),
    [selectedSemester],
  )

  const [loading, handleGetWordIds] = useWords()
  const onClick = useCallback(() => {
    handleGetWordIds({ semester: undefined })
  }, [handleGetWordIds])

  return (
    <StyledTagButtonAtom
      label={`⭐️ All`}
      onClick={onClick}
      loading={loading}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonAllSemesters
