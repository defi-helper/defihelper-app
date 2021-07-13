import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { lazy, Suspense } from 'react'

import { ProposalStatusEnum } from '~/graphql/_generated-types'

const MarkdownEditor = lazy(() =>
  import('~/common/markdown-editor').then((c) => ({
    default: c.MarkdownEditor
  }))
)

type FormValues = {
  title: string
  description: string
  status: ProposalStatusEnum
}

export type ProposalFormProps = {
  loading: boolean
  onSubmit: (formValues: FormValues) => void
  defaultValues?: FormValues
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    '& > *': {
      margin: theme.spacing(2)
    }
  }
}))

export const ProposalForm: React.FC<ProposalFormProps> = (props) => {
  const classes = useStyles()

  const { register, handleSubmit, formState, setValue } = useForm<FormValues>()

  const status = props.defaultValues ? register('status') : null

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(props.onSubmit)}
      className={classes.root}
    >
      <TextField
        type="text"
        label="Title"
        defaultValue={props.defaultValues?.title}
        {...register('title')}
        disabled={props.loading}
        error={Boolean(formState.errors.title)}
        helperText={formState.errors.title?.message}
      />
      <Suspense fallback="loading...">
        <MarkdownEditor
          value={props.defaultValues?.description ?? ''}
          onChange={(value) => setValue('description', value)}
        />
      </Suspense>
      {status && (
        <TextField
          type="text"
          label="Status"
          defaultValue={props.defaultValues?.status ?? ProposalStatusEnum.Open}
          select
          disabled={props.loading}
          inputRef={status.ref}
          {...status}
          error={Boolean(formState.errors.status)}
          helperText={formState.errors.status?.message}
        >
          {Object.entries(ProposalStatusEnum).map(([label, value]) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={props.loading}
      >
        Submit
      </Button>
    </form>
  )
}
