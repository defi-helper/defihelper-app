import { Controller, useForm } from 'react-hook-form'

import { ProposalTagEnum } from '~/graphql/_generated-types'
import { Dialog } from '~/common/dialog'
import { Button } from '~/common/button'
import { Select, SelectOption } from '~/common/select'
import { TAGS } from '../constants'
import * as styles from './roadmap-tag.css'

type FormValues = {
  tag: ProposalTagEnum
}

export type RoadmapTagProps = {
  loading?: boolean
  onConfirm: (formValues: FormValues) => void
  onCancel: () => void
  defaultValues?: Partial<FormValues>
}

export const RoadmapTag: React.VFC<RoadmapTagProps> = (props) => {
  const { handleSubmit, formState, control } = useForm<FormValues>({
    defaultValues: props.defaultValues,
  })

  const handleOnSubmit = (formValues: FormValues) => {
    props.onConfirm(formValues)
  }

  return (
    <Dialog className={styles.root}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Tag"
              defaultValue={props.defaultValues?.tag}
              disabled={props.loading}
              error={Boolean(formState.errors.tag)}
              helperText={formState.errors.tag?.message}
              className={styles.input}
            >
              {Object.entries(ProposalTagEnum).map(([label, value]) => (
                <SelectOption key={label} value={value}>
                  {TAGS[value]}
                </SelectOption>
              ))}
            </Select>
          )}
        />
        <div className={styles.actions}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            disabled={props.loading}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="red"
            size="small"
            disabled={props.loading}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
