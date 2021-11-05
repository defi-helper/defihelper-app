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
import { AutomateTriggerTypeEnum } from '~/graphql/_generated-types'
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
  type: AutomateTriggerTypeEnum
}

type LabelProps = {
  title?: React.ReactNode
  value?: React.ReactNode
  subtitle?: React.ReactNode
  automation: boolean
}

const Label: React.VFC<LabelProps> = (props) => {
  return (
    <div>
      <Typography
        variant="body3"
        family="mono"
        transform="uppercase"
        className={props.automation ? styles.titleGreen : styles.titlePink}
      >
        {props.title}
      </Typography>
      <Typography>{props.value}</Typography>
      <Typography variant="body3" className={styles.subtitle}>
        {props.subtitle}
      </Typography>
    </div>
  )
}

export const AutomationCard: React.VFC<AutomationCardProps> = (props) => {
  const pending = props.deleting || props.editing

  const automation = [
    AutomateTriggerTypeEnum.EveryDay,
    AutomateTriggerTypeEnum.EveryHour,
    AutomateTriggerTypeEnum.EveryMonth,
    AutomateTriggerTypeEnum.EveryWeek,
  ].includes(props.type)

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div>
        <Chip
          color={automation ? 'lightGreen' : 'pink'}
          variant="contained"
          className={styles.type}
        >
          {automation ? 'Automation' : 'Event'}
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
      <Label
        title="Condition"
        value="4 Triggers"
        subtitle="BondAppetit, Etherium"
        automation={automation}
      />
      <Label
        title="Action"
        value="Claim, Exchange, Transfer"
        subtitle="from BAG+USDC, to USDT, to 0x684..."
        automation={automation}
      />
      <Label
        title="Wallet"
        value="wallet main eth"
        subtitle="Fee Funds: 2.015 ETH"
        automation={automation}
      />
      <Switch checked={props.active} onChange={props.onActivate} />
    </Paper>
  )
}
