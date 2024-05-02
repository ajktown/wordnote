import { GlobalLanguageCode } from '@/global.interface'
import { DataBasics } from '../index.interface'

export interface IPreference extends DataBasics {
  id: string
  nativeLanguages: GlobalLanguageCode[]
  gptApiKey: string
}

export interface PreferenceModifiable {
  nativeLanguages: GlobalLanguageCode[]
  gptApiKey: string
}
