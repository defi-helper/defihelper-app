import * as yup from 'yup'

export const billingFormSchema = yup.object().shape({
  amount: yup
    .string()
    .test((value) => Number(value) > 0)
    .required('Required'),
})
