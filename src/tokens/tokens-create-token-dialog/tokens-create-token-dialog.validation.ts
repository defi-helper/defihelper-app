import * as yup from 'yup'

export const tokensCreateTokenSchema = yup.object().shape({
  name: yup.string().required(),
  symbol: yup.string().required(),
  decimals: yup.number().required(),
  alias: yup.string().required(),
  priceFeed: yup.object().required(),
})
