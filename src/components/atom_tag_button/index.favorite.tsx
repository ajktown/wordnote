import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import { isFavoriteClickedSelector } from '@/recoil/words/tags.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

const TagButtonFavorite: FC = () => {
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedSelector)

  const [loading, handleGetWordIds] = useWordIds()

  const onClick = useCallback(() => {
    handleGetWordIds({ isFavorite: !isFavoriteClicked ? true : undefined })
  }, [isFavoriteClicked, handleGetWordIds])

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
