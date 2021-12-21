import * as yup from 'yup'

export const automationConditionEthereumSchema = yup.object().shape({
  network: yup.string().required('Required'),
  wallet: yup.string().required('Required'),
  op: yup.string().required('Required'),
  value: yup.string().required('Required'),
})
