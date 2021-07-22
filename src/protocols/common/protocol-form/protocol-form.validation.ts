import * as yup from 'yup'

export const protocolFormSchema = yup.object().shape({
  name: yup.string().required('Required'),
  adapter: yup.string().required('Required'),
  hidden: yup.bool().optional(),
  icon: yup.string().url('Must be url').optional(),
  link: yup.string().url('Must be url').optional(),
  description: yup.string().optional(),
})
