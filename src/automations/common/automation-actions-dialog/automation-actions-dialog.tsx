import { useState } from 'react'

import { Typography } from '~/common/typography'
import {
  AutomateActionCreateInputType,
  AutomateActionTypeEnum,
  AutomationContractFragmentFragment,
  AutomationDescriptionQuery,
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
import { safeJsonParse } from '../safe-json-parse'
import * as styles from './automation-actions-dialog.css'

export type AutomationActionsDialogProps = {
  onCancel: () => void
  onConfirm: (formValues: AutomateActionCreateInputType) => void
  type?: string | null
  contracts: AutomationContractFragmentFragment[]
  contacts: UserContactFragmentFragment[]
  onDeploy: () => void
  triggerId?: string
  params?: string
  descriptions: Exclude<
    AutomationDescriptionQuery['automateDescription'],
    null | undefined
  >
  priority: number
}

export const AutomationActionsDialog: React.VFC<AutomationActionsDialogProps> =
  (props) => {
    const [currentForm, setCurrentForm] = useState<string | null>(
      props.type ?? null
    )

    const handleSubmit = (params: string) => {
      if (!props.triggerId) throw new Error('triggerid is not defined')

      props.onConfirm({
        trigger: props.triggerId,
        params,
        type: currentForm as AutomateActionTypeEnum,
        priority: props.priority,
      })
    }

    const params = props.params ? safeJsonParse(props.params) : undefined

    const FORMS: Record<string, FormItem> = {
      [AutomateActionTypeEnum.EthereumAutomateRun]: {
        title: props.descriptions.actions.ethereumAutomateRun.name,
        description: props.descriptions.actions.ethereumAutomateRun.description,
        component: (
          <AutomationActionEthereumRun
            contracts={props.contracts}
            onSubmit={handleSubmit}
            onDeploy={props.onDeploy}
            defaultValues={params}
          />
        ),
      },
      [AutomateActionTypeEnum.Notification]: {
        title: props.descriptions.actions.notification.name,
        description: props.descriptions.actions.notification.description,
        component: (
          <AutomationActionNotification
            contacts={props.contacts}
            onSubmit={handleSubmit}
            defaultValues={params}
          />
        ),
      },
    }

    const handleSetForm = (formType: string | null) => () => {
      setCurrentForm(formType)
    }

    const currentFormObj = currentForm ? FORMS[currentForm] : undefined

    const onBack = currentFormObj ? handleSetForm(null) : props.onCancel

    return (
      <AutomationDialog
        title={currentFormObj ? currentFormObj.title : 'Choose action'}
        onBack={!props.type ? onBack : undefined}
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
