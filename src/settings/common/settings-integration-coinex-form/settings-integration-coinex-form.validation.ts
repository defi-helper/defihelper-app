import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup.string().required('Access ID is required'),
  secret: yup.string().required('Secret Key Key is required'),
})
