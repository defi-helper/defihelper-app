import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(32, 'Looks wrong, Access ID must be 32 characters long')
    .required('Access ID is required'),

  secret: yup
    .string()
    .length(48, 'Looks wrong, Secret Key must be 48 characters long')
    .required('Secret Key Key is required'),
})
