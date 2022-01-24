import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useEffect, useMemo, useState } from 'react'
import omit from 'lodash.omit'

import { AutomationDialog } from '~/automations/common/automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '~/automations/common/automation-select-list'
import { ButtonBase } from '~/common/button-base'
import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import {
  AutomateActionType,
  AutomateActionTypeEnum,
  AutomateConditionType,
  AutomateTriggerCreateInputType,
  AutomateTriggerTypeEnum,
  StakingAutomatesContractFragmentFragment,
  AutomationDescriptionQuery,
  AutomationTriggerFragmentFragment,
} from '~/graphql/_generated-types'
import { AutomationChooseButton } from '../common/automation-choose-button'
import { AutomationConditionsDialog } from '../common/automation-conditions-dialog'
import { AutomationActionsDialog } from '../common/automation-actions-dialog'
import { AutomationTriggerForm } from '../common/automation-trigger-form'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { AutomationDeployContract } from '../automation-deploy-contract'
import { Wallet } from '~/wallets/common'
import * as styles from './automation-update.css'
import * as model from './automation-update.model'
import * as contactModel from '~/settings/settings-contacts/settings-contact.model'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'

export type AutomationUpdateProps = {
  updatingTrigger?: AutomationTriggerFragmentFragment
  contracts: StakingAutomatesContractFragmentFragment[]
  descriptions?: AutomationDescriptionQuery['automateDescription'] | null
  wallet: Wallet
}

type Types = 'ByTime' | 'ByEvent'

enum Tabs {
  Trigger = 'trigger',
  Conditions = 'conditions',
  Actions = 'actions',
}

export const AutomationUpdate: React.VFC<AutomationUpdateProps> = (props) => {
  const wallets = useStore(settingsWalletModel.$wallets)
  const [currentType, setType] = useState<Types | null>(null)
  const [currentTab, setTab] = useState<Tabs>(Tabs.Trigger)
  const protocols = useStore(model.$protocols)
  const creating = useStore(model.createTriggerFx.pending)
  const createdTrigger = useStore(model.$createdTrigger)
  const updatedTrigger = useStore(model.$updatedTrigger)
  const contacts = useStore(contactModel.$userContactList)
  const actions = useStore(model.$actions)
  const conditions = useStore(model.$conditions)
  const conditionsPriority = useStore(model.$conditionsPriority)
  const actionsPriority = useStore(model.$actionsPriority)

  const [openConditionsDialog] = useDialog(AutomationConditionsDialog)
  const [openActionsDialog] = useDialog(AutomationActionsDialog)
  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openDeployContract] = useDialog(AutomationDeployContract)

  const trigger = updatedTrigger ?? props.updatingTrigger ?? createdTrigger

  useGate(model.AutomationUpdateGate, trigger)
  useGate(contactModel.SettingsContactsGate)

  const handleSetType = (type: Types | null) => () => {
    setType(type)
  }

  const handleChangeTab = (tab: Tabs) => () => {
    setTab(tab)
  }

  const defaultValues = useMemo(
    () =>
      trigger
        ? {
            id: trigger.id,
            wallet: trigger.wallet.id,
            type: trigger.type,
            name: trigger.name,
            active: trigger.active,
            params: trigger.params,
          }
        : undefined,
    [trigger]
  )

  const automation = props.updatingTrigger
    ? [
        AutomateTriggerTypeEnum.EveryDay,
        AutomateTriggerTypeEnum.EveryHour,
        AutomateTriggerTypeEnum.EveryMonth,
        AutomateTriggerTypeEnum.EveryWeek,
      ].includes(props.updatingTrigger.type)
    : undefined

  useEffect(() => {
    if (automation === undefined) return

    setType(automation ? 'ByTime' : 'ByEvent')
  }, [automation])

  const handleAddCondition = async () => {
    if (!props.descriptions) return

    try {
      const result = await openConditionsDialog({
        actions: actions.filter(
          (action) => action.type === AutomateActionTypeEnum.EthereumAutomateRun
        ),
        wallets,
        triggerId: trigger?.id,
        descriptions: props.descriptions,
        priority: conditionsPriority + 1,
      })

      model.createConditionFx(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleDeploy = async () => {
    try {
      return await openDeployContract({
        protocols,
        wallet: props.wallet,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const handleAddAction = async () => {
    if (!props.descriptions) return

    try {
      const result = await openActionsDialog({
        contracts: props.contracts,
        contacts,
        onDeploy: handleDeploy,
        triggerId: trigger?.id,
        descriptions: props.descriptions,
        priority: actionsPriority + 1,
      })

      model.createActionFx(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleDeleteConditon = (conditionId: string) => async () => {
    try {
      await openConfirmDialog()

      model.deleteConditonFx(conditionId)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleDeleteAction = (actionId: string) => async () => {
    try {
      await openConfirmDialog()

      model.deleteActionFx(actionId)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleUpdateCondition =
    (condition: AutomateConditionType) => async () => {
      if (!props.descriptions) return

      try {
        const result = await openConditionsDialog({
          actions,
          wallets,
          triggerId: trigger?.id,
          type: condition.type,
          params: condition.params,
          descriptions: props.descriptions,
          priority: condition.priority,
        })

        model.updateConditionFx({
          ...omit(result, ['type', 'trigger']),
          id: condition.id,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  const handleUpdateAction = (action: AutomateActionType) => async () => {
    if (!props.descriptions) return

    try {
      const result = await openActionsDialog({
        contracts: props.contracts,
        contacts,
        onDeploy: handleDeploy,
        triggerId: trigger?.id,
        type: action.type,
        params: action.params,
        descriptions: props.descriptions,
        priority: action.priority,
      })

      model.updateActionFx({
        ...omit(result, ['type', 'trigger']),
        id: action.id,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleCreateTrigger = async (
    formValues: AutomateTriggerCreateInputType
  ) => {
    try {
      await model.createTriggerFx(formValues)

      setTab(Tabs.Conditions)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <AutomationDialog
      title={
        !currentType ? (
          'Choose type'
        ) : (
          <div className={styles.tabs}>
            <ButtonBase
              className={clsx(styles.tab, {
                [styles.activeTab]: currentTab === Tabs.Trigger,
                [styles.disableTab]: !trigger,
              })}
              onClick={handleChangeTab(Tabs.Trigger)}
            >
              Trigger
            </ButtonBase>
            <ButtonBase
              className={clsx(styles.tab, {
                [styles.activeTab]: currentTab === Tabs.Conditions,
                [styles.disableTab]: !trigger,
              })}
              onClick={handleChangeTab(Tabs.Conditions)}
            >
              Conditions
            </ButtonBase>
            <ButtonBase
              className={clsx(styles.tab, {
                [styles.activeTab]: currentTab === Tabs.Actions,
                [styles.disableTab]: !trigger,
              })}
              onClick={handleChangeTab(Tabs.Actions)}
            >
              Actions
            </ButtonBase>
          </div>
        )
      }
    >
      {!currentType ? (
        <AutomationSelectList>
          <AutomationSelectListItem onClick={handleSetType('ByTime')}>
            By time
          </AutomationSelectListItem>
          <AutomationSelectListItem onClick={handleSetType('ByEvent')}>
            By blockchain event
          </AutomationSelectListItem>
        </AutomationSelectList>
      ) : (
        <>
          {currentTab === Tabs.Trigger && (
            <AutomationTriggerForm
              wallets={wallets}
              type={currentType}
              protocols={protocols}
              onCreate={handleCreateTrigger}
              onUpdate={model.updateTriggerFx}
              defaultValues={defaultValues}
              loading={creating}
            />
          )}
          {currentTab === Tabs.Conditions && (
            <>
              {conditions.map((condition, index) => (
                <AutomationChooseButton
                  label={`condition ${index + 1}`}
                  className={styles.item}
                  onDelete={handleDeleteConditon(condition.id)}
                  onClick={handleUpdateCondition(condition)}
                  key={condition.id}
                >
                  <Typography className={styles.itemTitle}>
                    {props.descriptions?.conditions[condition.type]?.name}
                  </Typography>
                  <Typography variant="body3" className={styles.itemSubtitle}>
                    {condition.paramsDescription}
                  </Typography>
                </AutomationChooseButton>
              ))}
              <ButtonBase
                className={styles.addButton}
                onClick={handleAddCondition}
              >
                + add condition
              </ButtonBase>
            </>
          )}
          {currentTab === Tabs.Actions && (
            <>
              {actions.map((action, index) => (
                <AutomationChooseButton
                  label={`action ${index + 1}`}
                  className={styles.item}
                  onDelete={handleDeleteAction(action.id)}
                  onClick={handleUpdateAction(action)}
                  key={action.id}
                >
                  <Typography className={styles.itemTitle}>
                    {props.descriptions?.actions[action.type]?.name}
                  </Typography>
                  <Typography variant="body3" className={styles.itemSubtitle}>
                    {action.paramsDescription}
                  </Typography>
                </AutomationChooseButton>
              ))}
              <ButtonBase
                className={styles.addButton}
                onClick={handleAddAction}
              >
                + add action
              </ButtonBase>
            </>
          )}
        </>
      )}
    </AutomationDialog>
  )
}
