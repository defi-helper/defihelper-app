import { useState } from 'react'

import { Typography } from '~/common/typography'
import {
  AutomateActionType,
  AutomateConditionCreateInputType,
  AutomateConditionTypeEnum,
  AutomationDescriptionQuery,
} from '~/api/_generated-types'
import { AutomationConditionContractMetric } from '../automation-condition-contract-metric'
import { AutomationConditionEthereumBalance } from '../automation-condition-ethereum-balance'
import { AutomationConditionEthereumGasPrice } from '../automation-condition-ethereum-gas-price'
import { AutomationConditionEthereumOptimal } from '../automation-condition-ethereum-optimal'
import { AutomationConditionSchedule } from '../automation-condition-schedule'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'
import { FormItem, Protocol, Wallet } from '../automation.types'
import { safeJsonParse } from '../safe-json-parse'
import * as styles from './automation-conditions-dialog.css'

export type AutomationConditionsDialogProps = {
  onCancel: () => void
  onConfirm: (formValues: AutomateConditionCreateInputType) => void
  type?: string | null
  actions: AutomateActionType[]
  wallets: Wallet[]
  triggerId?: string
  params?: string
  descriptions: Exclude<
    AutomationDescriptionQuery['automateDescription'],
    null | undefined
  >
  priority: number
  names: Record<string, string>
  getProtocols: () => Promise<Protocol[]>
}

export const AutomationConditionsDialog: React.VFC<AutomationConditionsDialogProps> =
  (props) => {
    const [currentForm, setCurrentForm] = useState<string | null>(
      props.type ?? null
    )

    const handleSetForm = (formType: string | null) => () => {
      setCurrentForm(formType)
    }

    const handleSubmit = (params: string) => {
      if (!props.triggerId) throw new Error('triggerid is undefined')

      props.onConfirm({
        trigger: props.triggerId,
        params,
        type: currentForm as AutomateConditionTypeEnum,
        priority: props.priority,
      })
    }

    const params = props.params ? safeJsonParse(props.params) : undefined

    const Forms: Record<string, FormItem> = {
      [AutomateConditionTypeEnum.ContractMetric]: {
        title: props.descriptions.conditions.contractMetric.name,
        description: props.descriptions.conditions.contractMetric.description,
        component: (
          <AutomationConditionContractMetric
            onSubmit={handleSubmit}
            defaultValues={params}
            getProtocols={props.getProtocols}
          />
        ),
      },
      [AutomateConditionTypeEnum.EthereumBalance]: {
        title: props.descriptions.conditions.ethereumBalance.name,
        description: props.descriptions.conditions.ethereumBalance.description,
        component: (
          <AutomationConditionEthereumBalance
            wallets={props.wallets}
            onSubmit={handleSubmit}
            defaultValues={params}
          />
        ),
      },
      [AutomateConditionTypeEnum.EthereumOptimalAutomateRun]: {
        title: props.descriptions.conditions.ethereumOptimalAutomateRun.name,
        description:
          props.descriptions.conditions.ethereumOptimalAutomateRun.description,
        component: (
          <AutomationConditionEthereumOptimal
            onSubmit={handleSubmit}
            actions={props.actions}
            names={props.names}
            defaultValues={params}
          />
        ),
      },
      [AutomateConditionTypeEnum.EthereumAvgGasPrice]: {
        title: props.descriptions.conditions.ethereumAvgGasPrice.name,
        description:
          props.descriptions.conditions.ethereumAvgGasPrice.description,
        component: (
          <AutomationConditionEthereumGasPrice
            onSubmit={handleSubmit}
            defaultValues={params}
          />
        ),
      },
      [AutomateConditionTypeEnum.Schedule]: {
        title: props.descriptions.conditions.schedule.name,
        description: props.descriptions.conditions.schedule.description,
        component: (
          <AutomationConditionSchedule
            onSubmit={handleSubmit}
            defaultValues={params}
          />
        ),
      },
    }

    const currentFormObj = currentForm ? Forms[currentForm] : undefined

    const onBack = currentFormObj ? handleSetForm(null) : props.onCancel

    return (
      <AutomationDialog
        title={currentFormObj ? currentFormObj.title : 'Choose condition'}
        onBack={!props.type ? onBack : props.onCancel}
      >
        {currentFormObj ? (
          currentFormObj.component
        ) : (
          <AutomationSelectList>
            {Object.entries(Forms).map(([type, condition]) => (
              <AutomationSelectListItem
                key={type}
                className={styles.button}
                onClick={handleSetForm(type)}
              >
                <Typography>{condition.title}</Typography>
                <Typography variant="body3" className={styles.description}>
                  {condition.description}
                </Typography>
              </AutomationSelectListItem>
            ))}
          </AutomationSelectList>
        )}
      </AutomationDialog>
    )
  }
