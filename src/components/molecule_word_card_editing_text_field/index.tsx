import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, Fragment } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import {
  WordDataModifiableKey,
  WordDataModifiableStringKey,
} from '@/api/words/interfaces'
import StyledTextField from '@/atoms/StyledTextField'
import { stringCaseHandler } from '@/handlers/string-case.handler'
import { GlobalMuiTextFieldVariant } from '@/global.interface'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/states/words/words.state'
import { usePutWordCacheByKey } from '@/hooks/words/use-put-word-cache-by-key.hook'

const PRIVATE_DEFAULT_TEXT_FIELD_VARIANT: GlobalMuiTextFieldVariant = `standard`

const privateGetPlaceholder = (key: WordDataModifiableKey) => {
  switch (key) {
    case `term`:
      return `Word`
    case `example`:
      return `Example Sentence`
    case `exampleLink`:
      return `Example Sentence Link`
    default:
      return stringCaseHandler.toSentence(key)
  }
}

interface Props {
  wordId: string
  wordKey: WordDataModifiableStringKey
}
const WordCardEditingTextField: FC<Props> = ({ wordId, wordKey }) => {
  const originalWord = useRecoilValue(wordsFamily(wordId))
  const [value, setValue, isModified, handleApplyCache, handleResetCache] =
    usePutWordCacheByKey(wordId, wordKey)

  if (!originalWord) return null

  return (
    <Fragment>
      <StyledTextField
        value={value}
        onChange={setValue}
        label={privateGetPlaceholder(wordKey)}
        designs={{
          variant: PRIVATE_DEFAULT_TEXT_FIELD_VARIANT,
        }}
        buttons={{
          right: isModified && (
            <Fragment>
              <StyledIconButtonAtom
                jsxElementButton={<CheckIcon fontSize="small" />}
                onClick={handleApplyCache}
              />
              <StyledIconButtonAtom
                jsxElementButton={<ClearIcon fontSize="small" />}
                onClick={handleResetCache}
              />
            </Fragment>
          ),
        }}
      />
    </Fragment>
  )
}

export default WordCardEditingTextField
