import * as yup from 'yup'

export const settingsIntegrationHuobiSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(36, 'Looks wrong, API key must be 37 characters long')
    .required('Access Key is required'),

  secret: yup
    .string()
    .length(32, 'Looks wrong, secret key must be 32 characters long')
    .required('Secret Key is required'),

  password: yup.string().required('Password is required'),
})
