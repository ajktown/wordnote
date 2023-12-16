import { FC, useCallback } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import WordCardUnknown from './index.unknown'
import StyledSuspense from '@/organisms/StyledSuspense'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import { sharedWordFamily } from '@/recoil/shared-resource/shared-resource.state'
import WordCardSkeleton from './index.skeleton'
import TagButtonLanguage from '../atom_tag_button/index.language'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { PageConst } from '@/constants/pages.constant'
import { PageQueryConst } from '@/constants/page-queries.constant'

interface Props {
  wordId: string
}

const URL_PATH = `/` + PageConst.Share + `?` + PageQueryConst.wordID + `=`

const WordCardShared: FC<Props> = ({ wordId }) => {
  const sharedWord = useRecoilValue(sharedWordFamily(wordId))

  const onClickCopyUrl = useCallback(() => {
    const { origin } = window.location // like http://localhost:3000
    navigator.clipboard.writeText(origin + URL_PATH + wordId)
  }, [wordId])

  if (sharedWord === undefined) return <WordCardSkeleton />
  if (sharedWord === null) return <WordCardUnknown />

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {sharedWord.term}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {sharedWord.pronunciation}
          </Typography>
          <Typography variant="body2">
            {sharedWord.definition}
            <br />
          </Typography>
          <WordCardExamplePart word={sharedWord} />
        </CardContent>
        <CardActions>
          <TagButtonLanguage languageCode={sharedWord.languageCode} />
          <StyledTextButtonAtom title={`copy URL`} onClick={onClickCopyUrl} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardShared
