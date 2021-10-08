import { MenuItem, TextField } from '@material-ui/core'
import { useState } from 'react'

import {
  AutomateActionCreateInputType,
  AutomateActionTypeEnum,
  AutomateActionUpdateInputType,
  AutomateConditionCreateInputType,
  AutomateConditionTypeEnum,
  AutomateConditionUpdateInputType,
  AutomationContractFragmentFragment,
  UserContactFragmentFragment,
} from '~/graphql/_generated-types'
import { AutomationActionEthereumRun } from '../automation-action-ethereum-run'
import { AutomationActionNotification } from '../automation-action-notification'
import { AutomationConditionEthereumBalance } from '../automation-condition-ethereum-balance'
import { AutomationConditionEthereumGasPrice } from '../automation-condition-ethereum-gas-price'
import { AutomationConditionEthereumOptimal } from '../automation-condition-ethereum-optimal'
import { AutomationConditionSchedule } from '../automation-condition-schedule'
import { Action, Condition } from '../automation.types'
import { safeJsonParse } from '../safe-json-parse'
import * as styles from './automation-trigger-expression.css'

export type AutomationTriggerExpressionProps = {
  className?: string
  type: string
  priority: number
  trigger: string
  contracts: AutomationContractFragmentFragment[]
  onDeploy: () => void
  expression?: Action | Condition
  onSubmitCondition?: (
    formValues:
      | AutomateConditionCreateInputType
      | AutomateConditionUpdateInputType
  ) => void
  onSubmitAction?: (
    formValues: AutomateActionCreateInputType | AutomateActionUpdateInputType
  ) => void
  contacts: UserContactFragmentFragment[]
}

export enum AutomationTriggerExpressions {
  action = 'action',
  condition = 'condition',
}

const getEnum = (type: string) => {
  const currentEnum = {
    [AutomationTriggerExpressions.action]: AutomateActionTypeEnum,
    [AutomationTriggerExpressions.condition]: AutomateConditionTypeEnum,
  }[type]

  if (!currentEnum) throw new Error('error')

  return currentEnum
}

const Forms: Record<
  string,
  {
    component: React.ElementType
    handler: 'onSubmitCondition' | 'onSubmitAction'
  }
> = {
  [AutomateActionTypeEnum.EthereumAutomateRun]: {
    component: AutomationActionEthereumRun,
    handler: 'onSubmitAction',
  },
  [AutomateActionTypeEnum.Notification]: {
    component: AutomationActionNotification,
    handler: 'onSubmitAction',
  },
  [AutomateConditionTypeEnum.EthereumBalance]: {
    component: AutomationConditionEthereumBalance,
    handler: 'onSubmitCondition',
  },
  [AutomateConditionTypeEnum.EthereumOptimalAutomateRun]: {
    component: AutomationConditionEthereumOptimal,
    handler: 'onSubmitCondition',
  },
  [AutomateConditionTypeEnum.EthereumAvgGasPrice]: {
    component: AutomationConditionEthereumGasPrice,
    handler: 'onSubmitCondition',
  },
  [AutomateConditionTypeEnum.Schedule]: {
    component: AutomationConditionSchedule,
    handler: 'onSubmitCondition',
  },
}

export const AutomationTriggerExpression: React.VFC<AutomationTriggerExpressionProps> =
  (props) => {
    const currentEnum = getEnum(props.type)
    const forms = Object.entries<string>(currentEnum)

    const [[, form]] = forms

    const [currentForm, setForm] = useState(props.expression?.type ?? form)

    const handleSetForm = (value: string) => () => {
      setForm(value)
    }

    const { component: Component, handler } = Forms[currentForm] ?? {}

    const handlers = {
      onSubmitAction: (params: string) => {
        props.onSubmitAction?.({
          trigger: props.trigger,
          params,
          type: currentForm as AutomateActionTypeEnum,
          priority: props.priority,
        })
      },
      onSubmitCondition: (params: string) => {
        props.onSubmitCondition?.({
          trigger: props.trigger,
          params,
          type: currentForm as AutomateConditionTypeEnum,
          priority: props.priority,
        })
      },
    }

    return (
      <div className={styles.root}>
        <TextField label="Form" select value={currentForm}>
          {forms.map(([key, value]) => (
            <MenuItem key={key} value={value} onClick={handleSetForm(value)}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        {Component && (
          <Component
            contracts={props.contracts}
            onSubmit={handlers[handler]}
            onDeploy={props.onDeploy}
            contacts={props.contacts}
            defaultValues={safeJsonParse(props.expression?.params)}
          />
        )}
      </div>
    )
  }
