import BigNumber from 'bignumber.js'

export const bignumberUtils = {
  fromCall: (amount: string | number, decimals: number) =>
    new BigNumber(amount || 0)
      .div(new BigNumber(10).pow(decimals))
      .toString(10),

  toSend: (amount: string | number, decimals: number) =>
    new BigNumber(amount || 0)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toFixed(0),

  format: (amount?: string | number | null, decimal = 2, negative = true) => {
    const result = new BigNumber(amount || 0)

    const localDecimal = result.isInteger() ? 0 : decimal

    if (result.isNaN() || (negative && result.isLessThan(0))) return '0'

    if (result.lt('10')) return result.toFormat(localDecimal)

    if (result.lt('10000')) return result.toFormat(0)

    if (result.lt('100000')) return result.toFormat(0)

    if (result.lt('1000000')) return result.toFormat(0)

    return result.toFormat(0)
  },

  formatMax: (
    amount: string | number | null | undefined,
    max = 10000,
    negative = false
  ) => {
    return bignumberUtils.gt(amount, max)
      ? `${bignumberUtils.format(max)}+`
      : bignumberUtils.format(amount, 2, negative)
  },

  getPercentage: (
    count?: string | number | null,
    total?: string | number | null
  ) => {
    const percentageBN = new BigNumber(count ?? 0)
      .div(total ?? 1)
      .multipliedBy(100)

    return percentageBN.isFinite() ? percentageBN.toNumber() : 0
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

  floor: (num?: string | number | null) => new BigNumber(num || 0).toFixed(0),

  gte: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).isGreaterThanOrEqualTo(num2 || 0),

  gt: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).isGreaterThan(num2 || 0),

  lt: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).isLessThan(num2 || 0),

  lte: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).isLessThanOrEqualTo(num2 || 0),

  eq: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).isEqualTo(num2 || 0),

  plus: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).plus(new BigNumber(num2 || 0)).toString(10),

  minus: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).minus(new BigNumber(num2 || 0)).toString(10),

  mul: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).multipliedBy(num2 || 0).toString(10),

  div: (num1?: string | number | null, num2?: string | number | null) =>
    new BigNumber(num1 || 0).div(num2 || 1).toString(10),

  isNaN: (num?: string | number | null) => new BigNumber(num || 0).isNaN(),
}
