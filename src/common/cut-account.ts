export const cutAccount = (account?: string | null) => {
  if (!account) return ''

  return `${account.substring(0, 6)}...${account.substring(
    account.length - 4,
    account.length
  )}`
}
