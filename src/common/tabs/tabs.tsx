import { Children, useState, isValidElement, cloneElement } from 'react'

import * as styles from './tabs.css'

export type TabsProps = unknown

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const is = (type: string) => (element: any) => {
  return 'displayName' in element.type && element.type.displayName === type
}

const isTab = is('Tab')
const isTabPanel = is('TabPanel')

export const Tabs: React.FC<TabsProps> = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabList = Children.toArray(props.children).filter(isTab)
  const tabPanes = Children.toArray(props.children).filter(isTabPanel)

  const handleClickOnTab =
    (index: number, cb?: (...args: unknown[]) => void) =>
    (...args: unknown[]) => {
      setActiveTab(index)

      cb?.(...args)
    }

  return (
    <div className={styles.root}>
      <div className={styles.tabList}>
        {Children.map(
          tabList,
          (child, index) =>
            isValidElement(child) &&
            cloneElement(child, {
              ...child.props,
              active: child.props.active || activeTab === index,
              onClick: handleClickOnTab(index, child.props.onClick),
            })
        )}
      </div>
      <div className={styles.tabPanes}>{tabPanes[activeTab]}</div>
    </div>
  )
}
