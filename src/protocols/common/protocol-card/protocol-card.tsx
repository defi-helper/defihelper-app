import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import { Can } from '~/auth'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Dropdown } from '~/common/dropdown'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Protocol } from '../protocol.types'
import { paths } from '~/paths'
import * as styles from './protocol-card.css'

export type ProtocolCardProps = {
  onFavorite: () => void
  onDelete: () => void
  protocol: Protocol
}

export const ProtocolCard: React.VFC<ProtocolCardProps> = (props) => {
  const { protocol } = props

  return (
    <Paper className={clsx(styles.card)} radius={8}>
      <ButtonBase
        className={clsx(
          styles.favorite,
          protocol.favorite && styles.favoriteActive
        )}
        onClick={props.onFavorite}
      >
        <Icon icon="star" />
      </ButtonBase>
      <Typography
        as={ReactRouterLink}
        to={paths.protocols.detail(protocol.id)}
        variant="body2"
        className={clsx(styles.link)}
      >
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
      >
        ${bignumberUtils.format(protocol.metric.tvl)}
      </Typography>
      <Typography variant="body2" as="span" className={styles.label}>
        My APY
      </Typography>
      <Typography
        variant="body2"
        as="span"
        family="mono"
        className={styles.value}
      >
        {bignumberUtils.formatApy(
          bignumberUtils.mul(protocol.metric.myAPY, 100)
        )}
        %
      </Typography>
      <Typography variant="body2" as="span" className={styles.label}>
        My position
      </Typography>
      <Typography
        variant="body2"
        as="span"
        family="mono"
        className={styles.value}
      >
        ${bignumberUtils.format(protocol.metric.myStaked)}
      </Typography>
      <Typography
        variant="body2"
        as="span"
        className={styles.profit}
        family="mono"
      >
        ${bignumberUtils.format(protocol.metric.myEarned)}
        <Can I="update" a="Protocol">
          <Dropdown
            control={
              <ButtonBase className={styles.manage}>
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
