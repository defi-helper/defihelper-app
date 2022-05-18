import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import dayjs from 'dayjs'
import { ButtonBase } from '~/common/button-base'
import { Chip } from '~/common/chip'
import { CircularProgress } from '~/common/circular-progress'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import {
  AutomateActionType,
  AutomateActionTypeEnum,
  AutomateConditionType,
  AutomateTriggerTypeEnum,
  AutomationDescriptionQuery,
} from '~/api/_generated-types'
import { networksConfig } from '~/networks-config'
import { paths } from '~/paths'
import { pluralize } from '~/common/pluralize'
import { safeJsonParse } from '../safe-json-parse'
import * as styles from './automation-card.css'
import { CanDemo } from '~/auth/common/can-demo'

export type AutomationCardProps = {
  onEdit?: () => void
  onDelete: () => void
  active: boolean
  onActivate: () => void
  deleting?: boolean
  editing?: boolean
  restakeIn: string | null
  id: string
  className?: string
  type: AutomateTriggerTypeEnum
  actions: AutomateActionType[]
  conditions: AutomateConditionType[]
  descriptions?: AutomationDescriptionQuery['automateDescription'] | null
  wallet: string
  walletNetwork: string
  name: string
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

  const networks = props.conditions
    .map(({ params }) => networksConfig[safeJsonParse(params).network]?.title)
    .filter(Boolean)
    .join(', ')

  const actions = props.actions
    .map((action) =>
      action.type !== AutomateActionTypeEnum.WavesAutomateRun
        ? props.descriptions?.actions[action.type]?.name
        : undefined
    )
    .filter(Boolean)
    .join(', ')

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
          {props.onEdit && (
            <CanDemo сlassName={styles.dropdownItem}>
              <ButtonBase onClick={props.onEdit}>Edit</ButtonBase>
            </CanDemo>
          )}

          <CanDemo сlassName={styles.dropdownItem}>
            <ButtonBase
              as={ReactRouterLink}
              to={paths.automations.history(props.id)}
            >
              History
            </ButtonBase>
          </CanDemo>

          <CanDemo сlassName={styles.dropdownItem}>
            <ButtonBase className={styles.red} onClick={props.onDelete}>
              Delete
            </ButtonBase>
          </CanDemo>
        </Dropdown>
      </div>
      <Typography family="mono" transform="uppercase">
        {props.name}
      </Typography>
      <Label
        title="Condition"
        value={`${props.conditions.length} ${pluralize(
          props.conditions.length,
          'Condition'
        )}`}
        subtitle={networks}
        automation={automation}
      />
      {props.conditions.some(
        (v) => v.type === 'ethereumOptimalAutomateRun'
      ) && (
        <Label
          title="Next Auto-Stake"
          value={props.restakeIn ? dayjs().to(props.restakeIn) : '-'}
          subtitle={networks}
          automation={automation}
        />
      )}
      {Boolean(props.actions.length) && (
        <Label title="Action" value={actions} automation={automation} />
      )}
      <Label
        title="Wallet"
        value={props.wallet}
        subtitle={networksConfig[props.walletNetwork]?.title}
        automation={automation}
      />

      <CanDemo targetArgument="onChange">
        <Switch checked={props.active} onChange={props.onActivate} />
      </CanDemo>
    </Paper>
  )
}
