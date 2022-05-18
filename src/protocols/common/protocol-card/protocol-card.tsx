import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import { Can } from '~/auth'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Dropdown } from '~/common/dropdown'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Protocol } from '~/protocols/common/protocol.types'
import { paths } from '~/paths'
import { createComponent } from '~/common/create-component'
import * as styles from './protocol-card.css'
import { ProtocolListMetricsQuery } from '~/api/_generated-types'
import { Loader } from '~/common/loader'
import { CanDemo } from '~/auth/common/can-demo'

export type ProtocolCardProps = {
  onFavorite?: () => void
  onDelete: () => void
  protocol: Protocol
  metrics?: Exclude<
    ProtocolListMetricsQuery['protocols']['list'],
    null | undefined
  >[number]['metric']
  tvl?: string
}

export const ProtocolCard = createComponent<HTMLDivElement, ProtocolCardProps>(
  (props, ref) => {
    const { protocol } = props

    const preventDefault = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
    }

    const tvl =
      props.tvl && bignumberUtils.gt(props.tvl, 0)
        ? props.tvl
        : props.metrics?.tvl

    return (
      <Paper
        className={clsx(styles.card)}
        radius={8}
        as={ReactRouterLink}
        to={
          protocol.adapter === 'debankByApiReadonly'
            ? paths.protocols.detailReadonly(protocol.id)
            : paths.protocols.detail(protocol.id)
        }
        ref={ref as React.ForwardedRef<null>}
      >
        <ButtonBase onClick={preventDefault}>
          <CanDemo>
            <ButtonBase
              className={clsx(
                styles.favorite,
                protocol.favorite && styles.favoriteActive
              )}
              onClick={() => props.onFavorite?.()}
              disabled={!props.onFavorite}
              as="span"
            >
              <Icon icon="star" width="16" height="16" />
            </ButtonBase>
          </CanDemo>
        </ButtonBase>
        <Typography as="span" variant="body2" className={clsx(styles.link)}>
          {protocol.icon && (
            <img
              src={protocol.icon}
              alt={protocol.name}
              width="24"
              height="24"
              className={styles.logo}
            />
          )}
          {protocol.name}
        </Typography>
        <Typography variant="body2" as="span" className={styles.label}>
          Protocol TVL
        </Typography>
        <Typography
          variant="body2"
          as="span"
          family="mono"
          className={styles.value}
          align="right"
        >
          {tvl ? `$${bignumberUtils.format(tvl)}` : <Loader height="1em" />}
        </Typography>
        <Typography variant="body2" as="span" className={styles.label}>
          My APY
        </Typography>
        <Typography
          variant="body2"
          as="span"
          family="mono"
          className={styles.value}
          align="right"
        >
          {props.metrics ? (
            <>
              {bignumberUtils.formatMax(
                bignumberUtils.mul(props.metrics.myAPY, 100),
                10000
              )}
              %
            </>
          ) : (
            <Loader height="1em" />
          )}
        </Typography>
        <Typography variant="body2" as="span" className={styles.label}>
          My position
        </Typography>
        <Typography
          variant="body2"
          as="span"
          family="mono"
          className={styles.value}
          align="right"
        >
          {props.metrics ? (
            <>${bignumberUtils.format(props.metrics.myStaked)}</>
          ) : (
            <Loader height="1em" />
          )}
        </Typography>
        <Typography
          variant="body2"
          as="span"
          className={styles.profit}
          family="mono"
          align="right"
        >
          {props.metrics ? (
            <>${bignumberUtils.format(props.metrics.myEarned)}</>
          ) : (
            <Loader height="1em" />
          )}
          <Can I="update" a="Protocol">
            <Dropdown
              control={
                <ButtonBase className={styles.manage} as="span">
                  <Icon icon="dots" />
                </ButtonBase>
              }
            >
              <Can I="update" a="Protocol">
                <ButtonBase
                  as={ReactRouterLink}
                  to={paths.protocols.update(protocol.id)}
                  className={styles.manageDropdownItem}
                >
                  Edit
                </ButtonBase>
              </Can>
              <Can I="delete" a="Protocol">
                <ButtonBase
                  disabled={protocol.deleting}
                  onClick={props.onDelete}
                  className={styles.manageDropdownItem}
                >
                  Delete
                </ButtonBase>
              </Can>
            </Dropdown>
          </Can>
        </Typography>
      </Paper>
    )
  }
)
