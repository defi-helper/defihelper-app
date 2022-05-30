import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { useEffect } from 'react'

import { BlockchainEnum } from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-contracts.css'
import * as model from './autostaking-contracts.model'

export type AutostakingContractsProps = {
  className?: string
}

export const AutostakingContracts: React.VFC<AutostakingContractsProps> = (
  props
) => {
  const contractsLoading = useStore(model.fetchContractsFx.pending)
  const contracts = useStore(model.$contracts)

  const protocolSelectLoading = false

  const protocolsSelect: any[] = []

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchContractsFx({
      signal: abortController.signal,
    })

    return () => {
      model.resetContracts()
    }
  }, [])

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Staking Contracts
        </Typography>
        <div className={styles.selects}>
          <Select
            placeholder="Choose blockchain"
            className={styles.select}
            clearable
          >
            {Object.entries(BlockchainEnum).map(([title, value]) => (
              <SelectOption value={value} key={title}>
                {title}
              </SelectOption>
            ))}
          </Select>
          <Select
            placeholder="Choose protocol"
            clearable
            multiple
            className={styles.select}
            header={<Input placeholder="Search" />}
            footer={
              <Button color="green" size="medium" className={styles.apply}>
                Apply
              </Button>
            }
          >
            {protocolSelectLoading && isEmpty(protocolsSelect) && (
              <SelectOption disabled>Loading...</SelectOption>
            )}
            {!protocolSelectLoading && isEmpty(protocolsSelect) && (
              <SelectOption disabled>No protocols found</SelectOption>
            )}
            {protocolsSelect.map((protocol) => (
              <SelectOption
                value={protocol.id}
                renderValue={protocol.name}
                key={protocol.id}
              >
                {protocol.icon ? (
                  <img
                    src={protocol.icon}
                    alt=""
                    className={styles.protocolIcon}
                  />
                ) : (
                  <Paper className={styles.protocolIcon} />
                )}
                {protocol.name}
              </SelectOption>
            ))}
          </Select>
          <Input placeholder="Search" className={styles.search} />
        </div>
      </div>
      <div className={styles.tableWrap}>
        <Paper radius={8} className={styles.table}>
          <div className={styles.tableHeader}>
            <Typography variant="body2" as="div" className={styles.tableName}>
              Pool
            </Typography>
            <Typography variant="body2">Protocol</Typography>
            <Typography variant="body2" align="right" as="div">
              TVL
            </Typography>
            <Typography variant="body2" align="right" as="div">
              APY
            </Typography>
            <Typography variant="body2" align="right" as="div">
              Real APR (7d)
            </Typography>
            <Typography variant="body2" as="div">
              APY Boost
            </Typography>
          </div>
          {contracts.map((contract) => (
            <div className={styles.row} key={contract.id}>
              <Typography variant="body2" as="div">
                {contract.name}
              </Typography>
              <Typography variant="body2" as="div">
                {contract.protocol.name}
              </Typography>
              <Typography variant="body2" align="right" as="div">
                ${bignumberUtils.format(contract.metric.tvl)}
              </Typography>
              <Typography variant="body2" align="right" as="div">
                {bignumberUtils.formatMax(
                  bignumberUtils.mul(contract.metric.aprYear, 100),
                  10000
                )}
                %
              </Typography>
              <Typography variant="body2" align="right" as="div">
                {bignumberUtils.formatMax(
                  bignumberUtils.mul(contract.metric.aprWeekReal, 100),
                  10000,
                  true
                )}
                %
              </Typography>
              <div className={styles.apyBoost}>
                <Typography variant="body2" align="right" as="span">
                  {bignumberUtils.formatMax(
                    bignumberUtils.mul(contract.metric.myAPYBoost, 100),
                    10000,
                    true
                  )}
                  %
                </Typography>
                <Button color="green" size="small">
                  auto-stake
                </Button>
              </div>
            </div>
          ))}
          {contractsLoading && (
            <div>
              <Loader height="36" />
            </div>
          )}
        </Paper>
      </div>
    </div>
  )
}
