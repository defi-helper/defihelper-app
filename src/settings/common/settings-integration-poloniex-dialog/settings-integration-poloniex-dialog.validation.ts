import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(35, 'Looks wrong, API key must be 32 characters long')
    .required('API key is required'),

  secret: yup
    .string()
    .length(128, 'Looks wrong, secret key must be 64 characters long')
    .required('Api Secret Key is required'),
})
