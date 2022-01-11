import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import * as styles from './portfolio-chart-groups.css'

export type PortfolioChartGroupsProps = {
  className?: string
  children: { value: string; loading: boolean }[]
  onChange: (value: Exclude<MetricGroupEnum, MetricGroupEnum.Year>) => void
  value: string
}

const MetricGroups: Record<string, string> = {
  [MetricGroupEnum.Hour]: '1H',
  [MetricGroupEnum.Day]: '1D',
  [MetricGroupEnum.Week]: '7D',
  [MetricGroupEnum.Month]: '1M',
}

const isMetricGroup = (
  group: string
): group is Exclude<MetricGroupEnum, MetricGroupEnum.Year> => {
  const arr: string[] = [
    MetricGroupEnum.Hour,
    MetricGroupEnum.Day,
    MetricGroupEnum.Week,
    MetricGroupEnum.Month,
  ]

  return arr.includes(group)
}

export const PortfolioChartGroups: React.VFC<PortfolioChartGroupsProps> = (
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
