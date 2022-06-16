import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup
    .string()
    .length(40, 'Looks wrong, Api Key must be 32 characters long')
    .required('Api Key is required'),

  secret: yup
    .string()
    .length(40, 'Looks wrong, Secret Key must be 48 characters long')
    .required('Secret Key is required'),
})
