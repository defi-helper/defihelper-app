import * as yup from 'yup'

export const automationActionNotificationSchema = yup.object().shape({
  contact: yup
    .object()
    .shape({
      id: yup.string().required('Required'),
    })
    .required('Required'),
  message: yup.string().required('Required'),
})
