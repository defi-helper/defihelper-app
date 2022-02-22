import * as yup from 'yup'

export const automationActionNotificationSchema = yup.object().shape({
  contact: yup
    .object()
    .shape({
      id: yup.string().required('Required'),
    })
    .required('Required'),
  message: yup
    .string()
    .max(300, 'The maximum length of a text message is 300 characters')
    .required('Required'),
})
