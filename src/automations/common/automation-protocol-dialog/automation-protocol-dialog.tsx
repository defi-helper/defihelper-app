import { Protocol } from '~/automations/common/automation.types'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationProtocolDialogProps = {
  onConfirm: (protocol: Protocol) => void
  onCancel: () => void
  protocols: Protocol[]
}

export const AutomationProtocolDialog: React.VFC<AutomationProtocolDialogProps> =
  (props) => {
    const handleOnChange = (protocol: Protocol) => () => {
      props.onConfirm(protocol)
    }

    return (
      <AutomationDialog title="Choose protocol" onBack={props.onCancel}>
        <AutomationSelectList>
          {props.protocols.map((protocol) => (
            <AutomationSelectListItem
              key={protocol.id}
              onClick={handleOnChange(protocol)}
              icon={
                <img
                  src={protocol.icon ?? undefined}
                  width="28"
                  height="28"
                  alt=""
                />
              }
            >
              {protocol.name}
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
