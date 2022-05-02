import * as yup from 'yup'

import { UserContactBrokerEnum } from '~/api/_generated-types'

export const settingsContactFormSchame = yup.object().shape({
  broker: yup
    .string()
    .oneOf(
      Object.values(UserContactBrokerEnum),
      'Type must be one of the following values: Email, Telegram'
    ),
  address: yup.string().when('broker', {
    is: UserContactBrokerEnum.Email,
    then: yup
      .string()
      .email('Please enter a valid email address')
      .required('Required'),
  }),
})
