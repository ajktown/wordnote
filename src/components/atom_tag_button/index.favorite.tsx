import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import {
  getWordsParamsState,
  isFavoriteClickedSelector,
} from '@/recoil/words/words.state'
import { FC, useMemo, useState } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

const TagButtonFavorite: FC = () => {
  const [loading, setLoading] = useState(false)
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedSelector)

  const handleGetWordIds = useWordIds()

  const variant: GlobalMuiTagVariant = useMemo(
    () => (isFavoriteClicked ? `filled` : `outlined`),
    [isFavoriteClicked],
  )

  const onClick = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        try {
          setLoading(true)

          const params: Partial<GetWordParams> = {
            ...(await snapshot.getPromise(getWordsParamsState)),
            ...(!isFavoriteClicked
              ? { isFavorite: true }
              : { isFavorite: undefined }),
          }

          await handleGetWordIds(params)
          set(getWordsParamsState, params)
        } finally {
          setLoading(false)
        }
      },
    [isFavoriteClicked, handleGetWordIds],
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
