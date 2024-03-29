import { FC } from 'react'
import KoNaverDictionaryLinkButton from './ko-naver.dict-link-button'
import EnKoNaverDictionaryLinkButton from './en-ko.dict-link-button'
import ZhKoNaverDictionaryLinkButton from './zh-ko-naver.dict-link-button'
import JaKoNaverDictionaryLinkButton from './ja-ko-naver.dict-link-button'
import EnDictionaryDotComDictLinkButton from './en-dictionary-dot-com.dict-link-button'
import EnUrbanDictionaryDictLinkButton from './en-urban-dictionary.dict-link-button'
import AllLangsGoogleDictLinkButton from './all-langs-google.dict-link-button'
import KoJaNaverDictionaryLinkButton from './ko-ja-naver.dict-link-button'
import JaEnDeeplDictLinkButton from './ja-en-deepl.dict-link-button'
import { Stack } from '@mui/material'

interface Props {
  wordId: string
}
const DictLinkButtonChunk: FC<Props> = ({ wordId }) => {
  return (
    <Stack direction={`row`} alignItems={`center`}>
      <AllLangsGoogleDictLinkButton wordId={wordId} />
      <KoNaverDictionaryLinkButton wordId={wordId} />
      <EnKoNaverDictionaryLinkButton wordId={wordId} />
      <ZhKoNaverDictionaryLinkButton wordId={wordId} />
      <JaKoNaverDictionaryLinkButton wordId={wordId} />
      <KoJaNaverDictionaryLinkButton wordId={wordId} />
      <EnDictionaryDotComDictLinkButton wordId={wordId} />
      <EnUrbanDictionaryDictLinkButton wordId={wordId} />
      <JaEnDeeplDictLinkButton wordId={wordId} />
    </Stack>
  )
}

export default DictLinkButtonChunk
