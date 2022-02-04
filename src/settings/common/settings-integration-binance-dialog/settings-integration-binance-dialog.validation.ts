import * as yup from 'yup'

export const settingsIntegrationBinanceSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(64, 'Looks wrong, API key must be 64 characters long')
    .required('API key is required'),

  apiSecret: yup
    .string()
    .length(64, 'Looks wrong, secret key must be 64 characters long')
    .required('Secret key is required'),
})
