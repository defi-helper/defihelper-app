import * as yup from 'yup'

export const automationConditionEthereumGasPriceSchema = yup.object().shape({
  network: yup.string().required('Required'),
  tolerance: yup.string().required('Required'),
})
