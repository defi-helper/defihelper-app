import { AutomateActionType } from '~/graphql/_generated-types'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationConditionActionsDialogProps = {
  onConfirm: (contract: AutomateActionType) => void
  onCancel: () => void
  actions: AutomateActionType[]
  names: Record<string, string>
}

export const AutomationConditionActionsDialog: React.VFC<AutomationConditionActionsDialogProps> =
  (props) => {
    const handleOnChange = (contract: AutomateActionType) => () => {
      props.onConfirm(contract)
    }

    return (
      <AutomationDialog title="Choose action" onBack={props.onCancel}>
        <AutomationSelectList>
          {props.actions.map((action) => (
            <AutomationSelectListItem
              key={action.id}
              onClick={handleOnChange(action)}
            >
              {action.paramsDescription
                .split(' ')
                .map((str) => (props.names[str] ? props.names[str] : str))
                .join(' ')}
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
