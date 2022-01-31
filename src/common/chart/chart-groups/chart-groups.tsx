import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import * as styles from './chart-groups.css'

export type ChartGroupsProps = {
  className?: string
  children: { value: string; loading: boolean }[]
  onChange: (value: string) => void
  value: string
}

export const CHART_GROUP_VALUES = {
  day: '24h',
  week: '7d',
  twoWeeks: '14d',
  month: '30d',
  threeMonth: '90d',
} as const

export const CHART_DAYS_LIMITS: Record<string, number> = {
  [CHART_GROUP_VALUES.day]: 24,
  [CHART_GROUP_VALUES.week]: 7,
  [CHART_GROUP_VALUES.twoWeeks]: 14,
  [CHART_GROUP_VALUES.month]: 30,
  [CHART_GROUP_VALUES.threeMonth]: 90,
}

export const ChartGroups: React.VFC<ChartGroupsProps> = (props) => {
  const handleOnClick = (group: string) => () => {
    props.onChange(group)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      {props.children.map((metricItem) => (
        <ButtonBase
          key={metricItem.value}
          onClick={handleOnClick(metricItem.value)}
          className={clsx(
            styles.group,
            props.value === metricItem.value && styles.groupActive
          )}
        >
          {metricItem.loading && (
            <CircularProgress className={styles.groupLoader} />
          )}
          <span
            className={clsx(
              styles.groupLabel,
              props.value === metricItem.value && styles.groupLabelActive,
              metricItem.loading && styles.groupLabelLoading
            )}
          >
            {metricItem.value}
          </span>
        </ButtonBase>
      ))}
    </div>
  )
}
