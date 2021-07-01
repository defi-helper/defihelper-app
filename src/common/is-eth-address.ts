const REGEX = /^0x[a-fA-F0-9]{40}$/g

export const isEthAddress = (address: string) => REGEX.test(address)

isEthAddress.regex = REGEX
