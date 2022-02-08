import * as yup from 'yup'

export const automationTriggerFormByEventSchema = yup.object().shape({
  wallet: yup.object().required('Required'),
  name: yup.string().required('Required'),
  network: yup.string().required('Required'),
  event: yup.string().required('Required'),
  protocol: yup.object().required('Required'),
  contract: yup.object().required('Required'),
  active: yup.bool(),
})

export const automationTriggerFormByTimeSchema = yup.object().shape({
  wallet: yup.object().required('Required'),
  name: yup.string().required('Required'),
})
