import { FC, Fragment } from 'react'
import KoNaverDictionaryLinkButton from './ko-naver.dict-link-button'
import EnKoNaverDictionaryLinkButton from './en-ko.dict-link-button'
import ZhKoNaverDictionaryLinkButton from './zh-ko-naver.dict-link-button'
import JaKoNaverDictionaryLinkButton from './ja-ko-naver.dict-link-button'
import EnDictionaryDotComDictLinkButton from './en-dictionary-dot-com.dict-link-button'

interface Props {
  wordId: string
}
const DictLinkButtonChunk: FC<Props> = ({ wordId }) => {
  return (
    <Fragment>
      <KoNaverDictionaryLinkButton wordId={wordId} />
      <EnKoNaverDictionaryLinkButton wordId={wordId} />
      <ZhKoNaverDictionaryLinkButton wordId={wordId} />
      <JaKoNaverDictionaryLinkButton wordId={wordId} />
      <EnDictionaryDotComDictLinkButton wordId={wordId} />
    </Fragment>
  )
}

export default DictLinkButtonChunk
