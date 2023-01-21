import { atomFamily } from 'recoil'
import { RecoilKeySuffix } from './index.keys'

enum TagRecoilKey {
  SelectedTag = `SelectedTag`,
}

export const selectedTagFamily = atomFamily<boolean, string>({
  key: TagRecoilKey.SelectedTag + RecoilKeySuffix.Family,
  default: false,
})
