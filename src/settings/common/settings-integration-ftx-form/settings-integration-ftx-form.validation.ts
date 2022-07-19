import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup.string().required('Api Key is required'),
  secret: yup.string().required('Secret Key is required'),
})
