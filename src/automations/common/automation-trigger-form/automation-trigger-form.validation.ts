import * as yup from 'yup'

import { AutomateTriggerTypeEnum } from '~/graphql/_generated-types'

export const automationTriggerFormSchema = yup.object().shape({
  wallet: yup.string().required(),
  type: yup.string().oneOf(Object.values(AutomateTriggerTypeEnum)).required(),
  name: yup.string().required(),
  network: yup.string().required(),
  address: yup.string().required(),
  event: yup.string().required(),
  active: yup.bool(),
})
