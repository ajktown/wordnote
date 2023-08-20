import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { isFavoriteClickedSelector } from '@/recoil/words/words.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

const TagButtonFavorite: FC = () => {
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedSelector)

  const [loading, getWords] = useWords()

  const onClick = useCallback(async () => {
    try {
      await getWords({ isFavorite: !isFavoriteClicked ? true : undefined })
    } catch {}
  }, [isFavoriteClicked, getWords])

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isFavoriteClicked ? `filled` : `outlined`),
    [isFavoriteClicked],
  )

  return (
    <StyledTagButtonAtom
      label={
        <StyledIconButtonFavorite isClicked={isFavoriteClicked} size="small" />
      }
      loading={loading}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonFavorite
