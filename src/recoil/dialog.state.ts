import { atom } from 'recoil'
import { RecoilKey } from './index.keys'

export enum DialogType {
  None = 'none',
  WordCard = 'wordCard',
}

export const dialogState = atom<DialogType>({
  key: RecoilKey.Dialog,
  default: DialogType.None,
})
