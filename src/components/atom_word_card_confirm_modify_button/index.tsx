import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC, useCallback } from 'react'
import {  useRecoilValue, useResetRecoilState } from 'recoil'
import { wordsFamily, selectedWordForDialogState } from '@/recoil/words.state'
import { isDeeplySameObjectsHandler } from '@/handlers/is-deeply-same-objects.handler'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
interface Props {
  wordId: string
}

const WordCardConfirmModifyButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const selectedWordForDialog = useRecoilValue(selectedWordForDialogState)
  const putWord = usePutWord(wordId)
  const resetDialog = useResetRecoilState(selectedWordForDialogState)

  const handleClickChange = useCallback(async () => {
    if (!selectedWordForDialog) return

    await putWord(selectedWordForDialog)
    resetDialog()
  }, [selectedWordForDialog, putWord, resetDialog])

  if (!selectedWordForDialog || !word) return null
  if (isDeeplySameObjectsHandler(word, selectedWordForDialog)) return null
  
  return <StyledTextButtonAtom title="Modify" variant="text" onClick={handleClickChange}/>
}

export default WordCardConfirmModifyButton
