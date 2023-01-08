import { GlobalCountryIsoCode, GlobalLanguageCode } from "./global.interface"

export const PROTECTED_ACCEPTING_LANGUAGE_CODE_N_COUNTRY: [
  GlobalLanguageCode,
  GlobalCountryIsoCode,
][] = [
  [`ko`, GlobalCountryIsoCode.KoreaRepublicOf],
  [`en`, GlobalCountryIsoCode.UnitedStates],
  [`zh`, GlobalCountryIsoCode.China],
  [`ja`, GlobalCountryIsoCode.Japan],
  [`fr`, GlobalCountryIsoCode.France],
]