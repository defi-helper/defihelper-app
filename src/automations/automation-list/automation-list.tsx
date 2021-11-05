import { useLocalStorage } from 'react-use'
import { useGate, useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'

import { AppLayout } from '~/layouts/app-layout'
import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { AutomationUpdateContract } from '~/automations/automation-update-contract'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import { Trigger } from '~/automations/common/automation.types'
import { Head } from '~/common/head'
import { Paper } from '~/common/paper'
import { AutomationCard } from '~/automations/common/automation-card'
import { Input } from '~/common/input'
import { ButtonBase } from '~/common/button-base'
import { AutomationTriggerDescriptionDialog } from '~/automations/common/automation-trigger-description-dialog'
import { Icon } from '~/common/icon'
import { AutomationUpdate } from '~/automations/automation-update'
import { ConfirmDialog } from '~/common/confirm-dialog'
import * as styles from './automation-list.css'
import * as model from './automation-list.model'

export type AutomationListProps = unknown

export const AutomationList: React.VFC<AutomationListProps> = () => {
  const triggers = useStore(model.$triggers)
  const loading = useStore(model.fetchTriggersFx.pending)
  const contracts = useStore(model.$contracts)
  const automateContracts = useStore(model.$automateContracts)
  const descriptions = useStore(model.$descriptions)

  const [dontShow, setDontShow] = useLocalStorage('dontShow', false)

  const [openAutomationTrigger] = useDialog(AutomationUpdate)
  const [openAutomationUpdateContract] = useDialog(AutomationUpdateContract)
  const [openDescriptionDialog] = useDialog(AutomationTriggerDescriptionDialog)
  const [openConfirmDialog] = useDialog(ConfirmDialog)

  const handleDeleteTrigger = (triggerId: string) => async () => {
    try {
      await openConfirmDialog()

      model.deleteTriggerFx(triggerId)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleEditTrigger = (trigger: Trigger) => async () => {
    await openAutomationTrigger({
      automateContracts,
      updatingTrigger: trigger,
      contracts,
      descriptions,
    }).catch((error: Error) => console.error(error.message))
  }

  const handleAutomationDeleteContract = (contractId: string) => async () => {
    try {
      await openConfirmDialog()

      model.deleteContractFx(contractId)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleActivate = (trigger: Trigger) => () => {
    model.toggleTriggerFx({
      triggerId: trigger.id,
      active: !trigger.active,
    })
  }

  const handleAutomationUpdateContract =
    (contract: AutomationContractFragmentFragment) => async () => {
      if (!automateContracts[contract.adapter]) return

      try {
        const result = await openAutomationUpdateContract({
          contract,
          automateContract: automateContracts[contract.adapter],
        })

        model.setUpdateContract(result)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }
  const handleAddAutomation = async () => {
    try {
      if (!dontShow) {
        const result = await openDescriptionDialog()

        setDontShow(result)
      }

      await openAutomationTrigger({
        automateContracts,
        contracts,
        descriptions,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useGate(model.AutomationListGate)

  return (
    <AppLayout
      title="Automations"
      action={
        <div className={styles.action}>
          <Paper radius={8} className={styles.countMobile}>
            <Icon icon="automation" width="16" height="16" />
            <Typography variant="body3" className={styles.countTitle}>
              32
            </Typography>
          </Paper>
          <ButtonBase className={styles.searchButton}>
            <Icon icon="search" width="16" height="16" />
          </ButtonBase>
          <Button
            color="blue"
            className={styles.addAutomations}
            onClick={handleAddAutomation}
          >
            +
          </Button>
        </div>
      }
    >
      <Head title="Automations" />
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant="h3" family="square" className={styles.title}>
            Automations
          </Typography>
          <Paper radius={8} className={styles.countDesktop}>
            <Typography variant="body2">
              32 Automations
              <Typography variant="inherit" className={styles.left}>
                left
              </Typography>
            </Typography>
          </Paper>
          <Input placeholder="Search" className={styles.searchDesktop} />
          <Button color="blue" onClick={handleAddAutomation}>
            +
            <Typography variant="inherit" className={styles.left}>
              new automation
            </Typography>
          </Button>
        </div>
        <div className={styles.grid}>
          {loading && <Paper radius={8}>loading...</Paper>}
          {!loading && isEmpty(triggers) && <Paper radius={8}>empty</Paper>}
          {!loading &&
            !isEmpty(triggers) &&
            triggers.map((trigger) => (
              <AutomationCard
                key={trigger.id}
                id={trigger.id}
                onEdit={handleEditTrigger(trigger)}
                onDelete={handleDeleteTrigger(trigger.id)}
                active={trigger.active}
                onActivate={handleActivate(trigger)}
                deleting={trigger.deleting}
                type={trigger.type}
                actions={trigger.actions.list ?? []}
                conditions={trigger.conditions.list ?? []}
                descriptions={descriptions}
                wallet={trigger.wallet.name || 'untitled'}
                walletNetwork={trigger.wallet.network}
              />
            ))}
        </div>
        {contracts.map((contract) => (
          <div key={contract.id}>
            <Typography>{contract.adapter}</Typography>
            <Typography>{contract.rejectReason}</Typography>
            <Typography>{contract.verification}</Typography>
            <Typography>{contract.address}</Typography>
            <Button
              onClick={handleAutomationUpdateContract(contract)}
              loading={contract.deleting}
            >
              Edit
            </Button>
            <Button
              onClick={handleAutomationDeleteContract(contract.id)}
              loading={contract.deleting}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
