import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledChip from '@/atoms/StyledChip'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { isFavoriteClickedSelector } from '@/states/words/words.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

const TagChipFavorite: FC = () => {
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedSelector)

  const [loading, onGetWords] = useWords()

  const onClick = useCallback(async () => {
    try {
      await onGetWords({ isFavorite: !isFavoriteClicked ? true : undefined })
    } catch {}
  }, [isFavoriteClicked, onGetWords])

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isFavoriteClicked ? `filled` : `outlined`),
    [isFavoriteClicked],
  )

  return (
    <StyledChip
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

export default TagChipFavorite
