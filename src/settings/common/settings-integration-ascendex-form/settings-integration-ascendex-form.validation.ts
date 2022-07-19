import * as yup from 'yup'

export const settingsIntegrationSchema = yup.object().shape({
  apiKey: yup.string().required('Public Key is required'),

  secret: yup.string().required('Api Secret Key is required'),
})
