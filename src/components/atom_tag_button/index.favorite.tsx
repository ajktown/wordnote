import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import { isFavoriteClickedState } from '@/recoil/words/favorites.state'
import { FC, useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'

const TagButtonFavorite: FC = () => {
  const [loading, setLoading] = useState(false)
  const [isFavoriteClicked, setFavoriteClicked] = useRecoilState(
    isFavoriteClickedState,
  )
  const handleGetWordIds = useWordIds()

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isFavoriteClicked ? `filled` : `outlined`),
    [isFavoriteClicked],
  )

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      const modifyingToIsFavoriteClicked = !isFavoriteClicked
      await handleGetWordIds({
        ...(modifyingToIsFavoriteClicked ? { isFavorite: true } : {}),
      })
      setFavoriteClicked(modifyingToIsFavoriteClicked)
    } finally {
      setLoading(false)
    }
  }, [isFavoriteClicked, setFavoriteClicked, handleGetWordIds])

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
