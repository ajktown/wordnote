import { FC, useCallback } from 'react'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'
import { useWords } from '@/hooks/words/use-words.hook'
import { useSetRecoilState } from 'recoil'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { getPreferenceApi } from '@/api/preferences/get-preferences.api'

const WordCardsFrameRefreshButtonPart: FC = () => {
  const [, getWords] = useWords()
  const getSemesters = useSemesters()
  const setPreferenceState = useSetRecoilState(preferenceState)

  const onClickRefresh = useCallback(async () => {
    const semesters = await getSemesters()
    if (!semesters.latestSemesterCode) return

    await getWords({ semester: semesters.latestSemesterCode })
    
    const [data] = await getPreferenceApi()
    setPreferenceState(data)
  }, [getWords, getSemesters,setPreferenceState])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButtonPart
