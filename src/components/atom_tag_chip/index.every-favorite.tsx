import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledChip from '@/atoms/StyledChip'
import { GlobalMuiTagVariant } from '@/global.interface'
import { FC, useMemo } from 'react'
import { useWordsByFavorite } from '@/hooks/words/use-words-by-favorite.hook'
import { useWords } from '@/hooks/words/use-words.hook'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { isEveryFavoriteSelectedState } from '@/recoil/words/semesters.state'

const TagChipEveryFavorite: FC = () => {
  const isEveryFavoriteSelected = useRecoilValue(isEveryFavoriteSelectedState)

  const [, onGetWordsByFavorite] = useWordsByFavorite()
  const [, onGetWords] = useWords()

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isEveryFavoriteSelected ? `filled` : `outlined`),
    [isEveryFavoriteSelected],
  )

  const onClick = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        try {
          const isEveryFavoriteSelected = await snapshot.getPromise(
            isEveryFavoriteSelectedState,
          )
          if (isEveryFavoriteSelected) await onGetWords()
          else await onGetWordsByFavorite()

          set(isEveryFavoriteSelectedState, !isEveryFavoriteSelected)
        } catch {}
      },
    [onGetWords, onGetWordsByFavorite],
  )

  return (
    <StyledChip
      label={
        <StyledIconButtonFavorite
          isClicked={isEveryFavoriteSelected}
          size="small"
        />
      }
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagChipEveryFavorite
