import * as yup from 'yup'

export const settingsIntegrationBinanceSchema = yup.object().shape({
  apiKey: yup.string().required('API Key is required'),

  secret: yup.string().required('Secret Key is required'),
})
