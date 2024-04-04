import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledChip from '@/atoms/StyledChip'
import { GlobalMuiTagVariant } from '@/global.interface'
import { FC, useMemo, useState } from 'react'
import { useWordsByFavorite } from '@/hooks/words/use-words-by-favorite.hook'
import { useWords } from '@/hooks/words/use-words.hook'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { isEveryFavoriteSelectedState } from '@/recoil/words/semesters.state'

const TagChipEveryFavorite: FC = () => {
  const isEveryFavoriteSelected = useRecoilValue(isEveryFavoriteSelectedState)
  const [loading, setLoading] = useState(false)

  const [, onGetWords] = useWords()
  const [, onGetWordsByFavorite] = useWordsByFavorite()

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isEveryFavoriteSelected ? `filled` : `outlined`),
    [isEveryFavoriteSelected],
  )

  const onClick = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        try {
          setLoading(true)
          const isEveryFavoriteSelected = await snapshot.getPromise(
            isEveryFavoriteSelectedState,
          )
          if (isEveryFavoriteSelected) await onGetWords()
          else await onGetWordsByFavorite()

          set(isEveryFavoriteSelectedState, !isEveryFavoriteSelected)
        } finally {
          setLoading(false)
        }
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
      loading={loading}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagChipEveryFavorite
