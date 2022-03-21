import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(18, 'Looks wrong, Access key must be 18 characters long')
    .required('Access Key is required'),

  secret: yup
    .string()
    .length(32, 'Looks wrong, secret key must be 32 characters long')
    .required('Secret Key is required'),
})
