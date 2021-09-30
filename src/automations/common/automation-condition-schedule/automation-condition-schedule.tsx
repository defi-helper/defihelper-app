import { useForm } from 'react-hook-form'
import { Button } from '~/common/button'

import { Input } from '~/common/input'
import * as styles from './automation-condition-schedule.css'

type FormValues = {
  weeks: string
  months: string
  days: string
  hours: string
  tz?: string
}

export type AutomationConditionScheduleProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: FormValues
}

export const AutomationConditionSchedule: React.FC<AutomationConditionScheduleProps> =
  (props) => {
    const { handleSubmit, register, formState } = useForm<FormValues>({
      defaultValues: props.defaultValues,
    })

    return (
      <form
        noValidate
        autoComplete="off"
        className={styles.root}
        onSubmit={handleSubmit((formValues) =>
          props.onSubmit(JSON.stringify(formValues))
        )}
      >
        <Input
          {...register('days', { required: true })}
          placeholder="Days"
          defaultValue={props.defaultValues?.days ?? '*'}
          helperText={formState.errors.days?.message}
          error={Boolean(formState.errors.days?.message)}
        />
        <Input
          {...register('hours', { required: true })}
          placeholder="Hours"
          defaultValue={props.defaultValues?.hours ?? '*'}
          helperText={formState.errors.hours?.message}
          error={Boolean(formState.errors.hours?.message)}
        />
        <Input
          {...register('months', { required: true })}
          placeholder="Months"
          defaultValue={props.defaultValues?.months ?? '*'}
          helperText={formState.errors.months?.message}
          error={Boolean(formState.errors.months?.message)}
        />
        <Input
          {...register('weeks', { required: true })}
          placeholder="Weeks"
          defaultValue={props.defaultValues?.weeks ?? '*'}
          helperText={formState.errors.weeks?.message}
          error={Boolean(formState.errors.weeks?.message)}
        />
        <Button type="submit">Submit</Button>
      </form>
    )
  }
