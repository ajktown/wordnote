import WordCardShared from '@/components/molecule_word_card/index.shared'
import { PageQueryConst } from '@/constants/page-queries.constant'
import { useSharedResource } from '@/hooks/shared-resources/use-shared-resource.hook'
import StyledCentered from '@/organisms/StyledCentered'
import { Stack, Typography } from '@mui/material'
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
      <Typography variant="h5" style={{ border: `3px solid yellow` }}>
        {`Beta feature: Below is the shared word card`}
      </Typography>
      <Stack minWidth={700} style={{ border: `3px solid red` }}>
        <WordCardShared wordId={wordId.trim()} />
      </Stack>
    </StyledCentered>
  )
}

export default SharePage
