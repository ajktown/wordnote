import { SemesterData } from '@/api/semesters/index.interface'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { isFavoriteClickedState } from '@/recoil/favorites.state'
import { selectedLanguageState } from '@/recoil/languages.state'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

interface Props {
  semester: SemesterData
}
const TagButtonSemester: FC<Props> = ({ semester }) => {
  const [selectedSemester, setSelectedSemester] = useRecoilState(
    selectedSemesterState,
  )
  const onResetFavoriteClicked = useResetRecoilState(isFavoriteClickedState)
  const onResetSelectedLanguage = useResetRecoilState(selectedLanguageState)
  const { code } = semester

  const variant: GlobalMuiTagVariant = useMemo(() => {
    if (selectedSemester === code) return `filled`
    return `outlined`
  }, [selectedSemester, code])

  const onClick = useCallback(() => {
    setSelectedSemester(code)
    onResetFavoriteClicked()
    onResetSelectedLanguage()
  }, [code, setSelectedSemester, onResetFavoriteClicked, onResetSelectedLanguage])

  return (
    <StyledTagButtonAtom
      key={semester.code}
      label={`${semester.year}Y ${semester.quarter}Q`}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonSemester
