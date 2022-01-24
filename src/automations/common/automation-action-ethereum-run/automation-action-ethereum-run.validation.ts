import * as yup from 'yup'

export const automationActionEthereumRunSchema = yup.object().shape({
  id: yup.string().required('Required'),
})
