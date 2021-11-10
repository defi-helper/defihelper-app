import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { isMetricGroup, MetricGroups } from '../protocol.types'
import * as styles from './protocol-metric-groups.css'

export type ProtocolMetricGroupsProps = {
  className?: string
  children: { value: string; loading: boolean }[]
  onChange: (value: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>) => void
  value: string
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
