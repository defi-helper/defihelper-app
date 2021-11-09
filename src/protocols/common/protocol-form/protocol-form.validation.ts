import * as yup from 'yup'

const linkSchema = yup
  .array()
  .of(
    yup.object().shape({
      name: yup.string().required(),
      value: yup.string().url('Must be url').required(),
    })
  )
  .optional()

export const protocolFormSchema = yup.object().shape({
  name: yup.string().required('Required'),
  adapter: yup.string().required('Required'),
  hidden: yup.bool().optional(),
  icon: yup.string().url('Must be url').optional(),
  link: yup.string().url('Must be url').optional(),
  description: yup.string().optional(),
  links: yup.object().shape({
    social: linkSchema,
    audit: linkSchema,
    other: linkSchema,
    listing: linkSchema,
  }),
})
