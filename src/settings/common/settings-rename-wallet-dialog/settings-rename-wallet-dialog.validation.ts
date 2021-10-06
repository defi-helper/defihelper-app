import * as yup from 'yup'

export const settingsRenameSchema = yup.object().shape({
  name: yup.string().required('Required'),
})
