import WordCardShared from '@/components/molecule_word_card/index.shared'
import { PageQueryConst } from '@/constants/page-queries.constant'
import { useSharedResource } from '@/hooks/shared-resources/use-shared-resource.hook'
import StyledCentered from '@/organisms/StyledCentered'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

const SharePage: FC = () => {
  const router = useRouter()
  const wordId = router.query[PageQueryConst.wordID]
  const onGetSharedResource = useSharedResource(wordId)

  useEffect(() => {
    onGetSharedResource()
  }, [onGetSharedResource])

  if (typeof wordId !== `string` || !wordId)
    return (
      <StyledCentered>
        <h3>{`I can't do this with given query: ${wordId}`}</h3>
      </StyledCentered>
    )
  return (
    <StyledCentered>
      <Stack>
        <WordCardShared wordId={wordId.trim()} />
        <h3>{`==========This is the wordId Query: ${wordId}==========`}</h3>
      </Stack>
    </StyledCentered>
  )
}

export default SharePage
