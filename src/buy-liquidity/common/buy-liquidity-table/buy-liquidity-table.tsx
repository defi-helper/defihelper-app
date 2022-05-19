import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import { BuyLiquidityProtocolsQuery, BuyLiquidityContractsQuery } from '~/api'
import { CanDemo } from '~/auth/common/can-demo'
import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { cutAccount } from '~/common/cut-account'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './buy-liquidity-table.css'

type Contracts = Exclude<
  Exclude<
    BuyLiquidityContractsQuery['protocol'],
    null | undefined
  >['contracts']['list'],
  null | undefined
>

export type BuyLiquidityTableProps = {
  className?: string
  onProtocolClick?: (protocolId: string) => void
  onBuyLpClick?: (contract: Contracts[number]) => void
  protocols: Exclude<
    BuyLiquidityProtocolsQuery['protocols']['list'],
    null | undefined
  >
  contracts: Contracts
  openedProtocol: string
  protocolListLoading?: boolean
  contractListLoading?: boolean
}

export const BuyLiquidityTable: React.VFC<BuyLiquidityTableProps> = (props) => {
  const handleOnProtocolClick = (protocolId: string) => () => {
    props.onProtocolClick?.(
      props.openedProtocol === protocolId ? '' : protocolId
    )
  }

  const handleOnBuyLP = (contract: Contracts[number]) => () => {
    props.onBuyLpClick?.(contract)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="body2">Name</Typography>
        <Typography variant="body2">Protocol TVL</Typography>
      </div>
      <ul className={styles.list}>
        {!props.protocolListLoading && isEmpty(props.protocols) && (
          <li className={styles.listItemLoader}>
            <Paper radius={8} className={styles.empty}>
              No protocols found
            </Paper>
          </li>
        )}
        {props.protocols.map((protocol) => {
          const opened = protocol.id === props.openedProtocol

          return (
            <li className={styles.listItem} key={protocol.id}>
              <Paper
                radius={8}
                className={styles.protocolCard}
                onClick={handleOnProtocolClick(protocol.id)}
              >
                <Typography variant="body2" className={styles.protocolCardName}>
                  {protocol.icon ? (
                    <img
                      src={protocol.icon}
                      alt=""
                      className={styles.protocolCardImage}
                    />
                  ) : (
                    <Paper className={styles.protocolCardImage} />
                  )}
                  <Typography variant="inherit">{protocol.name}</Typography>
                </Typography>
                <Typography variant="body2" className={styles.protocolCardTvl}>
                  <Typography variant="inherit" className={styles.grey}>
                    Protocol TVL
                  </Typography>
                  <Typography variant="inherit">
                    ${bignumberUtils.format(protocol.metric.tvl)}
                  </Typography>
                </Typography>
                <Icon
                  icon={opened ? 'arrowUp' : 'arrowDown'}
                  width="24"
                  height="24"
                  className={styles.protocolCardArrow}
                />
              </Paper>
              {opened && (
                <div className={styles.contracts}>
                  <div className={styles.contractHeader}>
                    <Typography variant="body2">Pool</Typography>
                    <Typography variant="body2">TVL</Typography>
                    <Typography variant="body2">APY</Typography>
                    <Typography variant="body2">LP Token Address</Typography>
                  </div>
                  {!props.contractListLoading && isEmpty(props.contracts) && (
                    <div className={styles.listItemLoader}>
                      <Paper
                        radius={8}
                        className={clsx(styles.empty, styles.emptyContracts)}
                      >
                        No contracts found
                      </Paper>
                    </div>
                  )}
                  {props.contracts.map((contract) => {
                    const logoUrls = contract.tokens.stake.map(
                      ({ alias }) => alias?.logoUrl
                    )

                    return (
                      <Paper
                        radius={8}
                        className={styles.contractCard}
                        key={contract.id}
                      >
                        <Typography
                          as="div"
                          variant="body2"
                          className={styles.contractCardName}
                        >
                          <span className={styles.contractCardIcons}>
                            {isEmpty(logoUrls) ? (
                              <Paper className={styles.contractCardIcon} />
                            ) : (
                              logoUrls.map((logourl, index) =>
                                logourl ? (
                                  <img
                                    src={logourl}
                                    alt=""
                                    className={styles.contractCardIcon}
                                    key={String(index)}
                                  />
                                ) : (
                                  <Paper
                                    className={styles.contractCardIcon}
                                    key={String(index)}
                                  />
                                )
                              )
                            )}
                          </span>
                          <Typography variant="inherit">
                            {contract.name}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body2"
                          className={styles.contractCardTextRow}
                        >
                          <Typography variant="inherit" className={styles.grey}>
                            TVL
                          </Typography>
                          <Typography variant="inherit">
                            ${bignumberUtils.format(contract.metric.tvl)}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body2"
                          className={styles.contractCardTextRow}
                        >
                          <Typography variant="inherit" className={styles.grey}>
                            APY
                          </Typography>
                          <Typography variant="inherit">
                            {bignumberUtils.formatMax(
                              bignumberUtils.mul(contract.metric.aprYear, 100),
                              10000
                            )}
                            %
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body2"
                          className={styles.contractCardTextRow}
                        >
                          <Typography variant="inherit" className={styles.grey}>
                            LP Token Address
                          </Typography>{' '}
                          <Link
                            target="_blank"
                            color="blue"
                            className={styles.contractCardLink}
                            href={buildExplorerUrl({
                              address: contract.address,
                              network: contract.network,
                            })}
                          >
                            {cutAccount(contract.address)}{' '}
                            <Icon icon="link" width="1em" height="1em" />
                          </Link>
                        </Typography>
                        <div className={styles.contractButtonWrap}>
                          <CanDemo>
                            <Button
                              size="medium"
                              color="green"
                              className={styles.contractButton}
                              onClick={handleOnBuyLP(contract)}
                            >
                              Buy lp
                            </Button>
                          </CanDemo>
                        </div>
                      </Paper>
                    )
                  })}
                  {props.contractListLoading && (
                    <div className={styles.listItemLoader}>
                      <Loader height="36" />
                    </div>
                  )}
                </div>
              )}
            </li>
          )
        })}
        {props.protocolListLoading && (
          <li className={styles.listItemLoader}>
            <Loader height="36" />
          </li>
        )}
      </ul>
    </div>
  )
}
