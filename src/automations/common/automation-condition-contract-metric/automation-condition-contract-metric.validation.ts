import * as yup from 'yup'

export const automationConditionContractMetricSchema = yup.object().shape({
  protocol: yup.object().required('Required'),
  contract: yup.string().required('Required'),
  metric: yup.string().required('Required'),
  op: yup.string().required('Required'),
  value: yup.string().required('Required'),
})
