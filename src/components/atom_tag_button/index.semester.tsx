import { ISemester } from '@/api/semesters/index.interface'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { selectedSemesterSelector } from '@/recoil/words/tags.selectors'
import { FC, useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

interface Props {
  semester: ISemester
}
const TagButtonSemester: FC<Props> = ({ semester }) => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)

  const { code } = semester

  const variant: GlobalMuiTagVariant = useMemo(() => {
    if (selectedSemester === code) return `filled`
    return `outlined`
  }, [selectedSemester, code])

  const [loading, getWords] = useWords()

  const onClick = useRecoilCallback(
    () => async () => {
      if (selectedSemester === code) return // already selected
      await getWords({
        semester: code,
        pageIndex: 0, // must reset page index
        daysAgo: undefined, // must reset days ago
        languageCodes: undefined, // must reset language codes
        isFavorite: undefined, // must reset is favorite
        tags: undefined, // must reset tags
      })
    },
    [code, selectedSemester, getWords],
  )

  return (
    <StyledTagButtonAtom
      key={code}
      loading={loading}
      label={`${semester.year}Y ${semester.quarter}Q`}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonSemester
