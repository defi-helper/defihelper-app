import { useGate, useStore } from 'effector-react'
import { MenuItem, TextField } from '@material-ui/core'
import { useState } from 'react'

import { Dialog } from '~/common/dialog'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import {
  AutomationContractForm,
  FormValues,
} from '../common/automation-contract-form'
import * as model from './automation-deploy-contract.model'
import * as styles from './automation-deploy-contract.css'

export type AutomationDeployContractProps = {
  onConfirm: (contract: AutomationContractFragmentFragment) => void
  onCancel: (error: unknown) => void
}

export const AutomationDeployContract: React.VFC<AutomationDeployContractProps> =
  (props) => {
    const [contract, setContract] = useState('')

    const automationContracts = useStore(model.$automateContracts)
    const loading = useStore(model.deployFx.pending)

    useGate(model.AutomationDeployContractGate)

    const currentContract = automationContracts.find(
      (automationContract) => contract === automationContract.contract
    )

    const handleSubmit = async (formValues: FormValues) => {
      if (!currentContract || !currentContract.address) return

      try {
        const result = await model.deployFx({
          address: currentContract.address,
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
        <TextField
          label="Contract"
          select
          value={contract}
          className={styles.input}
          onChange={(event) => setContract(event.target.value)}
        >
          {automationContracts.map(({ contract: contractName, protocol }) => (
            <MenuItem key={contractName} value={contractName}>
              protocol: {protocol}
              <br />
              contract: {contractName}
            </MenuItem>
          ))}
        </TextField>
        {currentContract && (
          <AutomationContractForm
            loading={loading}
            contract={currentContract}
            onSubmit={handleSubmit}
          />
        )}
      </Dialog>
    )
  }
