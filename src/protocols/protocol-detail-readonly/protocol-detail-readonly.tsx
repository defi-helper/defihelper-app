import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useParams, NavLink as ReactRouterLink } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Paper } from '~/common/paper'
import { Link } from '~/common/link'
import { Icon } from '~/common/icon'
import { Head } from '~/common/head'
import { Loader } from '~/common/loader'
import { Typography } from '~/common/typography'
import {
  clearLink,
  ProtocolCharts,
  ProtocolLastUpdated,
  ProtocolTotal,
} from '../common'
import { Can } from '~/auth'
import { ButtonBase } from '~/common/button-base'
import { paths } from '~/paths'
import { StakingListReadonly } from '~/staking/staking-list-readonly'
import { ProtocolCoinBalanceChart } from '../protocol-coin-balance-chart'
import { ProtocolTvlChart } from '../protocol-tvl-chart'
import * as model from './protocol-detail-readonly.model'
import * as styles from './protocol-detail-readonly.css'
import { bignumberUtils } from '~/common/bignumber-utils'

export type ProtocolDetailReadonlyProps = unknown

export const ProtocolDetailReadonly: React.FC<ProtocolDetailReadonlyProps> =
  () => {
    const params = useParams<{ protocolId: string }>()

    const protocol = useStore(model.$protocol)
    const loading = useStore(model.fetchProtocolFx.pending)

    useGate(model.ProtocolDetailReadonlyGate, params.protocolId)

    return (
      <AppLayout
        title={
          loading && !protocol ? (
            'loading...'
          ) : (
            <div>
              {protocol?.icon && (
                <img src={protocol?.icon} alt="" className={styles.icon} />
              )}
              {protocol?.name}
            </div>
          )
        }
        action={
          <>
            {loading && !protocol ? (
              ''
            ) : (
              <Paper
                target="_blank"
                href={protocol?.link}
                as={Link}
                radius={8}
                className={styles.protocolLink}
              >
                <Icon icon="link" width="16" height="16" />
              </Paper>
            )}
          </>
        }
      >
        <Head
          title={loading && !protocol ? 'loading...' : protocol?.name}
          ogImageUrl={`https://backend.defihelper.io/protocol/opengraph-preview/${params.protocolId}`}
          ogUrl={`https://app.defihelper.io/protocols/${params.protocolId}`}
          description={
            protocol?.name
              ? `${protocol?.name} auto compound with our auto-staking feature. Automate your DeFi strategies across chains, earn more - DeFiHelper`
              : undefined
          }
        />
        {loading && !protocol && (
          <div className={styles.loader}>
            <Loader height="36" />
          </div>
        )}
        {protocol && (
          <>
            <div className={styles.header}>
              {protocol.icon && (
                <img src={protocol.icon} alt="" className={styles.icon} />
              )}
              <Typography variant="h4">{protocol.name}</Typography>
              {protocol.link && (
                <Paper
                  target="_blank"
                  href={protocol.link}
                  as={Link}
                  radius={8}
                  className={styles.protocolLink}
                >
                  {clearLink(protocol.link)}
                </Paper>
              )}
              <Can I="update" a="Protocol">
                <ButtonBase
                  as={ReactRouterLink}
                  to={paths.protocols.update(params.protocolId)}
                  className={styles.edit}
                >
                  Edit
                </ButtonBase>
              </Can>
            </div>
            <div>
              <ProtocolCharts>
                <ProtocolCharts.Header>
                  <Typography variant="h3">Statistics</Typography>
                  {protocol.metric.myMinUpdatedAt && (
                    <ProtocolLastUpdated>
                      {protocol.metric.myMinUpdatedAt}
                    </ProtocolLastUpdated>
                  )}
                </ProtocolCharts.Header>
                <ProtocolCoinBalanceChart />
                <ProtocolTvlChart />
              </ProtocolCharts>
              <ProtocolTotal
                {...protocol.metric}
                hasAutostaking={false}
                readonly
              />
              <Typography
                align="right"
                variant="body3"
                className={clsx(styles.copyright, styles.mb120)}
              >
                Powered by
                <Link
                  target="_blank"
                  href="https://debank.com/"
                  underline="always"
                  className={styles.copyrightLink}
                >
                  <Icon icon="debank" className={styles.copyrightIcon} />
                  DeBank
                </Link>
              </Typography>
              {(bignumberUtils.gt(protocol.metric.myEarned, 0) ||
                bignumberUtils.gt(protocol.metric.myStaked, 0)) && (
                <StakingListReadonly
                  protocolId={params.protocolId}
                  protocolAdapter={protocol.adapter}
                />
              )}
            </div>
          </>
        )}
      </AppLayout>
    )
  }
