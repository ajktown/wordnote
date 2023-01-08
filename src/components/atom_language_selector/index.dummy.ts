import ISO6391 from 'iso-639-1'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { GlobalLanguageCode } from '@/global.interface'
import { PROTECTED_ACCEPTING_LANGUAGE_CODE_N_COUNTRY } from '@/global.constants'

interface AvailableLanguage {
  code: GlobalLanguageCode
  name: string
  nativeName: string
  flagUnicode: string
}

export const PUBLIC_STATIC_AVAILABLE_LANGUAGES: AvailableLanguage[] =
  PROTECTED_ACCEPTING_LANGUAGE_CODE_N_COUNTRY.map(
    ([languageCode, countryCode]) => ({
      code: languageCode,
      name: ISO6391.getName(languageCode),
      nativeName: ISO6391.getNativeName(languageCode),
      flagUnicode: getUnicodeFlagIcon(countryCode),
    }),
  )
