import { Event } from 'effector'
import { useGate, useStore } from 'effector-react'
import { useEffect, useRef } from 'react'
import omit from 'lodash.omit'

import { userModel } from '~/users'
import {
  Action,
  Condition,
  isAction,
  isCondition,
  Trigger,
} from '../common/automation.types'
import { Dialog, useDialog } from '~/common/dialog'
import {
  AutomateActionCreateInputType,
  AutomateActionUpdateInputType,
  AutomateConditionCreateInputType,
  AutomateTriggerCreateInputType,
  AutomationContractFragmentFragment,
} from '~/graphql/_generated-types'
import { Button } from '~/common/button'
import { AutomationTriggerForm } from '~/automations/common/automation-trigger-form'
import {
  AutomationTriggerExpression,
  AutomationTriggerExpressions,
} from '../common/automation-trigger-expression'
import { AutomationDeployContract } from '../automation-deploy-contract'
import * as model from './automation-update.model'
import * as styles from './automation-update.css'

export type AutomationUpdateProps = {
  onConfirm: () => void
  onCancel: () => void
  trigger: Trigger
  contracts: AutomationContractFragmentFragment[]
  onAddContract: Event<AutomationContractFragmentFragment>
}

export const AutomationUpdate: React.VFC<AutomationUpdateProps> = (props) => {
  const wallets = useStore(userModel.$userWallets)
  const loading = useStore(model.updateTriggerFx.pending)
  const allExpressionsMap = useStore(model.$allExpressionsMap)
  const allExpressions = useStore(model.$allExpressions)

  const [openDeploy] = useDialog(AutomationDeployContract)

  useGate(model.AutomationUpdateGate, props.trigger)

  const lastIndexRef = useRef(0)

  const defaultValues = {
    wallet: props.trigger.wallet.id,
    type: props.trigger.type,
    name: props.trigger.name,
    active: props.trigger.active,
    params: props.trigger.params,
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
    model.setNewExpression({
      // eslint-disable-next-line no-plusplus
      [++lastIndexRef.current]: '',
    })
  }

  const handleSetTypeOfExpression =
    (index: number, typeOfExpression: string) => () => {
      model.setNewExpression({
        [index]: typeOfExpression,
      })
    }

  const handleDeleteExpression =
    (payload: { priority: number; expression?: Condition | Action }) => () => {
      if (isAction(payload.expression)) {
        model.deleteActionFx(payload.expression.id)
      }

      if (isCondition(payload.expression)) {
        model.deleteConditonFx(payload.expression.id)
      }
    }

  const handleSubmitAction =
    (id?: string) =>
    (action: AutomateActionCreateInputType | AutomateActionUpdateInputType) => {
      if (id) {
        model.updateActionFx({ ...omit(action, ['trigger', 'type']), id })
      } else {
        model.createActionFx(action as AutomateActionCreateInputType)
      }
    }

  const handleSubmitConditon =
    (id?: string) =>
    (
      condition:
        | AutomateConditionCreateInputType
        | AutomateActionUpdateInputType
    ) => {
      if (id) {
        model.updateConditionFx({ ...omit(condition, ['trigger', 'type']), id })
      } else {
        model.createConditionFx(condition as AutomateConditionCreateInputType)
      }
    }

  const handleOpenDeploy = async () => {
    try {
      const result = await openDeploy()

      props.onAddContract(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    lastIndexRef.current = Object.keys(allExpressionsMap).length
  }, [allExpressionsMap])

  return (
    <Dialog>
      <div className={styles.root}>
        <AutomationTriggerForm
          wallets={wallets}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          loading={loading}
        />
        <Button onClick={handleAddExpression} size="small">
          +
        </Button>
        {Object.entries(allExpressionsMap).map(([priority, expression]) => (
          <div key={priority}>
            <Button
              onClick={handleSetTypeOfExpression(
                Number(priority),
                AutomationTriggerExpressions.action
              )}
              disabled={expression === AutomationTriggerExpressions.action}
              size="small"
            >
              Action
            </Button>
            <Button
              onClick={handleSetTypeOfExpression(
                Number(priority),
                AutomationTriggerExpressions.condition
              )}
              disabled={expression === AutomationTriggerExpressions.condition}
              size="small"
            >
              Condition
            </Button>
            {expression && (
              <AutomationTriggerExpression
                onSubmitAction={handleSubmitAction(
                  allExpressions[Number(priority)]?.id
                )}
                onSubmitCondition={handleSubmitConditon(
                  allExpressions[Number(priority)]?.id
                )}
                type={expression}
                expression={allExpressions[Number(priority)]}
                priority={Number(priority)}
                trigger={props.trigger.id}
                contracts={props.contracts}
                onDeploy={handleOpenDeploy}
              />
            )}
            <Button
              onClick={handleDeleteExpression({
                priority: Number(priority),
                expression: allExpressions[Number(priority)],
              })}
              size="small"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Dialog>
  )
}
