import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationEventsDialogProps = {
  onConfirm: (contract: string) => void
  onCancel: () => void
  events: string[]
}

export const AutomationEventsDialog: React.VFC<AutomationEventsDialogProps> = (
  props
) => {
  const handleOnChange = (event: string) => () => {
    props.onConfirm(event)
  }

  return (
    <AutomationDialog title="Choose contract" onBack={props.onCancel}>
      <AutomationSelectList>
        {props.events.map((event) => (
          <AutomationSelectListItem key={event} onClick={handleOnChange(event)}>
            {event}
          </AutomationSelectListItem>
        ))}
      </AutomationSelectList>
    </AutomationDialog>
  )
}
