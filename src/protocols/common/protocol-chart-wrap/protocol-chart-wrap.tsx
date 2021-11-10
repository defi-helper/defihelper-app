import { Paper } from '~/common/paper'
import * as styles from './protocol-chart-wrap.css'

export type ProtocolChartWrapProps = {
  header: React.ReactNode
}

export const ProtocolChartWrap: React.FC<ProtocolChartWrapProps> = (props) => {
  return (
    <Paper radius={8} className={styles.root}>
      <div className={styles.header}>{props.header}</div>
      {props.children}
    </Paper>
  )
}
