import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(32, 'Looks wrong, API key must be 32111 characters long')
    .required('Public Key is required'),

  secret: yup
    .string()
    .length(64, 'Looks wrong, secret key must be 64 characters long')
    .required('Api Secret Key is required'),
})
