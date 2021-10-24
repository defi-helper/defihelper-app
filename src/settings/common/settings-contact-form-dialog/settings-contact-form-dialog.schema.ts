import * as yup from 'yup'

import { UserContactBrokerEnum } from '~/graphql/_generated-types'

export const settingsContactFormSchame = yup.object().shape({
  name: yup.string().required('Required'),
  broker: yup
    .string()
    .oneOf(Object.values(UserContactBrokerEnum))
    .required('Required'),
  address: yup.string().when('broker', {
    is: UserContactBrokerEnum.Email,
    then: yup.string().email().required('Required'),
  }),
})
