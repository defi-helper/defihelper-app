import { useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import * as styles from './search-dialog.css'

export type SearchDialogProps = {
  onConfirm: (search: string) => void
}

export const SearchDialog: React.FC<SearchDialogProps> = (props) => {
  const { register, formState, handleSubmit } = useForm<{ search: string }>()

  const handleOnSubmit = handleSubmit(async (formValues) => {
    props.onConfirm(formValues.search)
  })

  return (
    <Dialog className={styles.root}>
      <form
        noValidate
        autoComplete="off"
        className={styles.form}
        onSubmit={handleOnSubmit}
      >
        <Input
          {...register('search', { required: true })}
          className={styles.input}
          placeholder="Search"
          helperText={formState.errors.search?.message}
          error={Boolean(formState.errors.search?.message)}
          disabled={formState.isSubmitting}
        />
        <Button type="submit" loading={formState.isSubmitting}>
          Search
        </Button>
      </form>
    </Dialog>
  )
}
