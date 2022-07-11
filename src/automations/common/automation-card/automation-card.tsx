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
import { CanDemo } from '~/auth/can-demo'

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
  skipReason?: string
}

type LabelProps = {
  title?: React.ReactNode
  value?: React.ReactNode
  subtitle?: React.ReactNode
  automation: boolean
  skipReason?: string
  error?: boolean
}

const Label: React.VFC<LabelProps> = (props) => {
  return (
    <div className={clsx(props.error && styles.error)}>
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
      {props.skipReason && (
        <Typography variant="body3" className={styles.errorLabel}>
          {props.skipReason}
        </Typography>
      )}
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
            <ButtonBase className={styles.dropdownItem} onClick={props.onEdit}>
              Edit
            </ButtonBase>
          )}

          <CanDemo>
            <ButtonBase
              as={ReactRouterLink}
              to={paths.automations.history(props.id)}
              className={styles.dropdownItem}
            >
              History
            </ButtonBase>
          </CanDemo>

          <CanDemo>
            <ButtonBase
              className={clsx(styles.red, styles.dropdownItem)}
              onClick={props.onDelete}
            >
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
        error={Boolean(props.skipReason)}
      />
      {Boolean(props.actions.length) && (
        <Label
          title="Action"
          value={actions}
          automation={automation}
          error={Boolean(props.skipReason)}
        />
      )}
      <Label
        title="Wallet"
        value={props.wallet}
        subtitle={networksConfig[props.walletNetwork]?.title}
        automation={automation}
        skipReason={props.skipReason}
      />

      <CanDemo targetArgument="onChange">
        <Switch
          checked={props.skipReason ? !props.skipReason : props.active}
          onChange={props.skipReason ? undefined : props.onActivate}
          components={{
            thumb: props.skipReason ? <span>!</span> : undefined,
            track: props.skipReason ? (
              <span className={styles.errorTrack} />
            ) : undefined,
          }}
        />
      </CanDemo>
    </Paper>
  )
}
