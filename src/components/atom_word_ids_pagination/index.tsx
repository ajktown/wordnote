import { useWordsByFavorite } from '@/hooks/words/use-words-by-favorite.hook'
import { useWords } from '@/hooks/words/use-words.hook'
import StyledPaginatorMolecule from '@/molecules/StyledPaginator'
import { isEveryFavoriteSelectedState } from '@/recoil/words/semesters.state'
import { wordIdsPagination } from '@/recoil/words/words.state'
import { FC, useCallback } from 'react'
import { useRecoilValue } from 'recoil'

const WordIdsPagination: FC = () => {
  const isEveryFavoriteSelected = useRecoilValue(isEveryFavoriteSelectedState)
  const pagination = useRecoilValue(wordIdsPagination)

  const [, onGetWords] = useWords()
  const [, onGetWordsByFavorite] = useWordsByFavorite()

  const onChange = useCallback(
    async (newPage: number) => {
      window.scrollTo(0, 0)
      if (isEveryFavoriteSelected) await onGetWordsByFavorite(newPage - 1)
      else await onGetWords({ pageIndex: newPage - 1 })
    },
    [isEveryFavoriteSelected, onGetWords, onGetWordsByFavorite],
  )

  if (!pagination) return null

  // Unnecessary to render if there is no pagination data
  if (!pagination.pageIndex && !pagination.isNextPageExist) return null

  return (
    <StyledPaginatorMolecule
      currentPageState={[pagination.pageIndex + 1, onChange]}
      totalCount={pagination.totalItems}
      eachPageCount={pagination.itemPerPage}
    />
  )
}

export default WordIdsPagination
