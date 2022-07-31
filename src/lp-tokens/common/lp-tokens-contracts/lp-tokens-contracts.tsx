import isEmpty from 'lodash.isempty'

import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { cutAccount } from '~/common/cut-account'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { StakeRewardTokens } from '~/common/stake-reward-tokens'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { WalletConnect } from '~/wallets/wallet-connect'
import { LPContracts } from '../lp-tokens.types'
import * as styles from './lp-tokens-contracts.css'

export type LPTokensContractsProps = {
  contracts: LPContracts
  contractListLoading?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractsSentryRef: any
  contractsHasNextPage: boolean
  onBuyLP: (contract: LPContracts[number]) => void
  onOpenApy: (contract: LPContracts[number]['metric']) => void
}

export const LPTokensContracts: React.VFC<LPTokensContractsProps> = (props) => {
  const handleOnBuyLP = (contract: LPContracts[number]) => () =>
    props.onBuyLP(contract)
  const handleOpenApy = (metric: LPContracts[number]['metric']) => () =>
    props.onOpenApy(metric)

  return (
    <>
      {!props.contractListLoading && isEmpty(props.contracts) && (
        <Paper radius={8} className={styles.empty}>
          <Icon icon="noResults" />
          <Typography align="center">No results :(</Typography>
          <Typography variant="body2" align="center">
            We could not find any pools for your query. Try to reset filters,
            search another pool or change your query
          </Typography>
        </Paper>
      )}
      {!isEmpty(props.contracts) && (
        <div className={styles.contracts}>
          <div className={styles.contractHeader}>
            <Typography variant="body2">Pool</Typography>
            <Typography variant="body2">TVL</Typography>
            <Typography variant="body2">APY</Typography>
            <Typography variant="body2">LP Token Address</Typography>
          </div>
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
                  <Typography variant="inherit">{contract.name}</Typography>
                  <span className={styles.contractCardIcons}>
                    {networksConfig[contract.network]?.icon ? (
                      <Icon
                        icon={networksConfig[contract.network].icon}
                        width="20"
                        height="20"
                        className={styles.contractNetworkIcon}
                      />
                    ) : (
                      <Paper className={styles.contractUnknownNetworkIcon}>
                        <Icon icon="unknownNetwork" width="16" height="16" />
                      </Paper>
                    )}
                    <StakeRewardTokens
                      stakeTokens={contract.tokens.stake}
                      rewardTokens={contract.tokens.reward}
                    />
                  </span>
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
                    <ButtonBase
                      onClick={handleOpenApy(contract.metric)}
                      className={styles.apyButton}
                    >
                      <Icon icon="calculator" width="20" height="20" />
                    </ButtonBase>
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
                  <WalletConnect
                    fallback={
                      <Button
                        size="medium"
                        color="green"
                        className={styles.contractButton}
                      >
                        ZAP
                      </Button>
                    }
                  >
                    <Button
                      size="medium"
                      color="green"
                      className={styles.contractButton}
                      onClick={handleOnBuyLP(contract)}
                    >
                      ZAP
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
    </>
  )
}
