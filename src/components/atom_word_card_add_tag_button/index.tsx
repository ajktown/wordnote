import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import StyledTextField from '@/atoms/StyledTextField'
import { FC, Fragment, useCallback, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { useRecoilCallback } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'

interface Props {
  wordId: string
}
const WordCardAddTagButton: FC<Props> = ({ wordId }) => {
  const [isAddingMode, setAddingMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(``)
  const onPutWord = usePutWord(wordId)

  const onClickOpen = useCallback(async () => setAddingMode(true), [])

  const onResetInput = useCallback(() => {
    setInput(``)
    setAddingMode(false)
  }, [])

  /** onApply depends on onResetInput after successful api call*/
  const onApply = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        try {
          setLoading(true)

          const wordData = await snapshot.getPromise(wordsFamily(wordId))
          if (!wordData) throw new Error(`Word not found`)

          const tagSet = new Set(wordData.tags)
          tagSet.add(input)
          await onPutWord({ tags: Array.from(tagSet) })
          onResetInput()
        } finally {
          setLoading(false)
        }
      },
    [input, onPutWord, onResetInput],
  )

  if (isAddingMode) {
    return (
      <StyledTextField
        value={input}
        onChange={setInput}
        buttons={{
          right: (
            <Fragment>
              <StyledIconButtonAtom
                jsxElementButton={<CheckIcon fontSize="small" />}
                onClick={onApply}
                isDisabled={loading}
              />
              <StyledIconButtonAtom
                jsxElementButton={<ClearIcon fontSize="small" />}
                onClick={onResetInput}
                isDisabled={loading}
              />
            </Fragment>
          ),
        }}
      />
    )
  }
  return (
    <StyledTagButtonAtom label={`+`} loading={loading} onClick={onClickOpen} />
  )
}

export default WordCardAddTagButton
