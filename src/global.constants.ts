import { GlobalCountryIsoCode, GlobalLanguageCode } from "./global.interface"
import ISO6391 from 'iso-639-1'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

const PRIVATE_ACCEPTING_LANGUAGE_CODE_N_COUNTRY: [
  GlobalLanguageCode,
  GlobalCountryIsoCode,
][] = [
  [`ko`, GlobalCountryIsoCode.KoreaRepublicOf],
  [`en`, GlobalCountryIsoCode.UnitedStates],
  [`zh`, GlobalCountryIsoCode.China],
  [`ja`, GlobalCountryIsoCode.Japan],
  [`fr`, GlobalCountryIsoCode.France],
]

interface PrivateAvailableLanguage {
  code: GlobalLanguageCode
  name: string
  nativeName: string
  flagUnicode: string
  nativeNameWithFlag: string
}
export const PROTECTED_AVAILABLE_LANGUAGES: PrivateAvailableLanguage[] = 
  PRIVATE_ACCEPTING_LANGUAGE_CODE_N_COUNTRY.map(
    ([languageCode, countryCode]) => {
      const nativeName = ISO6391.getNativeName(languageCode)
      const flagUnicode = getUnicodeFlagIcon(countryCode)
      return {
        code: languageCode,
        name: ISO6391.getName(languageCode),
        nativeName,
        flagUnicode,
        nativeNameWithFlag: flagUnicode + ` ` + nativeName,
      }
    },
  )