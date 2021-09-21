import { useGate, useStore } from 'effector-react'
import { ethers } from 'ethers'
import { useForm, Controller } from 'react-hook-form'
import { MenuItem, TextField } from '@material-ui/core'

import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Button } from '~/common/button'
import { isEthAddress } from '~/common/is-eth-address'
import * as model from './automation-deploy-contract.model'
import * as styles from './automation-deploy-contract.css'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'

type FormValues = {
  contract: string
  inputs: string[]
}

export type AutomationDeployContractProps = {
  onConfirm: (contract: AutomationContractFragmentFragment) => void
  onCancel: (error: unknown) => void
}

export const AutomationDeployContract: React.VFC<AutomationDeployContractProps> =
  (props) => {
    const {
      control,
      formState,
      watch,
      register,
      handleSubmit: reactHookSubmit,
    } = useForm<FormValues>()
    const automationContract = useStore(model.$automateContracts)
    const loading = useStore(model.deployFx.pending)

    const currentContract = automationContract.find(
      ({ contract }) => contract === watch('contract')
    )

    useGate(model.AutomationDeployContractGate)

    const handleSubmit = async (formValues: FormValues) => {
      try {
        const result = await model.deployFx({
          address: currentContract?.address,
          inputs: formValues.inputs,
          automate: currentContract,
        })

        props.onConfirm(result)
      } catch (error) {
        props.onCancel(error)
      }
    }

    return (
      <Dialog className={styles.root}>
        <form
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={reactHookSubmit(handleSubmit)}
        >
          <Controller
            render={({ field }) => (
              <TextField
                label="Contract"
                select
                {...field}
                helperText={formState.errors.contract?.message}
                error={Boolean(formState.errors.contract?.message)}
                value={field.value ?? ''}
                className={styles.input}
              >
                {automationContract.map(({ contract, protocol }) => (
                  <MenuItem key={contract} value={contract}>
                    protocol: {protocol}
                    <br />
                    contract: {contract}
                  </MenuItem>
                ))}
              </TextField>
            )}
            name="contract"
            control={control}
          />
          {currentContract &&
            new ethers.utils.Interface(currentContract.contractInterface)
              .getFunction('init')
              .inputs.map(({ name, type }, i) => (
                <Input
                  key={name}
                  type="text"
                  className={styles.input}
                  label={`${type} ${name}`}
                  {...register(`inputs.${i}`, {
                    required: true,
                    pattern:
                      type === 'address' ? isEthAddress.regex : undefined,
                  })}
                  helperText={formState.errors.inputs?.[i]?.message}
                  error={Boolean(formState.errors.inputs?.[i]?.message)}
                />
              ))}
          <Button type="submit" loading={loading}>
            Deploy
          </Button>
        </form>
      </Dialog>
    )
  }
