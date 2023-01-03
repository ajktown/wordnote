import ISO6391 from 'iso-639-1'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { GlobalCountryIsoCode, GlobalLanguageCode } from '@/global.interface'

// TODO: At this point I am selecting only certain languages available, and will be extended later in the future.

const wordnoteAvailableLanguageCodeAndCountries: [
  GlobalLanguageCode,
  GlobalCountryIsoCode,
][] = [
  [`ko`, GlobalCountryIsoCode.KoreaRepublicOf],
  [`en`, GlobalCountryIsoCode.UnitedStates],
  [`zh`, GlobalCountryIsoCode.China],
  [`ja`, GlobalCountryIsoCode.Japan],
  [`fr`, GlobalCountryIsoCode.France],
]

interface AvailableLanguage {
  code: GlobalLanguageCode
  name: string
  nativeName: string
  flagUnicode: string
}

export const PUBLIC_STATIC_AVAILABLE_LANGUAGES: AvailableLanguage[] =
  wordnoteAvailableLanguageCodeAndCountries.map(
    ([languageCode, countryCode]) => ({
      code: languageCode,
      name: ISO6391.getName(languageCode),
      nativeName: ISO6391.getNativeName(languageCode),
      flagUnicode: getUnicodeFlagIcon(countryCode),
    }),
  )
