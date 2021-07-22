import BigNumber from 'bignumber.js'

export const bignumberUtils = {
  fromCall: (amount: string | number, decimals: number) =>
    new BigNumber(amount || 0)
      .div(new BigNumber(10).pow(decimals))
      .toString(10),

  toSend: (amount: string | number, decimals: number) =>
    new BigNumber(amount || 0)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toString(10),

  format: (amount?: string | number | null) =>
    new BigNumber(amount || 0).toFormat(2),
}
