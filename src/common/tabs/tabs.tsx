import clsx from 'clsx'
import {
  Children,
  useState,
  isValidElement,
  cloneElement,
  useEffect,
} from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import * as styles from './tabs.css'

export type TabsProps = {
  className?: string
  hashSaveState?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const is = (type: string) => (element: any) => {
  return 'displayName' in element.type && element.type.displayName === type
}

const isTab = is('Tab')
const isTabPanel = is('TabPanel')

export const Tabs: React.FC<TabsProps> = (props) => {
  const location = useLocation()
  const history = useHistory()

  const defaultTab = Number(location.hash.split('-').pop()) || 0
  const [activeTab, setActiveTab] = useState(defaultTab)

  const tabList = Children.toArray(props.children).filter(isTab)
  const tabPanels = Children.toArray(props.children).filter(isTabPanel)

  useEffect(() => {
    if (!props.hashSaveState) {
      return
    }

    history.push(`#tab-${activeTab}`)
  }, [props, activeTab, history])

  const handleClickOnTab =
    (index: number, cb?: (...args: unknown[]) => void) =>
    (...args: unknown[]) => {
      setActiveTab(index)

      cb?.(...args)
    }

  return (
    <div className={styles.root}>
      <div className={clsx(styles.tabList, props.className)}>
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
      <div className={styles.tabPanes}>{tabPanels[activeTab]}</div>
    </div>
  )
}
