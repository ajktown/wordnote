import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { TextField } from '@mui/material'
import { FC, Fragment, useState, useCallback, ChangeEvent } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { WordDataModifiableKey } from '@/api/words/words.interface'

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

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  const handleClickModify = useCallback(() => {
    onClickModify(wordKey, input)
  }, [wordKey, input, onClickModify])

  const handleResetInput = useCallback(() => {
    setInput(originalInput)
  }, [originalInput])

  // TODO: use styled text field

  return (
    <Fragment>
      <TextField
        id="standard-basic"
        variant="standard"
        value={input}
        onChange={handleChange}
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