import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(56, 'Looks wrong, Api Key must be 56 characters long')
    .required('Api Key is required'),

  secret: yup
    .string()
    .length(100, 'Looks wrong, Secret Key must be 100 characters long')
    .required('Secret Key is required'),
})
