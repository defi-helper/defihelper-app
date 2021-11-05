import { useState } from 'react'

import { Typography } from '~/common/typography'
import {
  AutomateActionTypeEnum,
  AutomationContractFragmentFragment,
  UserContactFragmentFragment,
} from '~/graphql/_generated-types'
import { AutomationActionEthereumRun } from '../automation-action-ethereum-run'
import { AutomationActionNotification } from '../automation-action-notification'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'
import { FormItem } from '../automation.types'
import * as styles from './automation-actions-dialog.css'

export type AutomationActionsDialogProps = {
  onCancel: () => void
  onConfirm: () => void
  type?: string | null
  contracts: AutomationContractFragmentFragment[]
  contacts: UserContactFragmentFragment[]
  onDeploy: () => void
}

export const AutomationActionsDialog: React.VFC<AutomationActionsDialogProps> =
  (props) => {
    const [currentForm, setCurrentForm] = useState<string | null>(
      props.type ?? null
    )

    const handleSubmit = (formValues: unknown) => {
      console.log(formValues)
    }

    const FORMS: Record<string, FormItem> = {
      [AutomateActionTypeEnum.EthereumAutomateRun]: {
        title: 'Ethereum automate run',
        description: 'some description',
        component: (
          <AutomationActionEthereumRun
            contracts={props.contracts}
            onSubmit={handleSubmit}
            onDeploy={props.onDeploy}
          />
        ),
      },
      [AutomateActionTypeEnum.Notification]: {
        title: 'Notification',
        description: 'some description',
        component: (
          <AutomationActionNotification
            contacts={props.contacts}
            onSubmit={handleSubmit}
          />
        ),
      },
    }

    const handleSetForm = (formType: string | null) => () => {
      setCurrentForm(formType)
    }

    const currentFormObj = currentForm ? FORMS[currentForm] : undefined

    return (
      <AutomationDialog
        title={currentFormObj ? currentFormObj.title : 'Choose action'}
        onBack={currentFormObj ? handleSetForm(null) : props.onCancel}
      >
        {currentFormObj ? (
          currentFormObj.component
        ) : (
          <AutomationSelectList>
            {Object.entries(FORMS).map(([type, action]) => (
              <AutomationSelectListItem
                key={type}
                className={styles.button}
                onClick={handleSetForm(type)}
              >
                <Typography>{action.title}</Typography>
                <Typography variant="body3" className={styles.description}>
                  {action.description}
                </Typography>
              </AutomationSelectListItem>
            ))}
          </AutomationSelectList>
        )}
      </AutomationDialog>
    )
  }
