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
import { InvestMigrateContracts } from '~/invest/invest-migrate-contracts'
import { InvestContracts } from '~/invest/invest-contracts'
import * as model from '~/staking/staking-automates/staking-automates.model'
import * as styles from './invest-list.css'

export const InvestList: React.VFC<unknown> = () => {
  const [search, setSearch] = useState('')
  const [currentTab, setCurrentTab] = useState(0)
  const attempt = useRef(0)
  const contracts = useStore(model.$automatesContracts)
  const loaded = useStore(model.$automatesContractsLoaded)

  const searchThrottled = useThrottle(search, 300)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleChangeTab = () => {
    setCurrentTab(0)
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

  return (
    <AppLayout title="Invest">
      <Head title="Invest" />
      <div className={styles.header}>
        <Icon icon="settings" className={styles.headerIcon} />
        <Typography variant="h3">Invest</Typography>
      </div>
      <InvestTabs
        className={styles.tabs}
        onChange={setCurrentTab}
        value={currentTab}
      >
        <InvestTabs.Header>
          <Typography as={ButtonBase} variant="h3">
            Your investments
          </Typography>
          <Typography as={ButtonBase} variant="h3">
            Investments to migrate
          </Typography>
          <InvestTabs.HeaderRight>
            <Input
              placeholder="Search"
              className={styles.search}
              onChange={handleSearch}
            />
          </InvestTabs.HeaderRight>
        </InvestTabs.Header>
        <InvestDeployedContracts search={searchThrottled} />
        <InvestMigrateContracts
          search={searchThrottled}
          onChangeTab={handleChangeTab}
        />
      </InvestTabs>
      <InvestContracts onChangeTab={handleChangeTab} />
    </AppLayout>
  )
}
