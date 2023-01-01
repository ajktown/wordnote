import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, Fragment, useCallback, useMemo, ReactNode } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import {
  WordDataModifiableKey,
  WordDataModifiableStringKey,
} from '@/api/words/words.interface'
import StyledTextField from '@/atoms/StyledTextField'
import { stringCaseHandler } from '@/handlers/string-case.handler'
import { GlobalMuiTextFieldVariant } from '@/global.interface'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedWordForDialogState, wordsFamily } from '@/recoil/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'

const privatelyGetPlaceholder = (key: WordDataModifiableKey) => {
  switch (key) {
    case `term`:
      return `Word`
    case `example`:
      return `Example Sentence`
    default:
      return stringCaseHandler.toSentence(key)
  }
}

const PRIVATE_DEFAULT_TEXT_FIELD_VARIANT: GlobalMuiTextFieldVariant = `standard`

interface Props {
  wordId: string
  wordKey: WordDataModifiableStringKey
}
const WordCardEditingTextField: FC<Props> = ({ wordId, wordKey }) => {
  const originalWord = useRecoilValue(wordsFamily(wordId))
  const [selectedWordDialog, setSelectedWordDialog] = useRecoilState(
    selectedWordForDialogState,
  )
  const putWord = usePutWord(wordId)

  const handleChange = useCallback(
    (newInput: string) => {
      if (!selectedWordDialog) return
      setSelectedWordDialog({
        ...selectedWordDialog,
        [wordKey]: newInput,
      })
    },
    [wordKey, selectedWordDialog, setSelectedWordDialog],
  )

  const handleClickModify = useCallback(() => {
    if (!selectedWordDialog) return
    putWord(selectedWordDialog)
  }, [selectedWordDialog, putWord])

  const handleResetInput = useCallback(() => {
    setSelectedWordDialog(originalWord)
  }, [originalWord, setSelectedWordDialog])

  const ButtonsRight: ReactNode = useMemo(() => {
    if (!originalWord || !selectedWordDialog) return null
    if (originalWord[wordKey] === selectedWordDialog[wordKey]) return null

    return (
      <Fragment>
        <StyledIconButtonAtom
          jsxElementButton={<CheckIcon fontSize="small" />}
          onClick={handleClickModify}
        />
        <StyledIconButtonAtom
          jsxElementButton={<ClearIcon fontSize="small" />}
          onClick={handleResetInput}
        />
      </Fragment>
    )
  }, [
    wordKey,
    originalWord,
    selectedWordDialog,
    handleClickModify,
    handleResetInput,
  ])

  if (!selectedWordDialog || !originalWord) return null

  return (
    <Fragment>
      <StyledTextField
        value={selectedWordDialog[wordKey]}
        onChange={handleChange}
        label={privatelyGetPlaceholder(wordKey)}
        designs={{
          variant: PRIVATE_DEFAULT_TEXT_FIELD_VARIANT,
        }}
        buttons={{ right: ButtonsRight }}
      />
    </Fragment>
  )
}

export default WordCardEditingTextField
