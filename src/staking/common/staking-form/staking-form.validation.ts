import * as yup from 'yup'

import { isEthAddress } from '~/common/is-eth-address'
import { isWavesAddress } from '~/common/is-waves-address'
import { BlockchainEnum } from '~/graphql/_generated-types'

export const stakingFormSchema = yup.object().shape({
  blockchain: yup
    .string()
    .oneOf([BlockchainEnum.Ethereum, BlockchainEnum.Waves])
    .required('Required'),
  network: yup.string().required('Required'),
  address: yup
    .string()
    .when('blockchain', {
      is: BlockchainEnum.Ethereum,
      then: yup.string().matches(isEthAddress.regex, 'Must be ethereum address')
    })
    .when('blockchain', {
      is: BlockchainEnum.Waves,
      then: yup.string().matches(isWavesAddress.regex, 'Must be waves address')
    })
    .required('Required'),
  adapter: yup.string().required('Required'),
  name: yup.string().required('Required'),
  description: yup.string().optional(),
  link: yup.string().url('Must be url').optional(),
  hidden: yup.bool().optional(),
  layout: yup.string().optional()
})
