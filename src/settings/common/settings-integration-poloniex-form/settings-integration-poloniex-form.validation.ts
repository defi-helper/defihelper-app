import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup.string().required('API key is required'),
  secret: yup.string().required('Api Secret Key is required'),
})
