import * as yup from 'yup'

export const settingsIntegrationHuobiSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(37, 'Looks wrong, API key must be 64 characters long')
    .required('Access Key is required'),

  apiSecret: yup
    .string()
    .length(32, 'Looks wrong, secret key must be 64 characters long')
    .required('Secret Key is required'),
})
