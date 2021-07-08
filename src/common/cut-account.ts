const explorers: Record<string | number, string> = {
  1: 'https://etherscan.io/address',
  waves: 'https://wavesexplorer.com/address'
}

export const cutAccount = (account?: string | null) => {
  if (!account) return

  return `${account.substring(0, 6)}...${account.substring(
    account.length - 4,
    account.length
  )}`
}

cutAccount.explorers = explorers
