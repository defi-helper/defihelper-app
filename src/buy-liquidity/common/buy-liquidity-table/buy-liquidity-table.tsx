import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { Sticky, StickyContainer } from 'react-sticky'

import { BuyLiquidityProtocolsQuery, BuyLiquidityContractsQuery } from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { cutAccount } from '~/common/cut-account'
import { useDialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { StakeRewardTokens } from '~/common/stake-reward-tokens'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { StakingApyDialog } from '~/staking/common'
import { WalletConnect } from '~/wallets/wallet-connect'
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractsSentryRef: any
  contractsHasNextPage: boolean
}

export const BuyLiquidityTable: React.VFC<BuyLiquidityTableProps> = (props) => {
  const [openApyDialog] = useDialog(StakingApyDialog)

  const handleOnProtocolClick = (protocolId: string) => () => {
    props.onProtocolClick?.(
      props.openedProtocol === protocolId ? '' : protocolId
    )
  }

  const handleOnBuyLP = (contract: Contracts[number]) => () => {
    props.onBuyLpClick?.(contract)
  }

  const handleOpenApy = (metric: Contracts[number]['metric']) => async () => {
    const apr = {
      '1d': metric.aprDay,
      '7d': metric.aprWeek,
      '30d': metric.aprMonth,
      '365d(APY)': metric.aprYear,
    }

    try {
      await openApyDialog({
        apr,
        staked: metric.myStaked,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="body2">Name</Typography>
        <Typography variant="body2">Protocol TVL</Typography>
      </div>
      <ul className={styles.list}>
        {!props.protocolListLoading && isEmpty(props.protocols) && (
          <li>
            <Paper radius={8} className={styles.empty}>
              No protocols found
            </Paper>
          </li>
        )}
        {props.protocols.map((protocol) => {
          const opened = protocol.id === props.openedProtocol

          return (
            <li className={styles.listItem} key={protocol.id}>
              <StickyContainer>
                <Sticky>
                  {({ isSticky, style }) => {
                    return (
                      <Paper
                        radius={8}
                        className={styles.protocolCard}
                        onClick={handleOnProtocolClick(protocol.id)}
                        style={isSticky && opened ? style : undefined}
                      >
                        <Typography
                          variant="body2"
                          className={styles.protocolCardName}
                        >
                          {protocol.icon ? (
                            <img
                              src={protocol.icon}
                              alt=""
                              className={styles.protocolCardImage}
                            />
                          ) : (
                            <Paper className={styles.protocolCardImage} />
                          )}
                          <Typography variant="inherit">
                            {protocol.name}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body2"
                          className={styles.protocolCardTvl}
                        >
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
                    )
                  }}
                </Sticky>
                {opened && (
                  <div className={styles.contracts}>
                    <div className={styles.contractHeader}>
                      <Typography variant="body2">Pool</Typography>
                      <Typography variant="body2">TVL</Typography>
                      <Typography variant="body2">APY</Typography>
                      <Typography variant="body2">LP Token Address</Typography>
                    </div>
                    {!props.contractListLoading && isEmpty(props.contracts) && (
                      <div>
                        <Paper
                          radius={8}
                          className={clsx(styles.empty, styles.emptyContracts)}
                        >
                          No contracts found
                        </Paper>
                      </div>
                    )}
                    {props.contracts.map((contract, contractIndex) => {
                      return (
                        <Paper
                          radius={8}
                          className={styles.contractCard}
                          key={contract.id + String(contractIndex)}
                        >
                          <Typography
                            as="div"
                            variant="body2"
                            className={styles.contractCardName}
                          >
                            <span className={styles.contractCardIcons}>
                              {networksConfig[contract.network]?.icon ? (
                                <Icon
                                  icon={networksConfig[contract.network].icon}
                                  width="20"
                                  height="20"
                                  className={styles.contractNetworkIcon}
                                />
                              ) : (
                                <Paper
                                  className={styles.contractUnknownNetworkIcon}
                                >
                                  <Icon
                                    icon="unknownNetwork"
                                    width="16"
                                    height="16"
                                  />
                                </Paper>
                              )}
                              <StakeRewardTokens
                                stakeTokens={contract.tokens.stake}
                                rewardTokens={contract.tokens.reward}
                              />
                            </span>
                            <Typography variant="inherit">
                              {contract.name}
                            </Typography>
                          </Typography>
                          <Typography
                            variant="body2"
                            className={styles.contractCardTextRow}
                          >
                            <Typography
                              variant="inherit"
                              className={styles.grey}
                            >
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
                            <Typography
                              variant="inherit"
                              className={styles.grey}
                            >
                              APY
                            </Typography>
                            <Typography variant="inherit">
                              {bignumberUtils.formatMax(
                                bignumberUtils.mul(
                                  contract.metric.aprYear,
                                  100
                                ),
                                10000
                              )}
                              %
                              <ButtonBase
                                onClick={handleOpenApy(contract.metric)}
                                className={styles.apyButton}
                              >
                                <Icon
                                  icon="calculator"
                                  width="20"
                                  height="20"
                                />
                              </ButtonBase>
                            </Typography>
                          </Typography>
                          <Typography
                            variant="body2"
                            className={styles.contractCardTextRow}
                          >
                            <Typography
                              variant="inherit"
                              className={styles.grey}
                            >
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
                            <WalletConnect
                              fallback={
                                <Button
                                  size="medium"
                                  color="green"
                                  className={styles.contractButton}
                                >
                                  LP Tokens
                                </Button>
                              }
                            >
                              <Button
                                size="medium"
                                color="green"
                                className={styles.contractButton}
                                onClick={handleOnBuyLP(contract)}
                              >
                                LP Tokens
                              </Button>
                            </WalletConnect>
                          </div>
                        </Paper>
                      )
                    })}
                    {props.contractsHasNextPage && (
                      <div
                        className={styles.listItemLoader}
                        ref={props.contractsSentryRef}
                      >
                        <Loader height="36" />
                      </div>
                    )}
                  </div>
                )}
              </StickyContainer>
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
