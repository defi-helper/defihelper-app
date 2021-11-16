import { Icon } from '~/common/icon'
import { networksConfig } from '~/networks-config'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationNetworksDialogProps = {
  onConfirm: (networkId: string) => void
  onCancel: () => void
}

export const AutomationNetworksDialog: React.VFC<AutomationNetworksDialogProps> =
  (props) => {
    const handleOnChange = (networkId: string) => () => {
      props.onConfirm(networkId)
    }

    return (
      <AutomationDialog title="Choose network" onBack={props.onCancel}>
        <AutomationSelectList>
          {Object.entries(networksConfig).map(([networkId, network]) => (
            <AutomationSelectListItem
              key={networkId}
              onClick={handleOnChange(networkId)}
              icon={<Icon icon={network.icon} />}
            >
              {network.title}
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
