import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import { useGate, useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'

import { AppLayout } from '~/layouts/app-layout'
import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
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
import { AutomationProducts } from '../automation-products'
import { Loader } from '~/common/loader'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { WalletConnect } from '~/wallets/wallet-connect'
import { SearchDialog } from '~/common/search-dialog'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as styles from './automation-list.css'
import * as model from './automation-list.model'
import { pluralize } from '~/common/pluralize'
import { CanDemo } from '~/auth/common/can-demo'

export type AutomationListProps = unknown

export const AutomationList: React.VFC<AutomationListProps> = () => {
  const triggers = useStore(model.$triggers)
  const loading = useStore(model.fetchTriggersFx.pending)
  const contracts = useStore(model.$contracts)
  const descriptions = useStore(model.$descriptions)
  const balanceLoading = useStore(model.fetchBalanceFx.pending)
  const balance = useStore(model.$balance)

  const [dontShow, setDontShow] = useLocalStorage('dontShowAutomation', false)
  const [search, setSearch] = useState('')

  const [openAutomationTrigger] = useDialog(AutomationUpdate)
  const [openDescriptionDialog] = useDialog(AutomationTriggerDescriptionDialog)
  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openAutomationProducts] = useDialog(AutomationProducts)
  const [openSearchDialog] = useDialog(SearchDialog)
  const wallet = walletNetworkModel.useWalletNetwork()

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
    if (!wallet) return

    await openAutomationTrigger({
      updatingTrigger: trigger,
      contracts,
      descriptions,
      wallet,
    }).catch((error: Error) => console.error(error.message))
  }

  const handleActivate = (trigger: Trigger) => () => {
    model.toggleTriggerFx({
      triggerId: trigger.id,
      active: !trigger.active,
    })
  }

  const handleAddAutomation = async () => {
    if (!wallet) return

    try {
      if (!dontShow) {
        const result = await openDescriptionDialog()

        setDontShow(result)
      }

      await openAutomationTrigger({
        wallet,
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
    if (!wallet?.account) return

    try {
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

  const handleSearchMobile = async () => {
    try {
      const result = await openSearchDialog()

      setSearch(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  useGate(model.AutomationListGate, search)

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
          <ButtonBase
            className={styles.searchButton}
            onClick={handleSearchMobile}
          >
            <Icon icon="search" width="16" height="16" />
          </ButtonBase>
          <WalletConnect fallback={<Button color="blue">+</Button>}>
            <Button
              color="blue"
              className={styles.addAutomations}
              onClick={handleAddAutomation}
            >
              +
            </Button>
          </WalletConnect>
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
              {balanceLoading ? '...' : bignumberUtils.format(balance)}{' '}
              {pluralize(balance, 'Notification')}
              <Typography variant="inherit" className={styles.left}>
                left
              </Typography>
            </Typography>
          </Paper>
          <WalletConnect fallback={<Button>Buy</Button>}>
            <CanDemo>
              <Button onClick={handleBuyProducts}>Buy</Button>
            </CanDemo>
          </WalletConnect>
          <Input
            placeholder="Search"
            className={styles.searchDesktop}
            value={search}
            onChange={handleSearch}
          />
          <WalletConnect
            fallback={
              <Button color="blue">
                +
                <Typography variant="inherit" className={styles.left}>
                  new automation
                </Typography>
              </Button>
            }
          >
            <CanDemo>
              <Button color="blue" onClick={handleAddAutomation}>
                +
                <Typography variant="inherit" className={styles.left}>
                  new automation
                </Typography>
              </Button>
            </CanDemo>
          </WalletConnect>
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
          {!loading && isEmpty(triggers) && (
            <Paper radius={8} className={styles.loader}>
              <Typography variant="body2">
                Automate your DeFi strategy and earn higher rewards with
                auto-staking and other no-code tools.
              </Typography>
              <Button
                onClick={handleAddAutomation}
                className={styles.empty}
                size="small"
              >
                + Add automation
              </Button>
            </Paper>
          )}
          {!loading &&
            !isEmpty(triggers) &&
            triggers.map((trigger) => (
              <AutomationCard
                key={trigger.id}
                id={trigger.id}
                name={trigger.name}
                restakeIn={trigger.restakeAt ?? null}
                onEdit={wallet ? handleEditTrigger(trigger) : undefined}
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
      </div>
    </AppLayout>
  )
}
