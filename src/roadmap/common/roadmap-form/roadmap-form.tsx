import { Controller, useForm } from 'react-hook-form'
import { lazy, Suspense } from 'react'

import { ProposalStatusEnum, ProposalTagEnum } from '~/graphql/_generated-types'
import { Input } from '~/common/input'
import { Dialog } from '~/common/dialog'
import { Button } from '~/common/button'
import { Select, SelectOption } from '~/common/select'
import * as styles from './roadmap-form.css'
import { TAGS } from '~/roadmap/common'

const MarkdownEditor = lazy(() =>
  import('~/common/markdown-editor').then((c) => ({
    default: c.MarkdownEditor,
  }))
)

type FormValues = {
  title: string
  description: string
  tags: ProposalTagEnum[]
  status: ProposalStatusEnum
  plannedAt?: string | null
  releasedAt?: string | null
}

export type RoadmapFormProps = {
  loading?: boolean
  onConfirm: (formValues: FormValues) => void
  onCancel: () => void
  defaultValues?: FormValues
}

export const RoadmapForm: React.VFC<RoadmapFormProps> = (props) => {
  const { register, handleSubmit, formState, setValue, control } =
    useForm<FormValues>()

  const handleOnSubmit = (formValues: FormValues) => {
    props.onConfirm({
      ...formValues,
      plannedAt: formValues.plannedAt || null,
      releasedAt: formValues.releasedAt || null,
    })
  }

  return (
    <Dialog className={styles.root}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Input
          type="text"
          label="Request title"
          defaultValue={props.defaultValues?.title}
          {...register('title')}
          disabled={props.loading}
          error={Boolean(formState.errors.title)}
          helperText={formState.errors.title?.message}
          className={styles.input}
        />
        <Select
          label="Request tag"
          value={props.defaultValues?.tags[0]}
          onChange={({ target }) =>
            setValue('tags', [target.value as ProposalTagEnum])
          }
          className={styles.input}
        >
          {Object.entries(TAGS).map(([key, title]) => (
            <SelectOption key={key} value={key}>
              {title}
            </SelectOption>
          ))}
        </Select>
        <Suspense fallback="loading...">
          <MarkdownEditor
            value={props.defaultValues?.description ?? ''}
            onChange={(value) => setValue('description', value)}
            label="Your request"
            className={styles.input}
          />
        </Suspense>
        {props.defaultValues && (
          <Input
            type="date"
            label="Planned at"
            defaultValue={props.defaultValues?.plannedAt || ''}
            {...register('plannedAt')}
            disabled={props.loading}
            error={Boolean(formState.errors.plannedAt)}
            helperText={formState.errors.plannedAt?.message}
            className={styles.input}
          />
        )}
        {props.defaultValues && (
          <Input
            type="date"
            label="Released at"
            defaultValue={props.defaultValues?.releasedAt || ''}
            {...register('releasedAt')}
            disabled={props.loading}
            error={Boolean(formState.errors.releasedAt)}
            helperText={formState.errors.releasedAt?.message}
            className={styles.input}
          />
        )}
        {props.defaultValues && (
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Status"
                defaultValue={
                  props.defaultValues?.status ?? ProposalStatusEnum.Open
                }
                disabled={props.loading}
                error={Boolean(formState.errors.status)}
                helperText={formState.errors.status?.message}
                className={styles.input}
              >
                {Object.entries(ProposalStatusEnum).map(([label, value]) => (
                  <SelectOption key={label} value={value}>
                    {label}
                  </SelectOption>
                ))}
              </Select>
            )}
          />
        )}
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
