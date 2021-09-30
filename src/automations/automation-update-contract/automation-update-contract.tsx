import { useStore } from 'effector-react'

import { Dialog } from '~/common/dialog'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import {
  AutomationContractForm,
  FormValues,
} from '../common/automation-contract-form'
import { Automates } from '../common/automation.types'
import { safeJsonParse } from '../common/safe-json-parse'
import * as styles from './automation-update-contract.css'
import * as model from './automation-update-contract.model'

export type AutomationUpdateContractProps = {
  onConfirm: (contract: AutomationContractFragmentFragment) => void
  onCancel: (error: unknown) => void
  contract: AutomationContractFragmentFragment
  automateContract: Automates
}

export const AutomationUpdateContract: React.VFC<AutomationUpdateContractProps> =
  (props) => {
    const loading = useStore(model.deployFx.pending)

    const handleSubmit = async (formValues: FormValues) => {
      try {
        const result = await model.deployFx({
          contractId: props.contract.id,
          address: props.automateContract.address,
          automate: props.automateContract,
          inputs: formValues.inputs,
        })

        props.onConfirm(result)
      } catch (error) {
        props.onCancel(error)
      }
    }

    return (
      <Dialog className={styles.root}>
        <AutomationContractForm
          contract={props.automateContract}
          defaultValues={safeJsonParse(props.contract.initParams)}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Dialog>
    )
  }
