import clsx from 'clsx'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import { AutomationChooseButton } from '../automation-choose-button'
import { AutomationConditionContractsDialog } from '../automation-condition-contracts-dialog'
import { AutomationForm } from '../automation-form'
import * as styles from './automation-condition-ethereum-optimal.css'

type FormValues = {
  id: string
}

export type AutomationConditionEthereumOptimalProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: FormValues
  contracts: AutomationContractFragmentFragment[]
}

export const AutomationConditionEthereumOptimal: React.VFC<AutomationConditionEthereumOptimalProps> =
  (props) => {
    const { handleSubmit, setValue, control } = useForm<FormValues>({
      defaultValues: props.defaultValues,
    })

    const [openContractDialog] = useDialog(AutomationConditionContractsDialog)

    const handleChooseContract = async () => {
      try {
        const result = await openContractDialog({
          contracts: props.contracts,
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
            const currentContract = props.contracts.find(
              (contract) => contract.id === field.value
            )

            return (
              <AutomationChooseButton
                label="contract"
                onClick={handleChooseContract}
                className={clsx(styles.input, styles.contractButton)}
              >
                {(field.value && currentContract && (
                  <>
                    <Typography variant="body2" as="div">
                      {currentContract.adapter}
                    </Typography>
                    <Typography
                      variant="body3"
                      as="div"
                      className={styles.protocol}
                    >
                      {currentContract.protocol.name}
                    </Typography>
                  </>
                )) ||
                  'Choose contract'}
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
