/**
 * 
 * @param hexLength (Default: 6)
 * @returns hex string
 */

const PRIVATE_FINAL_DEFAULT_HEX_LENGTH: number = 6

export const getRandomHexHandler = (hexLength?: number): string => {
  // The maximum hax length must be 1 or longer.
  hexLength = Math.max(1, hexLength || PRIVATE_FINAL_DEFAULT_HEX_LENGTH)

  // 16 => Hex; 16 ^ number of hexLength
  return Math.floor(Math.random()*Math.pow(16, hexLength)).toString(16)
}