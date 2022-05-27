import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import { BlockchainEnum } from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { Paper } from '~/common/paper'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-contracts.css'

export type AutostakingContractsProps = {
  className?: string
}

export const AutostakingContracts: React.VFC<AutostakingContractsProps> = (
  props
) => {
  const protocolSelectLoading = false

  const protocolsSelect: any[] = []

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
      <Paper radius={8}>
        <div className={styles.tableHeader}>
          <Typography variant="body2">Pool</Typography>
          <Typography variant="body2">Protocol</Typography>
          <Typography variant="body2" align="right">
            TVL
          </Typography>
          <Typography variant="body2" align="right">
            APY
          </Typography>
          <Typography variant="body2" align="right">
            Real APR (7d)
          </Typography>
          <Typography variant="body2" align="right">
            APY Boost
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="body2">Cake-WBNB</Typography>
          <Typography variant="body2">PancakeSwap</Typography>
          <Typography variant="body2" align="right">
            ${bignumberUtils.format('19024804')}
          </Typography>
          <Typography variant="body2" align="right">
            {bignumberUtils.formatMax('0', 10000)}%
          </Typography>
          <Typography variant="body2" align="right">
            {bignumberUtils.formatMax('1059', 10000, true)}%
          </Typography>
          <div>
            <Typography variant="body2" align="right" as="span">
              {bignumberUtils.formatMax('5672', 10000, true)}%
            </Typography>
            <Button color="green" size="small">
              auto-stake
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}
