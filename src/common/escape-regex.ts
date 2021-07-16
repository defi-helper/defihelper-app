const REGEX = /[.*+?^${}()|[\]\\]/g

export const escapeRegex = (string: string) => string.replace(REGEX, '\\$&')
