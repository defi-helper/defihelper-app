import { Paper } from '~/common/paper'
import * as styles from './settings-paper.css'

export type SettingsPaperProps = unknown

export const SettingsPaper: React.VFC<SettingsPaperProps> = () => (
  <Paper radius={8} className={styles.root} />
)
