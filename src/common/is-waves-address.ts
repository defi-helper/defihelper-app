const REGEX = /^[a-zA-Z0-9]{35}$/g

export const isWavesAddress = (address: string) => REGEX.test(address)

isWavesAddress.regex = REGEX
