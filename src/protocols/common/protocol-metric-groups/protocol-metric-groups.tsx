import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import * as styles from './protocol-metric-groups.css'

export type ProtocolMetricGroupsProps = {
  className?: string
  children: { value: string; loading: boolean }[]
  onChange: (value: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>) => void
  value: string
}

const MetricGroups: Record<string, string> = {
  [MetricGroupEnum.Day]: 'daily',
  [MetricGroupEnum.Week]: 'weekly',
  [MetricGroupEnum.Year]: 'yearly',
}

const isMetricGroup = (
  group: string
): group is Exclude<MetricGroupEnum, MetricGroupEnum.Hour> => {
  const arr: string[] = [
    MetricGroupEnum.Day,
    MetricGroupEnum.Week,
    MetricGroupEnum.Year,
  ]

  return arr.includes(group)
}

export const ProtocolMetricGroups: React.VFC<ProtocolMetricGroupsProps> = (
  props
) => {
  const handleOnClick = (group: string) => () => {
    if (!isMetricGroup(group)) return

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
            {MetricGroups[metricItem.value]}
          </span>
        </ButtonBase>
      ))}
    </div>
  )
}
