import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledChip from '@/atoms/StyledChip'
import { GlobalMuiTagVariant } from '@/global.interface'
import { FC, useMemo } from 'react'

const TagChipEveryFavorite: FC = () => {
  const isFavoriteClicked = true

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isFavoriteClicked ? `filled` : `outlined`),
    [isFavoriteClicked],
  )

  return (
    <StyledChip
      label={
        <StyledIconButtonFavorite isClicked={isFavoriteClicked} size="small" />
      }
      style={{
        variant,
      }}
    />
  )
}

export default TagChipEveryFavorite
