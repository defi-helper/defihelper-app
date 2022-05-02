import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { StakingAutomatesContractFragmentFragment } from '~/api/_generated-types'
import { AutomationChooseButton } from '../automation-choose-button'
import { AutomationDeployContractDialog } from '../automation-deploy-contract-dialog'
import { AutomationForm } from '../automation-form'
import * as styles from './automation-action-ethereum-run.css'
import { automationActionEthereumRunSchema } from './automation-action-ethereum-run.validation'

type FormValues = {
  id: string
}

export type AutomationActionEthereumRunProps = {
  className?: string
  onSubmit: (formValues: string) => void
  onDeploy: () => Promise<StakingAutomatesContractFragmentFragment>
  contracts: StakingAutomatesContractFragmentFragment[]
  defaultValues?: FormValues
}

export const AutomationActionEthereumRun: React.VFC<AutomationActionEthereumRunProps> =
  (props) => {
    const {
      control,
      handleSubmit: reactHookSubmit,
      setValue,
      formState,
      watch,
      trigger,
    } = useForm<FormValues>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(automationActionEthereumRunSchema),
    })

    const [contracts, setContracts] = useState(props.contracts)

    const [openContractDialog] = useDialog(AutomationDeployContractDialog)

    const handleSubmit = (formValues: FormValues) => {
      props.onSubmit(JSON.stringify(formValues))
    }

    const handleChooseContract = async () => {
      try {
        const result = await openContractDialog({
          contracts: contracts.map(({ protocol, adapter, id }) => ({
            contract: adapter,
            protocol: protocol.name,
            id,
          })),
        })

        if (typeof result.id !== 'string') return

        setValue('id', result.id)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    const handleDeploy = async () => {
      try {
        const contract = await props.onDeploy()

        setValue('id', contract.id)
        setContracts([...contracts, contract])
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    const id = watch('id')

    useEffect(() => {
      if (!id) return

      trigger()
    }, [id, trigger])

    return (
      <AutomationForm onSubmit={reactHookSubmit(handleSubmit)}>
        <Controller
          render={({ field }) => {
            const currentContract = contracts.find(
              (contract) => contract.id === field.value
            )

            return (
              <AutomationChooseButton
                label="contract"
                onClick={handleChooseContract}
                error={formState.errors.id?.message}
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
        <Button onClick={handleDeploy} className={styles.input}>
          Deploy new
        </Button>
        <Button type="submit">Save</Button>
      </AutomationForm>
    )
  }
