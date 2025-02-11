import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledChip from '@/atoms/StyledChip'
import { GlobalMuiTagVariant } from '@/global.interface'
import { FC, useMemo } from 'react'
import { useWords } from '@/hooks/words/use-words.hook'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { isEveryFavoriteSelectedState } from '@/recoil/words/semesters.state'

const TagChipEveryFavorite: FC = () => {
  const isEveryFavoriteSelected = useRecoilValue(isEveryFavoriteSelectedState)
  const [loading, onGetWords] = useWords()

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isEveryFavoriteSelected ? `filled` : `outlined`),
    [isEveryFavoriteSelected],
  )

  const onClick = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        try {
          const newFlag = !(await snapshot.getPromise(
            isEveryFavoriteSelectedState,
          ))
          set(isEveryFavoriteSelectedState, newFlag)
          await onGetWords(undefined, newFlag)
        } catch {}
      },
    [],
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
