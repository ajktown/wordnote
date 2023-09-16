import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import StyledTextField from '@/atoms/StyledTextField'
import { FC, Fragment, useCallback, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { useRecoilCallback } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import StyledDialog from '@/organisms/StyledDialog'
import { DialogContent, DialogTitle } from '@mui/material'
import { useDynamicFocus } from '@/hooks/use-dynamic-focus.hook'
import { semesterDetailsFamily } from '@/recoil/words/semesters.state'

interface Props {
  wordId: string
}
const WordCardAddTagButton: FC<Props> = ({ wordId }) => {
  const [isAddingMode, setAddingMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(``)
  const onPutWord = usePutWord(wordId)

  const onClickOpen = useCallback(async () => setAddingMode(true), [])
  const [inputRef, onClickOpenWithFocus] = useDynamicFocus(onClickOpen)
  const onResetInput = useCallback(() => {
    setInput(``)
    setAddingMode(false)
  }, [])

  /** onApply depends on onResetInput after successful api call*/
  const onApply = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        try {
          setLoading(true)

          const wordData = await snapshot.getPromise(wordsFamily(wordId))
          if (!wordData) throw new Error(`Word not found`)

          const tagSet = new Set(wordData.tags)
          tagSet.add(input)
          await onPutWord({ tags: Array.from(tagSet) })

          // Add the newly created tag to the semester details
          const semesterDetails = await snapshot.getPromise(
            semesterDetailsFamily(wordData.semester),
          )
          set(semesterDetailsFamily(wordData.semester), {
            ...semesterDetails,
            tags: Array.from(new Set([...semesterDetails.tags, input])),
          })

          onResetInput()
        } finally {
          setLoading(false)
        }
      },
    [input, onPutWord, onResetInput],
  )

  return (
    <Fragment>
      <StyledTagButtonAtom
        label={`+`}
        loading={loading}
        onClick={onClickOpenWithFocus}
      />
      {isAddingMode && (
        <StyledDialog
          visuals={{ maxWidth: `xs` }}
          onClose={loading ? undefined : onResetInput}
        >
          <DialogTitle>{`Insert your new tag name`}</DialogTitle>
          <DialogContent>
            <StyledTextField
              value={input}
              onChange={setInput}
              ref={inputRef}
              isAutoFocused
              buttons={{
                right: (
                  <StyledIconButtonAtom
                    jsxElementButton={<CheckIcon fontSize="small" />}
                    onClick={onApply}
                    isDisabled={loading || input.length === 0}
                  />
                ),
              }}
            />
          </DialogContent>
        </StyledDialog>
      )}
    </Fragment>
  )
}

export default WordCardAddTagButton
