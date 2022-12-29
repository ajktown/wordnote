import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, Fragment, useState, useCallback } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { WordDataModifiableKey } from '@/api/words/words.interface'
import StyledTextField from '@/atoms/StyledTextField'
import { stringCaseHandler } from '@/handlers/string-case.handler'

const privatelyGetPlaceholder = (key: WordDataModifiableKey) => {
  switch (key) {
    case "term": 
      return "Word"
    case "example":
      return "Example Sentence"
    default:
      return stringCaseHandler.toSentence(key)
  }
}

interface Props {
  wordKey: WordDataModifiableKey
  originalInput: string
  onClickModify: (wordKey: WordDataModifiableKey, newInput: string) => any
}
const WordCardEditingTextField: FC<Props>  = ({
  wordKey,
  originalInput,
  onClickModify,
}) => {
  const [input, setInput] = useState(originalInput)

  const handleClickModify = useCallback(() => {
    onClickModify(wordKey, input)
  }, [wordKey, input, onClickModify])

  const handleResetInput = useCallback(() => {
    setInput(originalInput)
  }, [originalInput])

  return (
    <Fragment>
      <StyledTextField
        value={input}
        onChange={setInput}
        placeholder={privatelyGetPlaceholder(wordKey)}
      />
      {input !== originalInput && (
        <StyledIconButtonAtom
          jsxElementButton={<CheckIcon />}
          onClick={handleClickModify}
        />
      )}
      {input !== originalInput && (
        <StyledIconButtonAtom
          jsxElementButton={<ClearIcon />}
          onClick={handleResetInput}
        />
      )}
    </Fragment>
  )
}

export default WordCardEditingTextField