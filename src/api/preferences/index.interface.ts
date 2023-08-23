import { GlobalLanguageCode } from '@/global.interface'
import { DataBasics } from '../index.interface'

export interface IPreference extends DataBasics {
  id: string
  nativeLanguages: GlobalLanguageCode[]
}
