import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationConditionContractsDialogProps = {
  onConfirm: (contract: AutomationContractFragmentFragment) => void
  onCancel: () => void
  contracts: AutomationContractFragmentFragment[]
}

export const AutomationConditionContractsDialog: React.VFC<AutomationConditionContractsDialogProps> =
  (props) => {
    const handleOnChange =
      (contract: AutomationContractFragmentFragment) => () => {
        props.onConfirm(contract)
      }

    return (
      <AutomationDialog title="Choose contract" onBack={props.onCancel}>
        <AutomationSelectList>
          {props.contracts.map((contract) => (
            <AutomationSelectListItem
              key={contract.id}
              onClick={handleOnChange(contract)}
            >
              {contract.adapter}
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
