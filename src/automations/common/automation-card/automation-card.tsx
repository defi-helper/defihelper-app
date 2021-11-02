import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ButtonBase } from '~/common/button-base'
import { Chip } from '~/common/chip'
import { CircularProgress } from '~/common/circular-progress'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import { paths } from '~/paths'
import * as styles from './automation-card.css'

export type AutomationCardProps = {
  onEdit: () => void
  onDelete: () => void
  active: boolean
  onActivate: () => void
  deleting?: boolean
  editing?: boolean
  id: string
  className?: string
}

export const AutomationCard: React.VFC<AutomationCardProps> = (props) => {
  const pending = props.deleting || props.editing

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div>
        <Chip color="lightGreen" variant="contained" className={styles.type}>
          Automation
        </Chip>
        <Dropdown
          control={(active) => (
            <ButtonBase
              className={clsx(
                styles.manage,
                active && styles.manageActive,
                pending && styles.manageLoading
              )}
            >
              {pending && (
                <CircularProgress className={styles.circularProgress} />
              )}
              <Icon
                icon="dots"
                className={clsx(
                  styles.manageIcon,
                  pending && styles.manageIconloading
                )}
              />
            </ButtonBase>
          )}
          placement="left-start"
          className={styles.dropdown}
          offset={[0, 4]}
        >
          <ButtonBase className={styles.dropdownItem} onClick={props.onEdit}>
            Edit
          </ButtonBase>
          <ButtonBase
            as={ReactRouterLink}
            className={styles.dropdownItem}
            to={paths.automations.history(props.id)}
          >
            History
          </ButtonBase>
          <ButtonBase
            className={clsx(styles.dropdownItem, styles.red)}
            onClick={props.onDelete}
          >
            Delete
          </ButtonBase>
        </Dropdown>
      </div>
      <div>
        <Typography
          variant="body3"
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          Action
        </Typography>
        <Typography>Claim, Exchange, Transfer</Typography>
        <Typography variant="body3" className={styles.subtitle}>
          from BAG+USDC, to USDT, to 0x684...
        </Typography>
      </div>
      <div>
        <Typography
          variant="body3"
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          Condition
        </Typography>
        <Typography>4 Triggers</Typography>
        <Typography variant="body3" className={styles.subtitle}>
          BondAppetit, Etherium
        </Typography>
      </div>
      <div>
        <Typography
          variant="body3"
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          Wallet
        </Typography>
        <Typography>wallet main eth</Typography>
        <Typography variant="body3" className={styles.subtitle}>
          Fee Funds: 2.015 ETH
        </Typography>
      </div>
      <Switch checked={props.active} onChange={props.onActivate} />
    </Paper>
  )
}
