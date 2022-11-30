import { DefaultValue } from 'recoil'

export const guardRecoilDefaultValue = (
  candidate: unknown,
): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true
  return false
}