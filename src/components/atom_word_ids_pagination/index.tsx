import { useWords } from '@/hooks/words/use-words.hook'
import StyledPaginatorMolecule from '@/molecules/StyledPaginator'
import { wordIdsPagination } from '@/recoil/words/words.state'
import { FC, useCallback } from 'react'
import { useRecoilValue } from 'recoil'

const WordIdsPagination: FC = () => {
  const pagination = useRecoilValue(wordIdsPagination)
  const [, handleWordIds] = useWords()

  const onChange = useCallback(
    async (newPage: number) => {
      await handleWordIds({ pageIndex: newPage - 1 })
      window.scrollTo(0, 0)
    },
    [handleWordIds],
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
