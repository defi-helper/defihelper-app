import clsx from 'clsx'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import { AutomationChooseButton } from '../automation-choose-button'
import { AutomationDeployContractDialog } from '../automation-deploy-contract-dialog'
import { AutomationForm } from '../automation-form'
import * as styles from './automation-action-ethereum-run.css'

type FormValues = {
  id: string
}

export type AutomationActionEthereumRunProps = {
  className?: string
  onSubmit: (formValues: string) => void
  onDeploy: () => void
  contracts: AutomationContractFragmentFragment[]
  defaultValues?: FormValues
}

export const AutomationActionEthereumRun: React.VFC<AutomationActionEthereumRunProps> =
  (props) => {
    const {
      control,
      handleSubmit: reactHookSubmit,
      setValue,
    } = useForm<FormValues>({
      defaultValues: props.defaultValues,
    })

    const [openContractDialog] = useDialog(AutomationDeployContractDialog)

    const handleSubmit = (formValues: FormValues) => {
      props.onSubmit(JSON.stringify(formValues))
    }

    const handleChooseContract = async () => {
      const contracts = props.contracts.map(({ protocol, adapter, id }) => ({
        contract: adapter,
        protocol: protocol.name,
        contractInterface: id,
      }))

      try {
        const result = await openContractDialog({
          contracts,
        })

        if (typeof result.contractInterface !== 'string') return

        setValue('id', result.contractInterface)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    return (
      <AutomationForm onSubmit={reactHookSubmit(handleSubmit)}>
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
        <Button onClick={props.onDeploy} className={styles.input}>
          Deploy new
        </Button>
        <Button type="submit">Save</Button>
      </AutomationForm>
    )
  }
