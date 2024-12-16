import { GlobalCountryIsoCode, GlobalLanguageCode } from './global.interface'
import ISO6391 from 'iso-639-1'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

interface ProtectedAvailableLanguage {
  code: GlobalLanguageCode
  name: string
  nativeName: string
  flagUnicode: string
  nativeNameWithFlag: string
}

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

/** Only the list that PRIVATE_ACCEPTING_LANGUAGE_CODE_N_COUNTRY has */
export const PROTECTED_AVAILABLE_LANGUAGE_MAP = new Map<
  GlobalLanguageCode,
  ProtectedAvailableLanguage
>(
  PRIVATE_ACCEPTING_LANGUAGE_CODE_N_COUNTRY.map(
    ([languageCode, countryCode]) => {
      const nativeName = ISO6391.getNativeName(languageCode)
      const flagUnicode = getUnicodeFlagIcon(countryCode)

      return [
        languageCode,
        {
          code: languageCode,
          name: ISO6391.getName(languageCode),
          nativeName,
          flagUnicode,
          nativeNameWithFlag: flagUnicode + ` ` + nativeName,
        },
      ]
    },
  ),
)

/** Returns the full name of a language in its NATIVE Language
 * ko => 한국어
 * ja => 日本語
 * zh => 中文
 * en => English
 */
export const getLanguageFullName = (
  languageCode: GlobalLanguageCode,
): string => {
  const got = PROTECTED_AVAILABLE_LANGUAGE_MAP.get(languageCode)
  if (got !== undefined) return got.nativeNameWithFlag

  return `Unsupported Language`
}

export const getLanguageCountryEmoji = (
  languageCode: GlobalLanguageCode,
): string => {
  const got = PROTECTED_AVAILABLE_LANGUAGE_MAP.get(languageCode)
  if (got !== undefined) return got.flagUnicode

  return `` // just return empty string
}
