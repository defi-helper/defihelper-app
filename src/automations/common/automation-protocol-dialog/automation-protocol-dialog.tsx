import { Automates } from '~/automations/common/automation.types'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationProtocolDialogProps = {
  onConfirm: (automateContract: Automates) => void
  onCancel: () => void
  automateContracts: Record<string, Automates>
}

export const AutomationProtocolDialog: React.VFC<AutomationProtocolDialogProps> =
  (props) => {
    const handleOnChange = (contract: Automates) => () => {
      props.onConfirm(contract)
    }

    return (
      <AutomationDialog title="Choose protocol" onBack={props.onCancel}>
        <AutomationSelectList>
          {Object.values(props.automateContracts).map((contract) => (
            <AutomationSelectListItem
              key={contract.protocol}
              onClick={handleOnChange(contract)}
            >
              {contract.protocol}
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
