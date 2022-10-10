import { useGate, useStore } from 'effector-react'
import { useEffect, useState, useRef } from 'react'
import { useThrottle } from 'react-use'

import { AppLayout } from '~/layouts'
import { Head } from '~/common/head'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { InvestTabs } from '~/invest/common/invest-tabs'
import { ButtonBase } from '~/common/button-base'
import { Input } from '~/common/input'
import { InvestDeployedContracts } from '~/invest/invest-deployed-contracts'
import { InvestMigrateContracts } from '~/invest/common/invest-migrate-contracts'
import { InvestContracts } from '~/invest/invest-contracts'
import * as model from '~/staking/staking-automates/staking-automates.model'
import * as investListModel from './invest-list.model'
import * as styles from './invest-list.css'
import { authModel } from '~/auth'

export const InvestList: React.VFC<unknown> = () => {
  const [search, setSearch] = useState('')
  const [currentTab, setCurrentTab] = useState(0)
  const attempt = useRef(0)
  const contracts = useStore(model.$automatesContracts)
  const loaded = useStore(model.$automatesContractsLoaded)
  const migrateContracts = useStore(investListModel.$contractsWithLoading)
  const migrateHiddenContracts = useStore(
    investListModel.$hiddenContractsWithLoading
  )
  const loading = useStore(investListModel.fetchContractsFx.pending)

  const user = useStore(authModel.$user)

  const searchThrottled = useThrottle(search, 300)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    setSearch('')
  }, [currentTab])

  useEffect(() => {
    if (attempt.current > 0) return

    if (!contracts.length && loaded) {
      setCurrentTab(1)
      attempt.current += 1
    }
  }, [contracts.length, loaded, searchThrottled])

  useGate(
    model.StakingAutomatesGate,
    searchThrottled && !currentTab ? { search: searchThrottled } : null
  )

  useEffect(() => {
    if (!currentTab) {
      model.StakingAutomatesGate.open(null)
    }
  }, [currentTab])

  useEffect(() => {
    if (!search) return

    attempt.current += 1
  }, [search])

  const handleHide = (
    contract:
      | typeof migrateContracts[number]
      | typeof migrateHiddenContracts[number]
  ) => {
    if (!user?.id) return

    investListModel.contractUserUnlinkFx({
      contract,
      userId: user.id,
    })
  }

  const handleShow = (
    contract:
      | typeof migrateContracts[number]
      | typeof migrateHiddenContracts[number]
  ) => {
    if (!user?.id) return

    investListModel.contractUserLinkFx({
      contract,
      userId: user.id,
    })
  }

  useEffect(() => {
    if (!user) return

    const abortController = new AbortController()

    investListModel.fetchContractsFx({
      signal: abortController.signal,
      filter: searchThrottled ? { search: searchThrottled } : undefined,
    })
    return () => {
      investListModel.resetContracts()
      investListModel.resetHiddenContracts()

      abortController.abort()
    }
  }, [searchThrottled, user])

  useEffect(() => {
    if (!user) return

    const abortController = new AbortController()

    investListModel.fetchHiddenContractsFx({ signal: abortController.signal })

    return () => abortController.abort()
  }, [user])

  useEffect(() => {
    return () => {
      investListModel.resetContracts()
      investListModel.resetHiddenContracts()
    }
  }, [])

  const migrateContractsWithHidden = [
    ...migrateContracts,
    ...migrateHiddenContracts,
  ]

  return (
    <AppLayout title="Invest">
      <Head title="Invest" />
      <div className={styles.header}>
        <Icon icon="settings" className={styles.headerIcon} />
        <Typography variant="h3">Invest</Typography>
      </div>
      {Boolean(contracts.length || migrateContractsWithHidden.length) && (
        <InvestTabs
          className={styles.tabs}
          onChange={setCurrentTab}
          value={currentTab}
        >
          <InvestTabs.Header>
            {contracts.length ? (
              <Typography as={ButtonBase} variant="h3">
                Your investments
              </Typography>
            ) : undefined}
            {migrateContractsWithHidden.length ? (
              <Typography as={ButtonBase} variant="h3">
                Investments to migrate
              </Typography>
            ) : undefined}
            <InvestTabs.HeaderRight>
              <Input
                placeholder="Search"
                className={styles.search}
                onChange={handleSearch}
              />
            </InvestTabs.HeaderRight>
          </InvestTabs.Header>
          {contracts.length ? (
            <InvestDeployedContracts search={searchThrottled} />
          ) : undefined}
          {migrateContractsWithHidden.length ? (
            <InvestMigrateContracts
              search={searchThrottled}
              contracts={migrateContracts}
              hiddenContracts={migrateHiddenContracts}
              loading={loading}
              onShow={handleShow}
              onHide={handleHide}
            />
          ) : undefined}
        </InvestTabs>
      )}
      <InvestContracts />
    </AppLayout>
  )
}
