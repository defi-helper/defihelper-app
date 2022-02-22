import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { UserContactFragmentFragment } from '~/graphql/_generated-types'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'

export type AutomationContactsDialogProps = {
  onConfirm: (contact: UserContactFragmentFragment) => void
  onCancel: () => void
  contacts: UserContactFragmentFragment[]
}

export const AutomationContactsDialog: React.VFC<AutomationContactsDialogProps> =
  (props) => {
    const handleOnChange = (contact: UserContactFragmentFragment) => () => {
      props.onConfirm(contact)
    }

    return (
      <AutomationDialog title="Choose contact" onBack={props.onCancel}>
        <AutomationSelectList>
          {props.contacts.map((contact) => (
            <AutomationSelectListItem
              key={contact.id}
              onClick={handleOnChange(contact)}
              icon={
                <Icon
                  icon={contact.broker === 'email' ? 'email' : 'telegram'}
                />
              }
            >
              <div>
                <Typography variant="body2" as="span">
                  {contact.name || contact.address || 'untitled'}
                </Typography>
                <Typography variant="body3" as="span">
                  {contact.address || 'telegram'}
                </Typography>
              </div>
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
