import * as yup from 'yup'
import { isEthAddress } from '~/common/is-eth-address'

export const automationTriggerFormByEventSchema = yup.object().shape({
  wallet: yup.object().required('Required'),
  name: yup.string().required('Required'),
  network: yup.string().required('Required'),
  event: yup.string().required('Required'),
  address: yup
    .string()
    .required('Required')
    .matches(isEthAddress.regex, 'Check the address please'),
  active: yup.bool(),
})

export const automationTriggerFormByTimeSchema = yup.object().shape({
  wallet: yup.object().required('Required'),
  name: yup.string().required('Required'),
})
