/* eslint-disable no-unused-vars */
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useEffect, useMemo, useState } from 'react'

import { AutomationDialog } from '~/automations/common/automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '~/automations/common/automation-select-list'
import { Automates } from '~/automations/common/automation.types'
import { ButtonBase } from '~/common/button-base'
import { useDialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import {
  AutomateTriggerTypeEnum,
  AutomationContractFragmentFragment,
  AutomationTriggerFragmentFragment,
} from '~/graphql/_generated-types'
import { userModel } from '~/users'
import { AutomationChooseButton } from '../common/automation-choose-button'
import { AutomationConditionsDialog } from '../common/automation-conditions-dialog'
import { AutomationActionsDialog } from '../common/automation-actions-dialog'
import { AutomationTriggerForm } from '../common/automation-trigger-form'
import * as styles from './automation-trigger-dialog.css'
import * as model from './automation-update.model'
import * as contactModel from '~/settings/settings-contacts/settings-contact.model'

export type AutomationTriggerDialogProps = {
  automateContracts: Record<string, Automates>
  updatingTrigger?: AutomationTriggerFragmentFragment
  contracts: AutomationContractFragmentFragment[]
}

type Types = 'ByTime' | 'ByEvent'

enum Tabs {
  Trigger = 'trigger',
  Conditions = 'conditions',
  Actions = 'actions',
}

export const AutomationTriggerDialog: React.VFC<AutomationTriggerDialogProps> =
  (props) => {
    const wallets = useStore(userModel.$userWallets)
    const [currentType, setType] = useState<Types | null>(null)
    const [currentTab, setTab] = useState<Tabs>(Tabs.Trigger)
    const protocols = useStore(model.$protocols)
    const creating = useStore(model.createTriggerFx.pending)
    const createdTrigger = useStore(model.$createdTrigger)
    const updatedTrigger = useStore(model.$updatedTrigger)
    const contacts = useStore(contactModel.$userContactList)

    const [openConditionsDialog] = useDialog(AutomationConditionsDialog)
    const [openActionsDialog] = useDialog(AutomationActionsDialog)

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
      try {
        await openConditionsDialog({
          contracts: props.contracts,
          wallets,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }
    const handleAddAction = async () => {
      try {
        await openActionsDialog({
          contracts: props.contracts,
          contacts,
          onDeploy: () => {},
        })
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
              By event
            </AutomationSelectListItem>
          </AutomationSelectList>
        ) : (
          <>
            {currentTab === Tabs.Trigger && (
              <AutomationTriggerForm
                wallets={wallets}
                automateContracts={props.automateContracts}
                type={currentType}
                protocols={protocols}
                onCreate={model.createTriggerFx}
                onUpdate={model.updateTriggerFx}
                defaultValues={defaultValues}
                loading={creating}
              />
            )}
            {currentTab === Tabs.Conditions && (
              <>
                <AutomationChooseButton
                  label="condition 1"
                  className={styles.item}
                  onDelete={() => {}}
                >
                  <Typography className={styles.itemTitle}>
                    GAS Lower Than
                  </Typography>
                  <Typography variant="body3" className={styles.itemSubtitle}>
                    40
                  </Typography>
                </AutomationChooseButton>
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
