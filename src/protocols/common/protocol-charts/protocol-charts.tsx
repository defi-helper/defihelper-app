import clsx from 'clsx'
import { Children, isValidElement } from 'react'

import * as styles from './protocol-charts.css'

export type ProtocolChartsProps = {
  className?: string
  children?: React.ReactNode
}

const Header = (props: ProtocolChartsProps) => (
  <div className={clsx(styles.header, props.className)}>{props.children}</div>
)

export const ProtocolCharts = (props: ProtocolChartsProps) => {
  const children = Children.toArray(props.children).filter(isValidElement)

  const header = children.find((child) => child.type === Header)

  const restChildren = children.filter((child) => child.type !== Header)

  return (
    <div className={clsx(styles.root, props.className)}>
      {header}
      <div className={styles.charts}>{restChildren}</div>
    </div>
  )
}

ProtocolCharts.Header = Header
