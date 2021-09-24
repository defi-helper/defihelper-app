import * as styles from './tabs.css'

export type TabPanelProps = {
  className?: string
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  return <div className={styles.tabPane}>{props.children}</div>
}

TabPanel.displayName = 'TabPanel'
