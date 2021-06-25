import { arrayify } from '@ethersproject/bytes'
import { keccak256 } from '@ethersproject/keccak256'

// https://github.com/ethers-io/ethers.js/blob/d9d438a119bb11f8516fc9cf02c534ab3816fcb3/packages/address/src.ts/index.ts
export function normalizeAccount(_address: string): string {
  const address = _address.substring(0, 2) === '0x' ? _address : `0x${_address}`
  const chars = address.toLowerCase().substring(2).split('')

  const charsArray = new Uint8Array(40)
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 40; i++) {
    charsArray[i] = chars[i].charCodeAt(0)
  }
  const hashed = arrayify(keccak256(charsArray))

  for (let i = 0; i < 40; i += 2) {
    // eslint-disable-next-line no-bitwise
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase()
    }
    // eslint-disable-next-line no-bitwise
    if ((hashed[i >> 1] & 0x0f) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase()
    }
  }

  const addressChecksum = `0x${chars.join('')}`

  return addressChecksum
}
