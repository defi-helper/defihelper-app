import * as yup from 'yup'

import { isEthAddress } from '~/common/is-eth-address'

export const automationConditionEthereumSchema = yup.object().shape({
  network: yup.string().required('Required'),
  wallet: yup
    .string()
    .matches(isEthAddress.regex, 'Must be address')
    .required('Required'),
  op: yup.string().required('Required'),
  value: yup.string().required('Required'),
})
