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
import { Dropdown } from '~/common/dropdown'
import { AutomationProducts } from '../automation-products'
import { useWalletList } from '~/wallets/wallet-list'
import { Loader } from '~/common/loader'
import * as styles from './automation-list.css'
import * as model from './automation-list.model'

export type AutomationListProps = unknown

export const AutomationList: React.VFC<AutomationListProps> = () => {
  const triggers = useStore(model.$triggers)
  const loading = useStore(model.fetchTriggersFx.pending)
  const contracts = useStore(model.$contracts)
  const automateContracts = useStore(model.$automateContracts)
  const descriptions = useStore(model.$descriptions)
  const balanceLoading = useStore(model.fetchBalanceFx.pending)
  const balance = useStore(model.$balance)

  const [dontShow, setDontShow] = useLocalStorage('dontShow', false)

  const [openAutomationTrigger] = useDialog(AutomationUpdate)
  const [openAutomationUpdateContract] = useDialog(AutomationUpdateContract)
  const [openDescriptionDialog] = useDialog(AutomationTriggerDescriptionDialog)
  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openAutomationProducts] = useDialog(AutomationProducts)
  const [openWalletList] = useWalletList()

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
        contracts,
        descriptions,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleBuyProducts = async () => {
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

      await openAutomationProducts({
        balance,
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
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
              {balanceLoading ? '...' : balance}
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
              {balanceLoading ? '...' : balance} Notifications
              <Typography variant="inherit" className={styles.left}>
                left
              </Typography>
            </Typography>
          </Paper>
          <Button onClick={handleBuyProducts}>Buy</Button>
          <Input placeholder="Search" className={styles.searchDesktop} />
          <Button color="blue" onClick={handleAddAutomation}>
            +
            <Typography variant="inherit" className={styles.left}>
              new automation
            </Typography>
          </Button>
        </div>
        <div className={styles.grid}>
          {loading && (
            <Paper radius={8} className={styles.loader}>
              <Typography variant="body2">
                Loading your automations...
              </Typography>
              <Loader className={styles.loaderIcon} />
            </Paper>
          )}
          {!loading && isEmpty(triggers) && <Paper radius={8}>empty</Paper>}
          {!loading &&
            !isEmpty(triggers) &&
            triggers.map((trigger) => (
              <AutomationCard
                key={trigger.id}
                id={trigger.id}
                name={trigger.name}
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
        {!isEmpty(contracts) && (
          <div>
            <Typography variant="h3" className={styles.contractTitle}>
              Contracts
            </Typography>
            <div className={styles.table}>
              <Paper radius={8} className={styles.tableInner}>
                <div className={styles.tableheader}>
                  <Typography variant="body2" as="div">
                    Adapter
                  </Typography>
                  <Typography variant="body2" as="div">
                    Reject reason
                  </Typography>
                  <Typography variant="body2" as="div">
                    Verification
                  </Typography>
                  <Typography variant="body2" as="div">
                    Address
                  </Typography>
                </div>
                {contracts.map((contract) => (
                  <div className={styles.row}>
                    <Typography variant="body2" as="div">
                      {contract.adapter}
                    </Typography>
                    <Typography variant="body2" as="div">
                      {contract.rejectReason}
                    </Typography>
                    <Typography variant="body2" as="div">
                      {contract.verification}
                    </Typography>
                    <Typography variant="body2" as="div">
                      {contract.address}
                    </Typography>
                    <Dropdown
                      control={
                        <ButtonBase className={styles.manageButton}>
                          <Icon icon="dots" />
                        </ButtonBase>
                      }
                    >
                      <ButtonBase
                        onClick={handleAutomationUpdateContract(contract)}
                      >
                        Edit
                      </ButtonBase>
                      <ButtonBase
                        onClick={handleAutomationDeleteContract(contract.id)}
                      >
                        Delete
                      </ButtonBase>
                    </Dropdown>
                  </div>
                ))}
              </Paper>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
