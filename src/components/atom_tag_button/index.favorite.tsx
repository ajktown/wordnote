import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { isFavoriteClickedState } from '@/recoil/favorites.state'
import { tempFavoriteWordIdsState } from '@/recoil/words.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

const TagButtonFavorite: FC = () => {
  const [isFavoriteClicked, setFavoriteClicked] = useRecoilState(
    isFavoriteClickedState,
  )
  const resetTempFavoriteWordIds = useResetRecoilState(tempFavoriteWordIdsState)

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isFavoriteClicked ? `filled` : `outlined`),
    [isFavoriteClicked],
  )

  const onClick = useCallback(() => {
    resetTempFavoriteWordIds()
    setFavoriteClicked(!isFavoriteClicked)
  }, [isFavoriteClicked, setFavoriteClicked, resetTempFavoriteWordIds])

  return (
    <StyledTagButtonAtom
      label={`#Favorite`}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonFavorite
