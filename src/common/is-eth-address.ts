import memoize from 'fast-memoize'

const REGEX = /^0x[a-fA-F0-9]{40}$/g

export const isEthAddress = memoize((address: string) =>
  REGEX.test(address)
) as {
  (address: string): boolean
  regex: RegExp
}

isEthAddress.regex = REGEX
