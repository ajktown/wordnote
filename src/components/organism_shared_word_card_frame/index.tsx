import { FC, useEffect } from 'react'
import { Stack, Box, Typography } from '@mui/material'
import WordCardShared from '../molecule_word_card/index.shared'
import { useRouter } from 'next/router'
import { PageQueryConst } from '@/constants/page-queries.constant'
import { useSharedResource } from '@/hooks/shared-resources/use-shared-resource.hook'
import StyledCentered from '@/organisms/StyledCentered'
import SharedWordCardAddWordButtonPart from '../atom_shared_word_card_parts/index.add-word-button'
import { WordCardFrameStyle } from '../organism_word_card_frame/index.style'

const SharedWordCardFrame: FC = () => {
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
    <Stack width="100%" alignItems="center">
      <Stack {...WordCardFrameStyle}>
        <Typography variant="h5">
          {`Beta feature: Below is the shared word card`}
        </Typography>
        <Box mb={1} />
        <SharedWordCardAddWordButtonPart wordId={wordId.trim()} />
        {/* Body */}
        <Stack spacing={0.5} alignItems="center">
          <WordCardShared wordId={wordId.trim()} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SharedWordCardFrame
