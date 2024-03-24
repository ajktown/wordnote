import { FC, useCallback } from 'react'
import { Box, CardActions, CardContent, Typography } from '@mui/material'
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
}

const URL_PATH = `/` + PageConst.Share + `?` + PageQueryConst.wordID + `=`

const WordCardShared: FC<Props> = ({ wordId }) => {
  const sharedWord = useRecoilValue(sharedWordFamily(wordId))

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

  if (sharedWord === undefined) return <WordCardSkeleton />
  if (sharedWord === null || sharedWord.word === null)
    return <WordCardUnknown />

  return (
    <StyledSuspense>
      <CardContent>
        <Typography variant="h5" component="div">
          {sharedWord.word.term}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {sharedWord.word.pronunciation}
        </Typography>
        <Typography variant="body2">
          {sharedWord.word.definition}
          <br />
        </Typography>
        <WordCardExamplePart word={sharedWord.word} />
      </CardContent>
      <CardActions>
        <TagButtonLanguage
          languageCode={sharedWord.word.languageCode}
          clickDisabled
        />
        {sharedWord.word.tags.map((tag) => (
          <TagChipCustomized key={tag} label={tag} clickDisabled />
        ))}
        <StyledTextButtonAtom title={`copy URL`} onClick={onClickCopyUrl} />
        <Box mr={0.5} />
        <StyledCountdownTimer
          targetTime={sharedWord.sharedResource.expireInSecs}
          onHandleExpire={onHandleExpire}
        />
      </CardActions>
    </StyledSuspense>
  )
}

export default WordCardShared
