import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { Sticky, StickyContainer } from 'react-sticky'

import { analytics } from '~/analytics'
import { BuyLiquidityProtocolsQuery } from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Icon } from '~/common/icon'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { LPTokensContracts } from '../lp-tokens-contracts'
import { LPContracts } from '../lp-tokens.types'
import * as styles from './lp-tokens-table.css'

export type LPTokensTableProps = {
  className?: string
  onProtocolClick?: (protocolId: string) => void
  onBuyLpClick?: (contract: LPContracts[number]) => void
  protocols: Exclude<
    BuyLiquidityProtocolsQuery['protocols']['list'],
    null | undefined
  >
  contracts: LPContracts
  openedProtocol: string
  protocolListLoading?: boolean
  contractListLoading?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractsSentryRef: any
  contractsHasNextPage: boolean
  onOpenApy: (contract: LPContracts[number]['metric']) => void
}

export const LPTokensTable: React.VFC<LPTokensTableProps> = (props) => {
  const handleOnProtocolClick = (protocolId: string) => () => {
    props.onProtocolClick?.(
      props.openedProtocol === protocolId ? '' : protocolId
    )
  }

  const handleOnBuyLP = (contract: LPContracts[number]) => {
    analytics.log('lp_tokens_lp_token_click')
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
                  <LPTokensContracts
                    contracts={props.contracts}
                    contractListLoading={props.contractListLoading}
                    contractsSentryRef={props.contractsSentryRef}
                    contractsHasNextPage={props.contractsHasNextPage}
                    onBuyLP={handleOnBuyLP}
                    onOpenApy={props.onOpenApy}
                  />
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
