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

  format: (amount?: string | number | null) => {
    const result = new BigNumber(amount || 0).toFormat(2)

    const [integerValue, floatValue] = result.split('.')

    return new BigNumber(floatValue).isZero() ? integerValue : result
  },

  formatSpecific: (num?: string | null) =>
    new BigNumber(num?.replace(',', '') || 0).toString(10),

  getPercentage: (
    count?: string | number | null,
    total?: string | number | null
  ) => {
    const percentageBN = new BigNumber(count ?? 0)
      .div(total ?? 1)
      .multipliedBy(100)

    return percentageBN.isFinite() ? percentageBN.integerValue().toNumber() : 0
  },

  total: (...numbers: Array<string | number | null>) =>
    numbers
      .reduce((acc, num) => acc.plus(num ?? 0), new BigNumber(0))
      .toString(10),

  estimateGas: <T extends { toString: () => string }>(
    value: T,
    options?: {
      gasSlippage?: number
    }
  ) =>
    new BigNumber(value.toString())
      .multipliedBy(options?.gasSlippage || 1.2)
      .toFixed(0),

  gte: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).isGreaterThanOrEqualTo(num2 || 0),

  gt: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).isGreaterThan(num2 || 0),

  eq: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).isEqualTo(num2 || 0),

  plus: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).plus(new BigNumber(num2 || 0)).toString(10),
}
