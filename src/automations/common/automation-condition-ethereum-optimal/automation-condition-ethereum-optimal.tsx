import clsx from 'clsx'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { AutomateActionType } from '~/graphql/_generated-types'
import { AutomationChooseButton } from '../automation-choose-button'
import { AutomationConditionActionsDialog } from '../automation-condition-actions-dialog'
import { AutomationForm } from '../automation-form'
import * as styles from './automation-condition-ethereum-optimal.css'
import { automationConditionEthereumOptimalSchema } from './automation-condition-ethereum-optimal.validation'

type FormValues = {
  id: string
}

export type AutomationConditionEthereumOptimalProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: FormValues
  actions: AutomateActionType[]
}

export const AutomationConditionEthereumOptimal: React.VFC<AutomationConditionEthereumOptimalProps> =
  (props) => {
    const { handleSubmit, formState, setValue, control } = useForm<FormValues>({
      resolver: yupResolver(automationConditionEthereumOptimalSchema),
      defaultValues: props.defaultValues,
    })

    const [openContractDialog] = useDialog(AutomationConditionActionsDialog)

    const handleChooseContract = async () => {
      try {
        const result = await openContractDialog({
          actions: props.actions,
        })

        setValue('id', result.id)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    return (
      <AutomationForm
        onSubmit={handleSubmit((formValues) =>
          props.onSubmit(JSON.stringify(formValues))
        )}
      >
        <Controller
          render={({ field }) => {
            const currentAction = props.actions.find(
              (action) => action.id === field.value
            )

            return (
              <AutomationChooseButton
                label="action"
                onClick={handleChooseContract}
                error={formState.errors.id?.message}
                className={clsx(styles.input, styles.contractButton)}
              >
                {(field.value && currentAction && (
                  <>
                    <Typography variant="body2" as="div">
                      {currentAction.paramsDescription}
                    </Typography>
                    <Typography
                      variant="body3"
                      as="div"
                      className={styles.protocol}
                    >
                      {currentAction.type}
                    </Typography>
                  </>
                )) ||
                  'Choose action'}
              </AutomationChooseButton>
            )
          }}
          name="id"
          control={control}
        />
        <Button type="submit">Submit</Button>
      </AutomationForm>
    )
  }
