import { Automates } from '~/automations/common/automation.types'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationContractDialogProps = {
  onConfirm: (automateContract: Automates) => void
  onCancel: () => void
  automateContracts: Record<string, Automates>
}

export const AutomationContractDialog: React.VFC<AutomationContractDialogProps> =
  (props) => {
    const handleOnChange = (contract: Automates) => () => {
      props.onConfirm(contract)
    }

    return (
      <AutomationDialog title="Choose contract" onBack={props.onCancel}>
        <AutomationSelectList>
          {Object.values(props.automateContracts).map((contract) => (
            <AutomationSelectListItem
              key={contract.protocol}
              onClick={handleOnChange(contract)}
            >
              {contract.contract}
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
