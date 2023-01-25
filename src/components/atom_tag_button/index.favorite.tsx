import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { isFavoriteClickedState } from '@/recoil/favorites.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

const TagButtonFavorite: FC = () => {
  const [isFavoriteClicked, setFavoriteClicked] = useRecoilState(
    isFavoriteClickedState,
  )

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isFavoriteClicked ? `filled` : `outlined`),
    [isFavoriteClicked],
  )

  const onClick = useCallback(() => {
    setFavoriteClicked(!isFavoriteClicked)
  }, [isFavoriteClicked, setFavoriteClicked])

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
