export const pluralize = (count: number, word: string, suffix = 's') =>
  `${word}${count !== 1 ? suffix : ''}`
