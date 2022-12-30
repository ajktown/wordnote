import ISO6391, { LanguageCode } from 'iso-639-1'

// TODO: At this point I am selecting only certain languages available, and will be extended later in the future.

const wordnoteAvailableLanguageCodes: LanguageCode[] = [
  `ko`,
  `en`,
  `zh`,
  `ja`,
  `fr`,
]

interface AvailableLanguage {
  code: LanguageCode
  name: string
  nativeName: string
}

export const PUBLIC_STATIC_AVAILABLE_LANGUAGES: AvailableLanguage[] =
  wordnoteAvailableLanguageCodes.map((languageCode) => ({
    code: languageCode,
    name: ISO6391.getName(languageCode),
    nativeName: ISO6391.getNativeName(languageCode),
  }))
