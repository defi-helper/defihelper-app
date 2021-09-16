/* eslint-disable no-unused-vars */
import { MenuItem, TextField } from '@material-ui/core'
import { useState, useEffect } from 'react'

import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
} from '~/graphql/_generated-types'
import * as styles from './automation-trigger-expression.css'

export type AutomationTriggerExpressionProps = {
  className?: string
  type: string
  priority: number
  trigger: string
  onSubmitCondition: () => void
  onSubmitAction: () => void
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

export const AutomationTriggerExpression: React.VFC<AutomationTriggerExpressionProps> =
  (props) => {
    const currentEnum = getEnum(props.type)
    const forms = Object.entries<string>(currentEnum)

    const [[, form]] = forms

    const [currentForm, setForm] = useState(form)

    const handleSetForm = (value: string) => () => {
      setForm(value)
    }

    useEffect(() => {
      setForm(form)
    }, [form])

    return (
      <div className={styles.root}>
        <TextField label="Form" select value={currentForm}>
          {forms.map(([key, value]) => (
            <MenuItem key={key} value={value} onClick={handleSetForm(value)}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </div>
    )
  }
