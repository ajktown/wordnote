import StyledChip from '@/atoms/StyledChip'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { selectedSemesterSelector } from '@/recoil/words/words.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

/** This component is not used, but saved for reference only. */
const TagChipAllSemesters: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)
  const variant: GlobalMuiTagVariant = useMemo(
    () => (selectedSemester === undefined ? `filled` : `outlined`),
    [selectedSemester],
  )

  const [loading, getWords] = useWords()
  const onClick = useCallback(async () => {
    try {
      await getWords({ semester: undefined })
    } catch {}
  }, [getWords])

  return (
    <StyledChip
      label={`⭐️ All`}
      onClick={onClick}
      loading={loading}
      style={{
        variant,
      }}
    />
  )
}

export default TagChipAllSemesters
