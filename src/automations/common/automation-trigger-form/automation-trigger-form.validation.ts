import * as yup from 'yup'

export const automationTriggerFormByEventSchema = yup.object().shape({
  wallet: yup.object().required(),
  name: yup.string().required(),
  network: yup.string().required(),
  event: yup.string().required(),
  protocol: yup.object().required(),
  contract: yup.object().required(),
  active: yup.bool(),
})

export const automationTriggerFormByTimeSchema = yup.object().shape({
  wallet: yup.object().required(),
  name: yup.string().required(),
})
