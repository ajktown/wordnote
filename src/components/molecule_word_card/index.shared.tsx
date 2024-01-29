import { FC, useCallback } from 'react'
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import WordCardUnknown from './index.unknown'
import StyledSuspense from '@/organisms/StyledSuspense'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import { sharedWordFamily } from '@/recoil/shared-resource/shared-resource.state'
import WordCardSkeleton from './index.skeleton'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { PageConst } from '@/constants/pages.constant'
import { PageQueryConst } from '@/constants/page-queries.constant'
import StyledCountdownTimer from '@/atoms/StyledCountdownTimer'
import TagButtonLanguage from '../atom_tag_chip/index.language'
import TagChipCustomized from '../atom_tag_chip/index.customized'

interface Props {
  wordId: string
  clickDisabled?: boolean
}

const URL_PATH = `/` + PageConst.Share + `?` + PageQueryConst.wordID + `=`

const WordCardShared: FC<Props> = ({ wordId, clickDisabled }) => {
  const sharedData = useRecoilValue(sharedWordFamily(wordId))

  const onClickCopyUrl = useCallback(() => {
    const { origin } = window.location // like http://localhost:3000
    navigator.clipboard.writeText(origin + URL_PATH + wordId)
  }, [wordId])

  const onHandleExpire = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(sharedWordFamily(wordId), null)
      },
    [wordId],
  )

  if (sharedData === undefined) return <WordCardSkeleton />
  if (sharedData === null || sharedData.word === null)
    return <WordCardUnknown />

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {sharedData.word.term}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {sharedData.word.pronunciation}
          </Typography>
          <Typography variant="body2">
            {sharedData.word.definition}
            <br />
          </Typography>
          <WordCardExamplePart word={sharedData.word} />
        </CardContent>
        <CardActions>
          <TagButtonLanguage
            languageCode={sharedData.word.languageCode}
            clickDisabled
          />
          {sharedData.word.tags.map((tag) => (
            <TagChipCustomized
              key={tag}
              label={tag}
              clickDisabled={clickDisabled}
            />
          ))}

          <StyledTextButtonAtom title={`copy URL`} onClick={onClickCopyUrl} />
          <Box mr={0.5} />
          <StyledCountdownTimer
            targetTime={sharedData.sharedResource.expireInSecs}
            onHandleExpire={onHandleExpire}
          />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardShared
