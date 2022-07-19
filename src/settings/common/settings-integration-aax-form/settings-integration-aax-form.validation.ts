import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup.string().required('API Key is required'),
  secret: yup.string().required('API Secret Key is required'),
})
