export const cutAccount = (
  account?: string | null,
  leftCharacters = 6,
  rightCharacters = 4
) => {
  if (!account) return ''

  return `${account.substring(0, leftCharacters)}...${account.substring(
    account.length - rightCharacters,
    account.length
  )}`
}
