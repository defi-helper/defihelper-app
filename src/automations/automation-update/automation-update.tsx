import { useStore } from 'effector-react'
import { useRef, useState } from 'react'
import omit from 'lodash.omit'
import isEmpty from 'lodash.isempty'

import { userModel } from '~/users'
import { Trigger } from '../common/automation.types'
import { Dialog } from '~/common/dialog'
import { AutomateTriggerCreateInputType } from '~/graphql/_generated-types'
import { Button } from '~/common/button'
import { AutomationTriggerForm } from '~/automations/common/automation-trigger-form'
import * as model from './automation-update.model'
import * as styles from './automation-update.css'
import {
  AutomationTriggerExpression,
  AutomationTriggerExpressions,
} from '../common/automation-trigger-expression'

export type AutomationUpdateProps = {
  onConfirm: () => void
  onCancel: () => void
  trigger: Trigger
}

export const AutomationUpdate: React.VFC<AutomationUpdateProps> = (props) => {
  const wallets = useStore(userModel.$userWallets)
  const loading = useStore(model.updateTriggerFx.pending)

  const [expressions, setExpressions] = useState<Record<number, string>>({})
  const lastIndexRef = useRef(Object.keys(expressions).length)

  const defaultValues = {
    wallet: props.trigger.wallet.id,
    type: props.trigger.type,
    name: props.trigger.name,
    active: props.trigger.active,
  }

  const handleSubmit = (formValues: AutomateTriggerCreateInputType) => {
    const { name, active } = formValues

    model.updateTriggerFx({
      id: props.trigger.id,
      name,
      active,
    })
  }

  const handleAddExpression = () => {
    setExpressions({
      ...expressions,
      // eslint-disable-next-line no-plusplus
      [lastIndexRef.current++]: '',
    })
  }

  const handleSetTypeOfExpression =
    (index: number, typeOfExpression: string) => () => {
      const newExpressions = {
        ...expressions,
      }

      newExpressions[index] = typeOfExpression

      setExpressions(newExpressions)
    }

  const handleDeleteExpression = (index: number) => () => {
    setExpressions(omit(expressions, String(index)))
  }

  return (
    <Dialog>
      <div className={styles.root}>
        <AutomationTriggerForm
          wallets={wallets}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          loading={loading}
        />
        <Button
          onClick={handleAddExpression}
          size="small"
          disabled={
            !expressions[lastIndexRef.current - 1] && !isEmpty(expressions)
          }
        >
          +
        </Button>
        {Object.entries(expressions).map(([id, expression]) => (
          <div key={id}>
            <Button
              onClick={handleSetTypeOfExpression(
                Number(id),
                AutomationTriggerExpressions.action
              )}
              disabled={expression === AutomationTriggerExpressions.action}
              size="small"
            >
              Action
            </Button>
            <Button
              onClick={handleSetTypeOfExpression(
                Number(id),
                AutomationTriggerExpressions.condition
              )}
              disabled={expression === AutomationTriggerExpressions.condition}
              size="small"
            >
              Condition
            </Button>
            {expression && (
              <AutomationTriggerExpression
                onSubmitAction={console.log}
                onSubmitCondition={console.log}
                type={expression}
                priority={Number(id)}
                trigger={props.trigger.id}
              />
            )}
            <Button onClick={handleDeleteExpression(Number(id))} size="small">
              Delete
            </Button>
            <Button size="small">Save</Button>
          </div>
        ))}
      </div>
    </Dialog>
  )
}
