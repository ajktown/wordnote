import StyledIconButtonNewPage from '@/atoms/StyledIconButtonNewPage'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { PageConst } from '@/constants/pages.constant'
import { usePostWord } from '@/hooks/words/use-post-word.hook'
import { isSignedInSelector } from '@/recoil/app/app.selectors'
import { sharedWordFamily } from '@/recoil/shared-resource/shared-resource.state'
import { Stack } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  wordId: string
}
const SharedWordCardAddWordButtonPart: FC<Props> = ({ wordId }) => {
  const sharedWord = useRecoilValue(sharedWordFamily(wordId))
  const [loading, onPostWord] = usePostWord()
  const [isAdded, setAdded] = useState(false)
  const isSignedIn = useRecoilValue(isSignedInSelector)

  const onClick = useCallback(async () => {
    try {
      if (!sharedWord) return
      if (!sharedWord.word) return

      await onPostWord({
        isFavorite: false,
        isArchived: false,
        term: sharedWord.word.term,
        pronunciation: sharedWord.word.pronunciation,
        definition: sharedWord.word.definition,
        subDefinition: sharedWord.word.subDefinition,
        example: sharedWord.word?.example,
        exampleLink: ``,
        tags: [],
      })

      // since it is added, it should be already added.
      setAdded(true)
    } catch {}
  }, [sharedWord, onPostWord])

  if (!isSignedIn)
    return (
      <Stack alignItems="center" direction="row">
        <StyledTextButtonAtom
          isDisabled
          title={`Sign in to add this word in your list`}
        />
        <StyledIconButtonNewPage
          link={PageConst.Welcome}
          hoverMessage="To sign in page"
        />
      </Stack>
    )

  if (isAdded)
    return <StyledTextButtonAtom isDisabled title={`Already added`} />

  return (
    <StyledTextButtonAtom
      onClick={onClick}
      isLoading={loading}
      isDisabled={!sharedWord?.word}
      title={`Add this word into your list`}
    />
  )
}

export default SharedWordCardAddWordButtonPart
