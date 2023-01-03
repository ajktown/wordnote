import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, Fragment } from 'react'
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
import { modifyingWordFamily, wordsFamily } from '@/recoil/words.state'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
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
  const [value, setValue] = useRecoilState(modifyingWordFamily(wordKey))
  const [handleApplyCache, handleResetCache] = usePutWordCache(wordId, wordKey)

  if (!originalWord) return null

  return (
    <Fragment>
      <StyledTextField
        value={value !== null ? value : originalWord[wordKey]}
        onChange={setValue}
        label={privatelyGetPlaceholder(wordKey)}
        designs={{
          variant: PRIVATE_DEFAULT_TEXT_FIELD_VARIANT,
        }}
        buttons={{
          right: value !== null && originalWord[wordKey] !== value && (
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
