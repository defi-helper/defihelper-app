import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(40, 'Looks wrong, API Key must be 26 characters long')
    .required('API Key is required'),

  secret: yup
    .string()
    .length(64, 'Looks wrong, API Secret must be 32 characters long')
    .required('API Secret Key is required'),

  uid: yup.string().required('Memo is required'),
})
