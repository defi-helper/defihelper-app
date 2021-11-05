import { Contract } from '~/automations/common/automation.types'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationContractDialogProps = {
  onConfirm: (contract: Contract) => void
  onCancel: () => void
  contracts: Contract[]
}

export const AutomationContractDialog: React.VFC<AutomationContractDialogProps> =
  (props) => {
    const handleOnChange = (contract: Contract) => () => {
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
              {contract.name}
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
