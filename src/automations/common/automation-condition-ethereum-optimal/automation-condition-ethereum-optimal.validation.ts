import * as yup from 'yup'

export const automationConditionEthereumOptimalSchema = yup.object().shape({
  id: yup.string().required('Required'),
})
